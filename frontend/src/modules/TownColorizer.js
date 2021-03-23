import * as d3 from 'd3'
import chroma from 'chroma-js'

class TownColorizer{
    constructor(townAreaList, colorScheme = d3.schemeCategory10){
        this.baseColorTable = [];
        this.colorTable = {};

        colorScheme.forEach((colorCode) => {
            this.baseColorTable.push(chroma(colorCode));
        })

        if(townAreaList != undefined) this.createTable(townAreaList);

    }

    async createTable(townAreaList){
        const keys = Object.keys(townAreaList);
        let color = 0;
        keys.forEach((key) => {
            color %= this.baseColorTable.length;
            let subcolor = 0;
            const townSubAreaList = townAreaList[key].getTownSubAreaList();
            const subAreaKeys = Object.keys(townSubAreaList);
            subAreaKeys.forEach((subkey) => {
                this.colorTable[subkey] = this.baseColorTable[color].darken(subcolor * 0.3);
                subcolor++;
            });
            color++;
        });
        console.log(this.colorTable);
    }

    getColor(townId){
        if(this.colorTable.hasOwnProperty(townId)){
            return this.colorTable[townId].hex();
        } else {
            return "#333333";
        }
    }
}

// Singleton class
export default new TownColorizer();