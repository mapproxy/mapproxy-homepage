
---
tags: mapproxy, pil, png
date: 2010/08/02 00:00:00
format: markdown
title: Improving the performance for PNG requests
---

MapProxy uses the [Python Image Library](http://www.pythonware.com/products/pil/) (PIL) for everything image related: decoding, resizing, cropping, merging, transforming and encoding. Core parts of PIL are written in C and so is MapProxy able to keep up with pure C servers, and even trump them. Only the PNG encoding is significantly slower than other implementations.

There are two major variations of PNG files, often called PNG-24 and PNG-8. PNG-24 stores full color information for each pixel, while PNG-8 only supports a total of 256 different colors per image. The benefit of PNG-8 is that the files size reduces to 1/3. This process of reducing the possible 16.7 million colors of PNG-24 to a palette of only 256 colors is called color quantization.

We profiled the PNG encoder and found the bottleneck of the encoding process was in that color quantization. We've implemented a new algorithm, based on the octree algorithm, that offers better performance. Much better performance. The whole encoding process itself got about 10 times faster, increasing the MapProxy performance for PNG requests about 2-3 times, wich is now on a par with the JPEG format.

It even gets better: The new quantizer has also full transparency support. Prior to this, MapProxy could return images with transparency only in PNG-24 mode, but now transparency is also supported for PNG-8. For these images, the file size reduces to 1/4 of the PNG-24 size, while having the same performance boost.

### How to use the new quantizer ###

The development of our modification is available at http://bitbucket.org/olt/pil-117-fastpng
The modification is not yet included in the official PIL version, but the maintainer told me that it should be merged later this summer and that it should be available in the next PIL release.

But you can already use it anyway. There is a source package available and you can install and compile it with:

    $ pip install http://bitbucket.org/olt/pil-117-fastpng/downloads/PIL-1.1.7-fastpng-a6.tar.gz

You need the latest MapProxy 0.8.4 release or the upcoming 0.9.0 to get support for the new quantizer.


By default, MapProxy will still generate PNG-24 for transparent images. To enable PNG-8 for these images, you have to add the following to your proxy.yaml:

    image:
      paletted: true


Thats it. You should now have a MapProxy that is 2-3 times faster for PNG files, and with the reduced file size even faster for you users.

Have fun.