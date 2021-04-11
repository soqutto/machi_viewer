/* eslint-disable */
class TownCoordinate{
    constructor(){
        this.townBboxTable = {};
        this.townSubAreaBboxTable = {};
        this.townCenterPointTable = {};
        this.townSubAreaCenterPointTable = {};
    }

    async createTable(parser){
        this.clear()
        const city = parser.city;
        const towns = city.towns;
        const tj = parser.json;

        Object.keys(towns).forEach((townAreaId) => {
            const townArea = towns[townAreaId];
            const subAreaKeys = Object.keys(townArea.townSubAreas);
            subAreaKeys.forEach((townSubAreaId) => {
                const townSubArea = townArea.townSubAreas[townSubAreaId];
                const subAreaGeometries = parser.json.objects.town.geometries.filter((d) => {
                    return townSubArea.townId.includes(d.properties.KCODE1);
                });

                const subDividendReducerX = (accum, d) => {
                    return accum + d.properties.X_CODE * d.properties.AREA; };
                const subDividendReducerY = (accum, d) => {
                    return accum + d.properties.Y_CODE * d.properties.AREA; };
                const subDivisorReducer = (accum, d) => accum + d.properties.AREA;

                const dividendX = subAreaGeometries.reduce(subDividendReducerX, 0);
                const dividendY = subAreaGeometries.reduce(subDividendReducerY, 0);
                const divisor = subAreaGeometries.reduce(subDivisorReducer, 0);

                this.townSubAreaCenterPointTable[townSubAreaId] = [dividendX/divisor, dividendY/divisor];
            });

            const dividendReducerX = (accum, d) => {
                return accum + this.townSubAreaCenterPointTable[d][0] * townArea.getTownSubAreaById(d).area; };
            const dividendReducerY = (accum, d) => {
                return accum + this.townSubAreaCenterPointTable[d][1] * townArea.getTownSubAreaById(d).area; };
            const divisorReducer = (accum, d) => accum + townArea.getTownSubAreaById(d).area;

            const dividendX = subAreaKeys.reduce(dividendReducerX, 0);
            const dividendY = subAreaKeys.reduce(dividendReducerY, 0);
            const divisor = subAreaKeys.reduce(divisorReducer, 0);

            this.townCenterPointTable[townAreaId] = [dividendX/divisor, dividendY/divisor];
        });
    }

    getTownCenterPointTable(){
        return this.townCenterPointTable;
    }

    getTownSubAreaCenterPointTable(){
        return this.townSubAreaCenterPointTable;
    }

    getTownCenterPoint(townId){
        if(!this.townCenterPointTable.hasOwnProperty(townId)) return [0, 0]
        return this.townCenterPointTable[townId];
    }

    getTownSubAreaCenterPoint(townSubAreaId){
        if(!this.townSubAreaCenterPointTable.hasOwnProperty(townSubAreaId)) return [0, 0]
        return this.townSubAreaCenterPointTable[townSubAreaId];
    }

    clear () {
        this.constructor()
    }
}

// Singleton class
export default new TownCoordinate();