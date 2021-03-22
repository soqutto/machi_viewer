//import { map } from "leaflet";
import {City, TownArea, TownSubArea} from "./TownClass"

class TownParser{
    constructor(){
        this.jsonFilePath = "";
        this.jsonFileURI = "";
        this.jsonData = null;
        this.city = null;
    }

    async load(jsonURI){
        this.jsonFileURI = jsonURI;
        const response = await fetch(this.jsonFileURI);
        const data = await response.json();
        this.jsonData = data;
    }

    parse(){
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
                townNumber = regExpMatchNumber[0].replace(/[０-９]/g,
                    (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0) );
            }
            console.log(townName, townSubName);

            if(!this.city.hasTownArea(townName)){
                this.city.addTownArea(gp.KIHON1, townName);
            }
            this.city.getTownByName(townName)
                     .addTownSubArea(gp.KCODE1, townName, townSubName, townNumber);


        }
    }



    clear(){ this.constructor(); }
    isEmpty(){ return (this.jsonData == null ? true : false) }

    get json(){ return this.jsonData }

}

// Singleton class
export default new TownParser();