/* eslint-disable */
import * as d3 from 'd3'
import chroma from 'chroma-js'

class TownColorizer{
    constructor(townAreaList, colorScheme = d3.schemeCategory10){
        this.baseColorTable = [];
        this.townColorTable = {};
        this.townSubAreaColorTable = {};

        colorScheme.forEach((colorCode) => {
            this.baseColorTable.push(chroma(colorCode));
        })

        if(townAreaList != undefined) this.createTable(townAreaList);

    }

    async createTable(townAreaList){
        this.clear()
        const keys = Object.keys(townAreaList);
        let color = 0;
        keys.forEach((key) => {
            color %= this.baseColorTable.length;
            this.townColorTable[key] = this.baseColorTable[color];
            let subcolor = 0;
            const townSubAreaList = townAreaList[key].getTownSubAreaList();
            const subAreaKeys = Object.keys(townSubAreaList);
            subAreaKeys.forEach((subkey) => {
                this.townSubAreaColorTable[subkey] = this.baseColorTable[color].darken(subcolor * 0.3);
                subcolor++;
            });
            color++;
        });
    }

    getTownColor(townId, factor=0){
        if(this.townColorTable.hasOwnProperty(townId)){
            return this.townColorTable[townId].brighten(factor).hex();
        } else {
            return "#333333";
        }
    }

    getColor(townSubAreaId){
        if(this.townSubAreaColorTable.hasOwnProperty(townSubAreaId)){
            return this.townSubAreaColorTable[townSubAreaId].hex();
        } else {
            return "#333333";
        }
    }

    clear () {
        this.constructor()
    }
}

// Singleton class
export default new TownColorizer();