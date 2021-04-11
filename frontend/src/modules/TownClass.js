/* eslint-disable */
class City{
    constructor(properties, bbox){
        this.prefectureId = properties.PREF;
        this.cityId = properties.CITY;
        this.prefectureName = properties.PREF_NAME;
        this.cityName = properties.CITY_NAME;

        this.towns = {};
        this.townNameHash = {};
        this.townHash = {};

        this.area = 0;
        this.population = 0;
        this.households = 0;

        if(bbox != undefined) this.setBbox(bbox);

    }

    setBbox(bbox){
        [this.W, this.N, this.E, this.S] = bbox;
    }

    get bbox(){
        return [this.W, this.N, this.E, this.S]; 
    }

    get latLngBounds () {
        return [
            [this.N, this.W],
            [this.S, this.E]
        ]
    }

    addTownArea(townAreaId, townName){
        if(!this.towns.hasOwnProperty(townAreaId)){
            this.towns[townAreaId] = new TownArea(townAreaId, townName);
        } else {
            // If correspond town area is already exist,
            // overwrite town name with latter appeared one.
            this.towns[townAreaId].townName = townName;
        }
        this.townNameHash[townName] = townAreaId;

        return this.towns[townAreaId];
    }

    setHash(townId, townAreaId){
        this.townHash[townId] = townAreaId;
    }

    getTownAreaList(){
        return this.towns;
    }

    hasTownArea(townName){
        if(this.townNameHash.hasOwnProperty(townName)){
            return true;
        } else {
            return false;
        }
    }

    getTownById(townId){
        if(this.townHash.hasOwnProperty(townId)){
            return this.towns[this.townHash[townId]]
        } else {
            return null;
        }
    }

    getTownByName(townName){
        if(this.townNameHash.hasOwnProperty(townName)){
            return this.towns[this.townNameHash[townName]];
        } else {
            return null;
        }
    }

    getTownSubAreaById(townId){
        if(this.townHash.hasOwnProperty(townId)){
            return this.getTownById(townId).getTownSubAreaById(townId);
        } else {
            return null;
        }
    }

    //getTownSubAreaByName(townFullName){
    //    return undefined;
    //}

}

class TownArea{
    constructor(townAreaId, townName){
        this.townAreaId = townAreaId;
        this.townName = townName;
        this.townSubAreaNum = 0;
        this.townSubAreaHash = {};
        this.townSubAreaNameHash = {};
        this.townSubAreas = {};
        this.area = 0;
        this.population = 0;
        this.households = 0;
    }

    addTownSubArea(parent, townId, townName, townSubName, townNumber, area=0.0, population=0, households=0){
        const townFullName = townName + (townSubName ? townSubName : "");

        if(this.townSubAreaNameHash.hasOwnProperty(townFullName)){
            const subarea = this.townSubAreas[this.townSubAreaNameHash[townFullName]];
            subarea.addAliasId(townId, population, households);
            this.townSubAreaHash[townId] = subarea.id;
            parent.setHash(townId, this.townAreaId);
        } else {
            this.townSubAreas[townId] =
                new TownSubArea(townId, townName, townSubName, townNumber, area, population, households);
            this.townSubAreaNum++;
            this.townSubAreaHash[townId] = townId;
            this.townSubAreaNameHash[townFullName] = townId;
            parent.setHash(townId, this.townAreaId);
        }

        this.area += area;
        this.population += population;
        this.households += households;

        parent.area += area;
        parent.population += population;
        parent.households += households;
    }

    getTownSubAreaList(){
        return this.townSubAreas;
    }

    getTownSubAreaById(townId){
        if(this.townSubAreaHash.hasOwnProperty(townId)){
            return this.townSubAreas[this.townSubAreaHash[townId]];
        } else {
            return null;
        }
    }

    getTownSubAreaByName(townFullName){
        if(this.townSubAreaNameHash.hasOwnProperty(townFullName)){
            return this.townSubAreas[this.townSubAreaNameHash[townFullName]];
        } else {
            return null;
        }
    }

    get populationDensity(){
        return this.population / (this.area / 1000000);
    }

    get name(){ return this.townName; }
}

class TownSubArea{
    constructor(townId, townName, townSubName, townNumber, area=0.0, population=0, households=0){
        this.normalizedTownId = townId;
        this.townId = [townId]
        this.aliases = 1;
        this.polygons = 1;
        this.townName = townName;
        this.townSubName = townSubName;
        this.townNumber = townNumber;
        this.isNoNumbered = (townNumber == null ? true : false);
        this.area = area;
        this.population = population;
        this.households = households;
    }

    addAliasId(townId, area=0.0, population=0, households=0){
        if(!this.townId.includes(townId)){
            this.townId.push(townId);
            this.aliases++;
        }
        this.polygons++;

        this.area += area;
        this.population += population;
        this.households += households;
    }

    get name() { return this.townName; }
    get subName() { return this.townSubName; }
    get fullName() { return this.townName + (this.townSubName ? this.townSubName : ''); }

    get subNameHalfWidth(){
        return this.townSubName.replace(/[！-～]/g,
             (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    }

    get fullNameHalfWidth(){
        const ret = this.fullName;
        return ret.replace(/[！-～]/g,
            (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    }

    get num() { return this.townNumber; }
    get id() { return this.normalizedTownId; }
    get ids() { return this.townId; }

    get populationDensity(){
        return this.population / (this.area / 1000000);
    }

}

export {City, TownArea, TownSubArea};