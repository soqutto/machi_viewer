/* eslint-disable */
import {City} from "./TownClass"

class TownParser{
    constructor(){
        this.jsonFilePath = "";
        this.jsonFileURI = "";
        this.jsonData = null;
        this.city = null;
    }

    async load(jsonURI){
        this.jsonFileURI = jsonURI;
        const response = await fetch(this.jsonFileURI, {mode: 'no-cors'});
        const data = await response.json();
        this.jsonData = data;
    }

    async parse(tp){
        this.city = new City(this.json.objects.city.geometries[0].properties, this.json.bbox);

        const regExpTownSubName = new RegExp('[０-９]+丁目$');
        const regExpTownNumber = new RegExp('[０-９]+');

        for(const geometry of this.json.objects.town.geometries){
            const gp = geometry.properties;
            const S_NAME = gp.S_NAME;
            const regExpMatch = S_NAME.match(regExpTownSubName);
            let townName, townSubName, townNumber;
            if(regExpMatch == null){
                townName = S_NAME;
                townSubName = null;
                townNumber = null;
            } else {
                townName = S_NAME.substr(0, regExpMatch.index);
                townSubName = regExpMatch[0];
                const regExpMatchNumber = townSubName.match(regExpTownNumber);
                townNumber = Number(regExpMatchNumber[0].replace(/[０-９]/g,
                    (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0)));
            }

            if(!this.city.hasTownArea(townName)){
                this.city.addTownArea(gp.KIHON1, townName);
            }

            this.city.getTownByName(townName)
                     .addTownSubArea(this.city, gp.KCODE1, townName, townSubName, townNumber, gp.AREA, gp.JINKO, gp.SETAI);
        }
    }



    clear(){ this.constructor(); }
    isEmpty(){ return (this.jsonData == null ? true : false) }

    get json(){ return this.jsonData }
    get hierarchy(){ return this.city }

}

// Singleton class
export default new TownParser();