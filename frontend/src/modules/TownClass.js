class City{
    constructor(properties, bbox){
        this.prefectureId = properties.PREF;
        this.cityId = properties.CITY;
        this.prefectureName = properties.PREF_NAME;
        this.cityName = properties.CITY_NAME;

        this.towns = {};
        this.townNameHash = {};
        this.townHash = {};

        if(bbox != undefined) this.setBbox(bbox);

    }

    setBbox(bbox){
        [this.W, this.N, this.E, this.S] = bbox;
    }

    get bbox(){
        return [this.W, this.N, this.E, this.S]; 
    }

    addTownArea(townAreaId, townName){
        if(!this.towns.hasOwnProperty(townAreaId)){
            this.towns[townAreaId] = new TownArea(this, townAreaId, townName);
            this.townNameHash[townName] = townAreaId;
        }

        return this.towns[townAreaId];
    }

    hasTownArea(townName){
        if(this.townNameHash.hasOwnProperty(townName)){
            return true;
        } else {
            return false;
        }
    }

    town(townName){
        if(this.townNameHash.hasOwnProperty(townName)){
            return this.towns[this.townNameHash[townName]];
        } else {
            return null;
        }
    }


}

class TownArea{
    constructor(parent, townAreaId, townName){
        this.parent = parent;
        this.townAreaId = townAreaId;
        this.townName = townName;
        this.townNum = 0;
        this.townSubAreaNameHash = {};
        this.townSubAreas = {};
    }

    addTownSubArea(townId, townName, townSubName, townNumber){
        const townFullName = townName + (townSubName ? townSubName : "");

        if(this.townSubAreaNameHash.hasOwnProperty(townFullName)){
            const subarea = this.townSubAreas[this.townSubAreaNameHash[townName]];
            subarea.addAliasId(townId);
            this.parent.townHash[townId] = [this.townAreaId, subarea.id, townFullName];
        } else {
            this.townSubAreas[townId] =
                new TownSubArea(this, townId, townName, townSubName, townNumber);
            this.townNum++;
            this.townSubAreaNameHash[townFullName] = townId;
            this.parent.townHash[townId] = [this.townAreaId, townId, townFullName];
        }
    }
}

class TownSubArea{
    constructor(parent, townId, townName, townSubName, townNumber){
        this.parent = parent;
        this.normalizedTownId = townId;
        this.townId = [townId]
        this.aliases = 1;
        this.polygons = 1;
        this.townName = townName;
        this.townSubName = townSubName;
        this.townNumber = townNumber;
        this.isNoNumbered = (townNumber == null ? true : false);
    }

    addAliasId(townId){
        if(!this.townId.includes(townId)){
            this.townId.push(townId);
            this.aliases++;
        }
        this.polygons++;
    }

    get name() { return this.townName; }
    get subName() { return this.townSubName; }
    get fullName() { return this.townName + this.townSubName; }

    get subNameHalfWidth(){
        return this.townSubName.replace(/[！-～]/g,
             (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    }

    get fullNameHalfWidth(){
        const ret = this.townName + this.townSubName;
        return ret.replace(/[！-～]/g,
            (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    }

    get num() { return this.townNumber; }
    get id() { return this.normalizedTownId; }
    get ids() { return this.townId; }

}

export {City, TownArea, TownSubArea};