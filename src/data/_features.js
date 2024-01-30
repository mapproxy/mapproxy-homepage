import React from 'react';
import Translate from '@docusaurus/Translate';

// Adapt translation in i18n/{locale}/code.json
export const features = [
  {
    title: <Translate>Tile cache</Translate>,
    lists: [
      {
        descriptions: [<Translate>features-tile-cache-description</Translate>],
        items: [
          <Translate>WMS sources (1.0.0–1.3.0)</Translate>,
          <Translate>WMTS/TMS sources</Translate>,
          <Translate>Mapserver and Mapnik configurations</Translate>,
          <Translate>any TileCache, Google Maps or Bing compatible source</Translate>,
          <Translate>ArcGIS REST servers and compact cache file</Translate>,
        ]
      },
      {
        descriptions: [<Translate>Other features</Translate>],
        items: [
          <Translate>cache tiles in the filesystem, MBTiles/SQLite, ArcGIS Compact Cache, S3, Redis, Riak, or CouchDB</Translate>,
          <Translate>reproject WMS and tile sources to other SRS</Translate>,
          <Translate>stores identical tiles just once (e.g. ocean tiles)</Translate>,
          <Translate>embed watermark in tiles</Translate>,
          <Translate>merge multiple sources</Translate>,
          <Translate>limit sources to polygon areas</Translate>,
          <Translate>manipulate image bands to create grayscale- or false-color images</Translate>,
          <Translate>many more</Translate>
        ]
      }
    ]
  },
  {
    title: <Translate>WMS</Translate>,
    lists: [
      {
        descriptions: [<Translate>MapProxy is also a full compliant WMS server and supports any WMS client (desktop and web). It supports WMS responses from cached data:</Translate>],
        items: [
          <Translate>merges tiles and scales or reprojects images</Translate>,
          <Translate>accelerates existing WMS 10 to 100 time</Translate>
        ]
      },
      {
        descriptions: [<Translate>and cascaded WMS services:</Translate>],
        items: [
          <Translate>multi-threaded requests</Translate>,
          <Translate>merges multiple sources</Translate>,
          <Translate>adds transparency to opaque layers</Translate>,
          <Translate>reprojects on-the-fly</Translate>
        ]
      },
      {
        descriptions: [<Translate>It also supports combinations of cached and cascaded layers. Other features:</Translate>],
        items: [
          <Translate>respond to GetLegendGraphic requests'</Translate>,
          <Translate>cascade GetFeatureInfo requests with optional XSL transformations'</Translate>,
          <Translate>limit sources to polygon areas'</Translate>,
          <Translate>convert WMS versions and image formats'</Translate>,
          <Translate>support for non-image raster data like DEMs</Translate>
        ]
      }
    ]
  },
  {
    title: <Translate>Security</Translate>,
    lists: [
      {
        descriptions: [
          <Translate>MapProxy can act as a security layer for existing map services. Thus, MapProxy can protect entire WMS but also individual layers from unwanted access or make them visible only to certain user groups.</Translate>,
          <Translate>In addition to the overall data, the security layer can also be applied to exact areas. For example, a polygon can be used to define which areas individual users are allowed to access and which are not.</Translate>,
          <Translate>The security layer was developed as an open interface so that it can be connected to a wide variety of user databases. Existing user databases can thus be used by the MapProxy.</Translate>
        ],
        items: [
        ]
      }
    ]
  },
  {
    title: <Translate>Seeding</Translate>,
    lists: [
      {
        descriptions: [<Translate>You can pre-generate the tile cache for better performance – this is called seeding. Some unique features:</Translate>],
        items: [
          <Translate>fine-grained control over the seed area with Shapefiles, GeoJSON, PostGIS or WKT geometries</Translate>,
          <Translate>multi-threaded requests, meta-tile splitting and image encoding</Translate>,
          <Translate>optimized seeding strategy (to work _with_ your database cache</Translate>
        ]
      }
    ]
  },
  {
    title: <Translate>Other features</Translate>,
    lists: [
      {
        descriptions: [<Translate>You can use MapProxy to upgrade your SDI without touching your existing servers:</Translate>],
        items: [
          <Translate>offer projections that your sources do not support</Translate>,
          <Translate>offer protocol versions and image formats that your sources do not support</Translate>,
          <Translate>combine multiple layers and servers</Translate>,
          <Translate>hide WMS servers</Translate>,
          <Translate>add watermarks and attribution lines to the images</Translate>,
          <Translate>etc</Translate>
        ]
      },
      {
        descriptions: [<Translate>MapProxy is standard compliant and works with the following open specifications:</Translate>],
        items: [
          <Translate>OGC WMS 1.0.0, 1.1.0, 1.1.1, 1.3.0</Translate>,
          <Translate>OGC WMTS 1.0.0 (KVP and RESTful)</Translate>,
          <Translate>OSGeo TMS 1.0.0</Translate>,
          <Translate>OGC KML 2.2 SuperOverlay</Translate>
        ]
      }
    ]
  },
];
