import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: 'Tile cache',
    lists: [
      {
        description: <Translate>features-tile-cache-description</Translate>,
        items: [
          <Translate>WMS sources (1.0.0–1.3.0)</Translate>,
          <Translate>WMTS/TMS sources</Translate>,
          <Translate>Mapserver and Mapnik configurations</Translate>,
          <Translate>any TileCache, Google Maps or Bing compatible source</Translate>,
          <Translate>ArcGIS REST servers and compact cache file</Translate>
        ]
      },
      {
        "description": <Translate>Other features</Translate>,
        "items": [
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
    title: 'WMS',
    lists: [
      {
        description: <Translate>MapProxy is also a full compliant WMS server and supports any WMS client (desktop and web). It supports WMS responses from cached data:</Translate>,
        items: [
          <Translate>merges tiles and scales or reprojects images</Translate>,
          <Translate>accelerates existing WMS 10 to 100 time</Translate>
        ]
      },
      {
        description: <Translate>and cascaded WMS services:</Translate>,
        items: [
          "multi-threaded requests",
          "merges multiple sources",
          "adds transparency to opaque layers",
          "reprojects on-the-fly",
        ]
      },
      {
        description: "It also supports combinations of cached and cascaded layers. Other features:",
        items: [
          'respond to `GetLegendGraphic` requests',
          'cascade ``GetFeatureInfo`` requests with optional XSL transformations',
          'limit sources to polygon areas',
          'convert WMS versions and image formats',
          'support for non-image raster data like DEMs'
        ]
      }
    ]
  },
  {
    title: 'Security',
    lists: [
      {
        description: "MapProxy comes with a flexible security API that allows you to add fine-grained control over services and layers. You can even restrict access of single layers to polygon extents.",
        items: [
        ]
      }
    ]
  },
  {
    title: 'Seeding',
    lists: [
      {
        description: "You can pre-generate the tile cache for better performance – this is called seeding. Some unique features:",
        items: [
          'fine-grained control over the seed area with Shapefiles, GeoJSON, PostGIS or WKT geometries',
          'multi-threaded requests, meta-tile splitting and image encoding',
          'optimized seeding strategy (to work _with_ your database cache)'
        ]
      }
    ]
  },
  {
    title: 'Other features',
    lists: [
      {
        description: "You can use MapProxy to upgrade your SDI without touching your existing servers:",
        items: [
          'offer projections that your sources do not support',
          'offer protocol versions and image formats that your sources do not support',
          'combine multiple layers and servers',
          'hide WMS servers',
          'add watermarks and attribution lines to the images',
          'etc.'
        ]
      },
      {
        description: "MapProxy is standard compliant and works with the following open specifications:",
        items: [
          "OGC WMS 1.0.0, 1.1.0, 1.1.1, 1.3.0",
          "OGC WMTS 1.0.0 (KVP and RESTful)",
          "OSGeo TMS 1.0.0",
          "OGC KML 2.2 SuperOverlays"
        ]
      }
    ]
  },
];

function Feature({ title, lists }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="">
        <h3 className="text--center">{title}</h3>
        {lists.map(list => {
          return (
            <div>
              <div>{list.description}</div>
              <ul>
                {list.items.map(i => {
                  return (
                    <li>{i}</li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default function MapProxyFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
