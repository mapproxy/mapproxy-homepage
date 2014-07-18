
---
tags: benchmark, mapproxy, mapserver, raster
date: 2010/06/24 00:00:00
format: markdown
title: MapProxy Raster Image Benchmark
---

We did some benchmarks of [MapProxy][] to show you how it compares to other WMS servers when it comes to serving raster images. This is a follow up to the [WMS benchmark](http://www.slideshare.net/gatewaygeomatics.com/wms-performance-shootout) presented at the FOSS4G in Sydney and the additional tests done by [Chris Tweedie](http://blog.webmapper.com.au/image-server-benchmark/).

We did not re-run all tests, but we have included MapServer as a comparison. You can use the results as a baseline to compare the MapProxy results with the numbers from the other benchmarks.

If you are not familiar with [MapProxy][], you should note that it is not a WMS server like MapServer or GeoServer, but a caching proxy for existing WMS servers. However, MapProxy does not cache every single response like an HTTP proxy such as Squid does. It builds up an internal tile cache and uses this cache to create new WMS responses. For raster images it basically does the same as a regular WMS server does: read raster data, resample the data to the right output resolution and deliver the result.

In this test we used the MapServer installation as the data source of the MapProxy.

[mapproxy]: http://mapproxy.org

## Configuration

The test server is a virtualized XEN machine with 4 CPU cores and 7GB RAM running Ubuntu 9.10.
The host machine has an Intel Xeon X3360 CPU with 4 cores at 2.83GHz. The test server was the only VM that was running during the benchmarks.

### MapProxy

We used MapProxy 0.8.3 running with Python 2.6.4. It was deployed with [gunicorn](http://gunicorn.org/) behind [nginx](http://nginx.org/) as a reverse-proxy (no caching enabled). Gunicorn was configured to run 6 worker processes of MapProxy.

### MapServer

We used MapServer 5.6.3. It was deployed as a FastCGI server behind Apache 2.2.12. We used 12 worker processes, which offered the best performance on this machine.

## Test data

We used a Blue Marble Next Generation image as a data source for our tests. The image covers the whole World and is 21600 x 10800px. We used an uncompressed tiled TIFF with overviews (10800x5400, 5400x2700, 2700x1350, 1350x675). This should compare to the _BigTiff_ dataset in the FOSS4G benchmark and to the _Tiled (internal)_ from Chris Tweedies tests.

For MapProxy we used JPEG as the internal caching format and a tile size of 256x256 pixels.

## Tests

We used the same BBOX extends and output dimensions that were used in the FOSS4G benchmarks. We took the 2000 random extends from [bluemarble.csv](http://svn.osgeo.org/osgeo/foss4g/benchmarking/scripts/mapserver/raster/bluemarble.csv) and build a list of URLs for each tested server.

The image sizes vary between 256x256 and 1024x768 pixel. We tested JPEG as the output format with nearest neighbor resampling.

We tested different concurrency levels to see how the servers react under different loads.
Each URL was requested once per test run and each test run was repeated three times. We used the best result of each test run.


## Results

Ok, here are the results of our benchmark. At first the results for requests in EPSG:4326, the native reference system of the input data/cache:

![Requests per second EPSG:4326](http://mapproxy.org/static/blog/result-4326-req.png)

MapServer can deliver up to 122 requests per second at 20 and 40 concurrent clients, MapProxy peaks at 40 concurrent clients with 157 requests per second, an increase of ~28%.
Both servers can hold the performance with increasing concurrency.

And here are the results for requests in EPSG:900913, also known as the web mercator projection EPSG:3785. We used the same EPSG:4326 cache for MapProxy, so both servers need to reproject from EPSG:4326 to EPSG:900913.

![Requests per second EPSG:900913](http://mapproxy.org/static/blog/result-900913-req.png)

MapServer can deliver up to 74 requests per second from 20 to 150 concurrent clients, MapProxy delivers 113 requests per second from 20 to 80 clients, an increase of ~52%.

Both servers showed very good results, and they exceeded our expectations.

### Comparing with FOSS4G benchmarks

The MapServer results are much better than the results from the last FOSS4G benchmarks, 122 req/s to 28 req/s peak. There are two explanation for the difference. First, our test data set is only 900MB compared to the 16GB of images they used. We guess that the FOSS4G servers had some disk I/O during the tests that slowed the results down. Second, our test server is more recent and has more power.

### Comparing with Chris' benchmarks

This one is more interesting. The CPUs are not _that_ different, but his machine has *two* CPUs -- 8 cores. Still we got nearly three times as may requests per second. So either something was misconfigured on Chris's server or MapServer performs way better on Linux than on Windows.

## Conclusion

You have to consider that both servers do the same job. As we already stated at the beginning, they just read raster data, resample the data to the right output resolution and deliver the image to the client. Therefore it is great to see that MapProxy can beat the _oldtimer_ MapServer.

But is it worth to use MapProxy for a ~25-50% performance boost? Maybe not, but this was a simple test case. Serving raster images is the easiest job for MapServer, compared to rendering vector data from a shapefile or database. Rendering small scale maps with lots of data takes significant longer, render times of few seconds are not uncommon. The performance of MapProxy, on the other hand, is independent of the data. So, while the benefits of MapProxy seam small in this test, they can become huge when you start to serve larger raster or vector datasets.


Come [join our mailing list](http://lists.osgeo.org/mailman/listinfo/mapproxy) if you want to discuss the results, or leave a comment below.
