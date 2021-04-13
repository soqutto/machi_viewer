import { City } from './TownClass'

const kanjiNumberTable = {
  '一': 1,
  '二': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6,
  '七': 7,
  '八': 8,
  '九': 9,
  '十': 10
}

class TownParser {
  constructor () {
    // this.jsonFilePath = "";
    // this.jsonFileURI = "";
    this.jsonData = null
    this.city = null
  }

  async load (json) {
    // this.jsonFileURI = jsonURI;
    // const response = await fetch(this.jsonFileURI, {mode: 'no-cors'});
    // const data = await response.json();
  }

  async parse (json) {
    this.clear()
    this.jsonData = json
    this.city = new City(this.json.objects.city.geometries[0].properties, this.json.bbox)

    // const regExpTownSubName = new RegExp('[０-９]+丁目?$')
    const regExpTownSubName =
      new RegExp('(?<num>[一二三四五六七八九]?十?[一二三四五六七八九]*|[０-９]+)(?<suffix>丁目?[東西南北]?|号)$')
    // const regExpTownNumber =
    //  new RegExp('[０-９]+')
    const regExpTownKanjiNumber =
      new RegExp('[一二三四五六七八九]?十?[一二三四五六七八九]*')

    for (const geometry of this.json.objects.town.geometries) {
      const gp = geometry.properties
      const S_NAME = gp.S_NAME ? gp.S_NAME : ''
      const regExpMatch = S_NAME.match(regExpTownSubName)
      let townName, townSubName, townRawNumber, townNumberFormated, townSuffix, townNumber

      // 丁番なし町域
      if (regExpMatch == null) {
        townName = S_NAME
        townSubName = null
        townNumber = null
      } else {
        // 町名
        townName = S_NAME.substr(0, regExpMatch.index)

        // 丁目数字
        townRawNumber = regExpMatch.groups.num
        // 漢数字の場合
        if (townRawNumber.match(regExpTownKanjiNumber)[0] !== '') {
          // 全角数字に変換
          let num = 0
          let buf = 0
          for (let i = 0; i < townRawNumber.length; i++) {
            const currentChar = townRawNumber[i]
            if (currentChar === '十') {
              if (buf === 0) {
                num += 10
              } else {
                num += 10 * kanjiNumberTable[currentChar]
                buf = 0
              }
            } else {
              if (i + 1 === townRawNumber.length) {
                num += kanjiNumberTable[currentChar]
              } else {
                buf = kanjiNumberTable[currentChar]
              }
            }
          }
          townNumberFormated = String(num).replace(/[0-9]/g,
            (str) => String.fromCharCode(str.charCodeAt(0) + 0xFEE0)
          )

        // 全角算用数字の場合
        } else {
          townNumberFormated = townRawNumber
          townNumber = Number(townRawNumber.replace(/[０-９]/g,
            (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0)
          ))
        }

        // 呼称
        townSuffix = regExpMatch.groups.suffix
        // 呼称付き町域名
        townSubName = townNumberFormated + townSuffix
      }

      if (!this.city.hasTownArea(townName)) {
        this.city.addTownArea(gp.KIHON1, townName)
      }

      this.city.getTownByName(townName)
        .addTownSubArea(this.city, gp.KCODE1, townName, townSubName, townNumber, gp.AREA, gp.JINKO, gp.SETAI)
    }

    // Rebase townArea and townSubArea relations
    const townAreaList = this.city.getTownAreaList()

    // Detect common town name
    // ex: 上賀茂OO町, 上賀茂XX町 etc...
    Object.keys(townAreaList).forEach((key) => {
      const townSubAreaList = townAreaList[key].getTownSubAreaList()
      const townSubAreaNames = []
      Object.keys(townSubAreaList).forEach((subKey) => {
        townSubAreaNames.push(townSubAreaList[subKey].name)
      })

      let prevName
      let toBeRebased = false
      if (townSubAreaNames.length > 0) prevName = townSubAreaNames[0]
      for (const name of townSubAreaNames) {
        if (name !== prevName) {
          toBeRebased = true
          break
        }
        prevName = name
      }

      if (toBeRebased) {
        const reducer = (accum, current) => {
          return Math.max(accum, current.length)
        }
        const maxLen = townSubAreaNames.reduce(reducer, 0)
        let commonLength = 1
        for (let i = 1; i <= maxLen; i++) {
          const commonString = townSubAreaNames[0].substr(0, i)
          const commonReducer = (accum, currentSubArea) => {
            if (!accum) return false
            else return commonString === currentSubArea.substr(0, i)
          }
          const isCommon = townSubAreaNames.reduce(commonReducer, true)
          if (isCommon) commonLength = i
          else break
        }

        // Check the repeating common town name
        // ex: 上賀茂上賀茂 etc...
        if (commonLength % 2 === 0) {
          const commonString = townSubAreaNames[0].substr(0, commonLength)
          if (commonString.substr(0, commonLength / 2) === commonString.substr(commonLength / 2)) {
            commonLength /= 2
          }
        }

        Object.keys(townSubAreaList).forEach((subKey) => {
          const name = townSubAreaList[subKey].fullName
          townSubAreaList[subKey].setName(
            name.substr(0, commonLength),
            name.substr(commonLength)
          )
        })

        const newName = townAreaList[key].name.substr(0, commonLength)
        townAreaList[key].setName(newName)
        this.city.setTownNameHash(key, newName)
      }
    })
  }

  clear () { this.constructor() }
  isEmpty () { return this.jsonData === null }

  get json () { return this.jsonData }
  get hierarchy () { return this.city }
  get cityFullName () {
    return this.city.cityFullName
  }
}

// Singleton class
export default new TownParser()
