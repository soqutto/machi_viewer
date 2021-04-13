import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as d3 from 'd3'
// import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
// import iconUrl from 'leaflet/dist/images/marker-icon.png'
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import AppStateStore from './AppStateStore'
import MapDrawer from './MapDrawer'

const japanBbox = [
  // Bounding box contains Japanese archipelago
  [44.9396, 127.7001],
  [30.9081, 144.3809]
]

class MapView {
  constructor () {
    this.map = undefined
    this.drawer = new MapDrawer()
    this.overlaySvg = undefined
    this.osmLayer =
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors<br>' +
             '<a href="https://geoshape.ex.nii.ac.jp/ka/" target="_blank">国勢調査町丁・字等別境界データセット(CODH)</a>',
        minZoom: 4,
        maxZoom: 18
      })
    this.gsiLayer =
      L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a> 標準地図<br>' +
             '<a href="https://geoshape.ex.nii.ac.jp/ka/" target="_blank">国勢調査町丁・字等別境界データセット(CODH)</a>',
        minZoom: 5,
        maxZoom: 18
      })
    this.gsiPaleLayer =
      L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a> 淡色地図<br>' +
             '<a href="https://geoshape.ex.nii.ac.jp/ka/" target="_blank">国勢調査町丁・字等別境界データセット(CODH)</a>',
        minZoom: 5,
        maxZoom: 18
      })
    this.layer = this.osmLayer
  }

  attach (elementId) {
    this.map = L.map(elementId)
    this.map.fitBounds(japanBbox)

    switch (AppStateStore.state.map.baseMapType) {
      case 'gsi':
        this.gsiLayer.addTo(this.map)
        break
      case 'gsi-pale':
        this.gsiPaleLayer.addTo(this.map)
        break
      case 'osm':
      default:
        this.osmLayer.addTo(this.map)
        break
    }

    this.overlaySvg = d3.select(this.map.getPanes().overlayPane).append('svg')
    this.drawer.init(this.map, this.overlaySvg)
  }

  changeMap (mapType) {
    this.map.removeLayer(this.layer)
    switch (mapType) {
      case 'gsi':
        this.layer = this.gsiLayer
        break
      case 'gsi-pale':
        this.layer = this.gsiPaleLayer
        break
      case 'osm':
      default:
        this.layer = this.osmLayer
        break
    }

    this.map.addLayer(this.layer)
  }

  async draw () {
    await this.drawer.clear()
    await this.drawer.drawInit()
    this.map.on('moveend', this.drawer.drawUpdate.bind(this.drawer))
  }

  async reset () {
    this.map.off('moveend', this.drawer.drawUpdate.bind(this.drawer))
    await this.drawer.clear()
  }

  fitBounds (bbox) {
    this.map.fitBounds(bbox)
  }

  resetDefault () {
    this.reset()
    this.map.fitBounds(japanBbox)
  }
}

export default new MapView()
