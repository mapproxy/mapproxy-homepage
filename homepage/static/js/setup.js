var map, layer;

function init(){
    OpenLayers.ImgPath = '/static/img/openlayers/';
    var options = {
                  projection: new OpenLayers.Projection("EPSG:900913"),
                  units: "m",
                  maxResolution: 156543.0339,
                  restrictedExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34,
                                                     20037508.34, 20037508.34),
                  maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34,
                                                   20037508.34, 20037508.34),
                  numZoomLevels: 19,
                  controls: [],
                  displayProjection: new OpenLayers.Projection("EPSG:4326"),
                  style: null
              };


    var lon = 9.2;
    var lat = 53.1495;
    var zoom = 9;

    var tms_hosts = ["http://x.osm.omniscale.net/proxy/tiles/",
                     "http://y.osm.omniscale.net/proxy/tiles/"];

    var osm_copyright = '&copy; 2014 <a href="http://omniscale.de">Omniscale</a>, '
        + 'Map Data: <a href="http://openstreetmap.org">OpenStreetMap</a>, '
        + 'License: <a href="http://opendatacommons.org/licenses/odbl/1.0/"Lizenz: Odbl</a>';

    map = new OpenLayers.Map( 'map', options );
    var osm_tms = new OpenLayers.Layer.TMS( "OpenStreetMap (TMS)", tms_hosts,
            {layername: 'osm_EPSG900913', type:'png', buffer:1,
             attribution: osm_copyright});

    var osm_wms = new OpenLayers.Layer.WMS("OpenStreetMap (WMS)",
            ["http://x.osm.omniscale.net/proxy/service?"],
            {layers: 'osm', format: 'image/png', "sphericalMercator": true}, {singleTile: true, ratio: 1});

    map.addLayer(osm_wms);
    map.addLayer(osm_tms);
    map.addControl(new OpenLayers.Control.Navigation({zoomWheelEnabled : false}));
    map.addControl(new OpenLayers.Control.PanZoom());
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.Attribution(
      {div: OpenLayers.Util.getElement('attribution')}));

    if (!map.getCenter()) {
      var lonlat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
      map.setCenter(lonlat, zoom);
    }
}
