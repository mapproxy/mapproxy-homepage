import os
from flask import Flask, render_template, send_from_directory, current_app, abort
from flask.templating import TemplateNotFound
from flaskext.markdown import Markdown

app = Flask('homepage')

# redirects = [
#     # path, name
#     ('new-mapproxy-1.7.0-release', '017 - 1.7.0 release.markdown'),
#     ('new-mapproxy-1.6.0-release', '016 - 1.6.0 release.markdown'),
#     ('3rd-anniversary-of-mapproxy', '015 - 3rd anniversary.markdown'),
#     ('new-mapproxy-1.5.0-release', '014 - 1.5.0 release.markdown'),
#     ('new-mapproxy-1.4.0-release', '013 - 1.4.0 release.markdown'),
#     ('new-mapproxy-1.3.0-release', '012 - 1.3.0 release.markdown'),
#     ('new-mapproxy-1.2.0-release', '011 - 1.2.0 release.markdown'),
#     ('new-mapproxy-1.1.1-release', '010 - 1.1.1 release.markdown'),
#     ('new-mapproxy-1.1.0-release', '009 - 1.1.0 release.markdown'),
#     ('new-mapproxy-1.0.0-release', '008 - 1.0.0 release.markdown'),
#     ('new-mapproxy-0.9.1-release', '007 - 0.9.1 release.markdown'),
#     ('new-mapproxy-1.5.0-release', '006 - nightly documentation.markdown'),
#     ('new-mapproxy-0.9.0-release', '005 - 0.9.0 release.markdown'),
#     ('new-mapproxy-0.8.5-release', '004 - 0.8.5 release.markdown'),
#     ('improving-the-performance-for-png-requests', '003 - improving png performance.markdown'),
#     ('new-mapproxy-0.8.4-release', '002 - 0.8.4 release.markdown'),
#     ('mapproxy-raster-image-benchmark', '001 - raster image benchmark.markdown'),
# ]

error_codes = ['404']

def create_app(conf=None):
    app.debug = True
    app.language = 'en' # use 'de' or en'
    app.config.setdefault('FREEZER_DEFAULT_MIMETYPE', 'text/html')
    app.config.setdefault('FREEZER_IGNORE_MIMETYPE_WARNINGS', True)

    for error in error_codes:
        app.add_url_rule('/errors/%s.html' % error, error, error_pages, defaults={'error': error})

    Markdown(app)
    return app

def error_pages(error):
    return render_template("errors/"+error+".html", error=error, language=app.language)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(current_app.root_path, 'static', 'img'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
@app.route("/")
def index():
    language = app.language
    return render_template(language+'/index.html', language=language)

@app.route("/<folder>/<name>")
@app.route("/<folder>/")
@app.route("/<name>")
def page(name='', folder=''):
    language = app.language
    if not name:
        name = 'index'
    try:
        return render_template(language+'/'+folder + '/' + name + '.html', pagename=name, folder=folder, language=language)
    except TemplateNotFound:
        abort(404)


