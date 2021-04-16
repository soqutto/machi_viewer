const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const cliProgress = require('cli-progress');
const {getSQLClient} = require('./SQLClient');

async function createRecord(basedir){
    // Listing .topojson files
    console.log("Checking *.topojson file under \""+path.resolve(process.cwd(), basedir)+"\" ...");

    const dirents = fs.readdirSync(basedir, {withFileTypes: true});
    const filenames = [];
    for(const dirent of dirents){
        if(dirent.isFile() && /.*\.topojson$/.test(dirent.name)){
            filenames.push(dirent.name);
        }
    }
    console.log(filenames.length, "files found!");

    // Create database record for each .topojson files
    // Progress bar construction
    const progressbar = new cliProgress.SingleBar({
        clearOnComplete: true
    }, cliProgress.Presets.shades_classic);

    // Database connection init
    const db = await getSQLClient();

    // Process each .topojson file
    progressbar.start(filenames.length, 0);
    let cityCreatedCount = 0;
    let cityOverwriteCount = 0;

    for(filename of filenames){
        const jsonContent = await (async () => {
            try {
                return await fsp.readFile(path.join(basedir, filename), "utf-8");
            } catch (err) {
                console.error(err);
                throw err;
            }
        })();

        const jsonObject = JSON.parse(jsonContent);

        const { properties } = jsonObject.objects.city.geometries[0];

        const city_record = {
            city_id: properties.PREF + properties.CITY,
            pref_code: Number(properties.PREF),
            city_code: Number(properties.CITY),
            sityo_name: properties.SITYO_NAME,
            gst_name: properties.GST_NAME,
            css_name: properties.CSS_NAME,
            json_filename: filename
        };

        const prefecture_record = {
            pref_code: Number(properties.PREF),
            pref_name: properties.PREF_NAME
        };

        // Check existing city record
        const existCityRecord = await db.execute('SELECT * FROM cities WHERE city_id = $1', [city_record.city_id]);
        // If city record exists, 
        if (existCityRecord.length > 0) {
            await db.execute('DELETE FROM cities WHERE city_id = $1', [city_record.city_id]);
            cityOverwriteCount++;
        }

        // Check existing prefecture record
        const existPrefectureRecord = await db.execute('SELECT * FROM prefectures WHERE pref_code = $1',
            [prefecture_record.pref_code]);
        // If prefecture record doesn't exist, create prefecture record
        if (existPrefectureRecord.length == 0) {
            await db.execute('INSERT INTO prefectures VALUES ($1, $2)',
                Object.keys(prefecture_record).map((key) => prefecture_record[key]));
        }
        // Create city record
        await db.execute('INSERT INTO cities VALUES ($1, $2, $3, $4, $5, $6, $7)',
            Object.keys(city_record).map((key) => city_record[key]));

        progressbar.increment();
        cityCreatedCount++;

    }

    progressbar.stop();
    console.log("All record has been registered to database.");
    console.log("Created", cityCreatedCount, "records.");
    console.log("Overwrote", cityOverwriteCount, "records.");

    await db.release();
    console.log("Database connection closed.");

}

module.exports = createRecord;
