---
title: Download
---

MapProxy releases are available from the [PyPI project page of MapProxy](http://pypi.python.org/pypi/MapProxy). There is also [an archive of all official releases](https://pypi.python.org/packages/source/M/MapProxy/), unofficial releases and pre-releases [can be found here](https://mapproxy.org/static/rel/).

However, downloading is often not necessary, because you can install MapProxy with the Python tools `easy_install` or `pip`. Read the [installation instructions](https://mapproxy.github.io/mapproxy/install.html) for more information.

There are several ready-to-use docker images for development/testing and production use. Please check the docs for more information.

## Releases

3.x is the current mainline of the development. All new features will be included in the next 3.x release (3.1.x, 3.2.x, etc.). We will make minor releases (e.g. 3.2.1) with small improvements and bugfixes as necessary.

For changes between each release see the [CHANGES.txt of MapProxy](https://github.com/mapproxy/mapproxy/blob/master/CHANGES.txt).

### 3.0.x

This is the current release. It is released under the [Apache Software License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

To install the latest release:

    pip install MapProxy

### Previous releases
You can install previous releases with pip if you specify the version with the package name. For example, to install MapProxy 2.2.0:

    pip install `MapProxy==2.2.0`

To install the latest version of the 1.2.x release, but not 1.3 or newer:

    pip install `MapProxy<1.2.99`

### 1.1.x and newer

These versions are released under the [Apache Software License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

### 1.0.x

1.0.1 and all previous versions were released under the [GNU AGPL License 3.0](http://www.fsf.org/licensing/licenses/agpl-3.0.html).

### 0.9.x

The configuration format changed between 0.8.x and 0.9.x, so you have to make sure you configuration matches the [new format](https://mapproxy.org/docs/latest/migrate.html) if you're going to upgrade.

### Nightly

There are no nightly build packages, but you can directly install from the development trunk.

    pip install https://github.com/mapproxy/mapproxy/tarball/master

<!--  TODO check broken links
The release branches are also available. For example:

    pip install https://github.com/mapproxy/mapproxy/tarball/1.4.x -->
