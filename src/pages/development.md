---
title: Development
---

You want to improve MapProxy, found a bug and want to fix it? Great! This document points you to some helpful information.

#### Source

Releases are available from the [PyPI project page of MapProxy](http://pypi.python.org/pypi/MapProxy). There is also [an archive of all official releases](http://pypi.python.org/packages/source/M/MapProxy/), unofficial releases and pre-releases [can be found here](https://mapproxy.org/static/rel/).

MapProxy uses [Git](http://git-scm.com/) as a source control management tool. If you are new to distributed SCMs or Git we recommend to read [Pro Git](http://git-scm.com/book).

The main (authoritative) repository is hosted at [https://github.com/mapproxy/mapproxy](https://github.com/mapproxy/mapproxy)

To get a copy of the repository call:

    git clone https://github.com/mapproxy/mapproxy

#### Continuous integration

We use Travis-CI to automatically run the MapProxy test suite against different Python versions. The test results [can be found here](https://travis-ci.org/mapproxy/mapproxy/). Travis-CI is connected with our GitHub repository and the integration tests are run for each commit and pull-request.

#### How to contribute

You can post patches to the mailing list or create a new ticket. Or better, [create a fork](http://help.github.com/fork-a-repo/) instead and send a pull request. Feel free to post to the [mailing list first](support), if you have any question.

#### More information

There is a [whole chapter about development in the documentation](https://mapproxy.org/docs/latest/development.html). It covers most aspects of the MapProxy development including the source code, documentation, tests, etc.
