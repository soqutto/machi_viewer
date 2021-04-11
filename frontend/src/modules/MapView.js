import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as d3 from 'd3'
// import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
// import iconUrl from 'leaflet/dist/images/marker-icon.png'
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

// import FileLoader from './FileLoader'
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
  }

  attach (elementId) {
    this.map = L.map(elementId)
    this.map.fitBounds(japanBbox)

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors<br>' +
           '<a href="https://geoshape.ex.nii.ac.jp/ka/" target="_blank">国勢調査町丁・字等別境界データセット(CODH)</a>',
      minZoom: 4,
      maxZoom: 18
    }).addTo(this.map)

    this.overlaySvg = d3.select(this.map.getPanes().overlayPane).append('svg')
    this.drawer.init(this.map, this.overlaySvg)
  }

  async draw () {
    await this.drawer.clear()
    await this.drawer.drawInit()
    this.map.on('moveend', () => this.drawer.drawUpdate())
  }

  async reset () {
    this.map.on('moveend', () => {})
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
