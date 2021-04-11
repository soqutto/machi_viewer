// import AppStateStore from './AppStateStore'
const axios = require('axios')

class JSONDataStore {
  constructor () {
    this.requestUrl = '/api/getjson'
    this.json = null
  }

  async load (cityId) {
    const res = await axios.get(this.requestUrl, {
      params: {
        id: cityId,
        validateStatus: (status) => {
          return status === 200
        }
      }
    })
    this.json = res.data
    return this.json
  }

  clear () {
    this.constructor()
  }
}

export default new JSONDataStore()
