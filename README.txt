MapProxy Homepage Repository
============================

This is the repository of the mapproxy.org and .de homepage. It's web app
written in Flask. There are no interactive elements and the homepage can be
converted to a set of static files with the help of Frozen-Flask.


Installation
------------


1. Create a virtualenv, if you like.
2. `pip install -r requirements.txt`
3. `python manage.py runserver`

Deployment
----------

`python manage.py freeze_all` creates a static copy of the app in `build/en`
and `build/de` for mapproxy.org and mapproxy.de. You can copy these files to a
webserver. See `Makefile` for an `rsync` command to do this task.
