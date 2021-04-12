import L from 'leaflet'
import * as d3 from 'd3'
import * as topojson from 'topojson'

import MapView from './MapView'
import TownParser from './TownParser'
import TownCoordinate from './TownCoordinate'
import TownColorizer from './TownColorizer'

class MapDrawer {
  constructor () {
    this.mapObject = undefined
    this.dataObject = undefined
    this.transform = undefined
    this.path = undefined

    this.svgRootElement = undefined
    this.cityGroup = undefined
    this.townGroup = undefined
    this.townLabelGroup = undefined
    this.townSubAreaLabelGroup = undefined

    this.cityFramePolygon = undefined
    this.townPolygons = undefined
    this.townLabels = undefined
    this.townSubAreaLabels = undefined
  }

  init (map, rootElement) {
    this.mapObject = map

    this.transform = d3.geoTransform({point: this.projectPoint})
    this.path = d3.geoPath().projection(this.transform)

    this.svgRootElement = rootElement
    this.cityGroup =
      this.svgRootElement.append('g').attr('class', 'leaflet-zoom-hide').attr('id', 'city')
    this.townGroup =
      this.cityGroup.append('g').attr('class', 'leaflet-zoom-hide').attr('id', 'town')
    this.townLabelGroup =
      this.cityGroup.append('g').attr('class', 'leaflet-zoom-hide').attr('id', 'town-label')
    this.townSubAreaLabelGroup =
      this.cityGroup.append('g').attr('class', 'leaflet-zoom-hide').attr('id', 'townsubarea-label')
    this.cityFramePolygon = this.cityGroup.selectAll('path')
    this.townPolygons = this.townGroup.selectAll('path')
    this.townLabels = this.townGroup.selectAll('text')
    this.townSubAreaLabels = this.townGroup.selectAll('text')
  }

  projectPoint (x, y) {
    const point = MapView.map.latLngToLayerPoint(new L.LatLng(y, x))
    this.stream.point(point.x, point.y)
  }

  project (x, y) {
    const point = MapView.map.latLngToLayerPoint(new L.LatLng(y, x))
    return [point.x, point.y]
  }

  async drawInit () {
    this.geoJsonCity = topojson.feature(TownParser.json, TownParser.json.objects.city)
    this.geoJsonTown = topojson.feature(TownParser.json, TownParser.json.objects.town)
    this.cityFramePolygon =
      this.cityGroup.selectAll('path')
        .data(this.geoJsonCity.features)
        .enter()
        .append('path')
    this.townPolygons =
      this.townGroup.selectAll('path')
        .data(this.geoJsonTown.features)
        .enter()
        .append('path')
    this.townLabels =
      this.townLabelGroup.selectAll('text')
        .data(Object.keys(TownCoordinate.getTownCenterPointTable()))
        .enter()
        .append('text')
    this.townSubAreaLabels =
      this.townSubAreaLabelGroup.selectAll('text')
        .data(Object.keys(TownCoordinate.getTownSubAreaCenterPointTable()))
        .enter()
        .append('text')
    this.bounds = this.path.bounds(this.geoJsonCity)

    const topLeft = this.bounds[0]
    const bottomRight = this.bounds[1]

    this.svgRootElement
      .attr('width', bottomRight[0] - topLeft[0])
      .attr('height', bottomRight[1] - topLeft[1])
      .style('left', topLeft[0] + 'px')
      .style('top', topLeft[1] + 'px')

    this.cityFramePolygon
      .attr('d', this.path)
      .style('fill', 'none')
      .attr('stroke', '#888888')
      .attr('stroke-width', '4.0')

    this.cityGroup
      .attr('transform', 'translate(' + -topLeft[0] + ',' + -topLeft[1] + ')')

    this.townPolygons
      .attr('class', (d) => 'town-' + d.properties.KCODE1)
      .attr('fill', (d) => {
        const k = d.properties.KCODE1
        const normalizedTownId = TownParser.city.getTownById(k).getTownSubAreaById(k).id
        return TownColorizer.getColor(normalizedTownId)
      })
      .attr('stroke', '#666666')
      .attr('stroke-width', '1.4')
      .style('fill-opacity', 0.5)
      .attr('d', this.path)

    this.townLabels
      .attr('x', (d) => this.project(...TownCoordinate.getTownCenterPoint(d))[0])
      .attr('y', (d) => this.project(...TownCoordinate.getTownCenterPoint(d))[1] - 10)
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .attr('font-size', 15)
      .attr('text-anchor', 'middle')
      .attr('stroke', 'black')
      .attr('stroke-width', 0.1)
      .attr('fill', (d) => {
        return TownColorizer.getTownColor(d, -0.3)
      })
      .attr('display', 'inline')
      .text((d) => {
        return TownParser.city.getTownAreaList()[d].name
      })

    this.townSubAreaLabels
      .attr('x', (d) => this.project(...TownCoordinate.getTownSubAreaCenterPoint(d))[0])
      .attr('y', (d) => this.project(...TownCoordinate.getTownSubAreaCenterPoint(d))[1] - 5)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('display', 'inline')
      .text((d) => {
        return TownParser.city.getTownById(d).getTownSubAreaById(d).subName
      })

    this.drawUpdate()
  }

  drawUpdate () {
    this.bounds = this.path.bounds(this.geoJsonCity)
    const topLeft = this.bounds[0]
    const bottomRight = this.bounds[1]
    this.svgRootElement
      .attr('width', bottomRight[0] - topLeft[0])
      .attr('height', bottomRight[1] - topLeft[1])
      .style('left', topLeft[0] + 'px')
      .style('top', topLeft[1] + 'px')
    this.cityGroup
      .attr('transform', 'translate(' + -topLeft[0] + ',' + -topLeft[1] + ')')
    this.cityFramePolygon.attr('d', this.path)
    this.townPolygons.attr('d', this.path)

    const zoomLevel = this.mapObject.getZoom()

    this.townLabels
      .attr('x', (d) => this.project(...TownCoordinate.getTownCenterPoint(d))[0])
      .attr('y', (d) => this.project(...TownCoordinate.getTownCenterPoint(d))[1] - 10)
      .attr('display', () => {
        return (zoomLevel >= 13) ? 'inline' : 'none'
      })
    this.townSubAreaLabels
      .attr('x', (d) => this.project(...TownCoordinate.getTownSubAreaCenterPoint(d))[0])
      .attr('y', (d) => this.project(...TownCoordinate.getTownSubAreaCenterPoint(d))[1] - 5)
      .attr('display', () => {
        return (zoomLevel >= 15) ? 'inline' : 'none'
      })
  }

  async clear () {
    const empty = []
    this.cityFramePolygon.data(empty).exit().remove()
    this.townPolygons.data(empty).exit().remove()
    this.townLabels.data(empty).exit().remove()
    this.townSubAreaLabels.data(empty).exit().remove()
  }
}

export default MapDrawer
