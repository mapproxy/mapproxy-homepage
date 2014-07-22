import os

import datetime
import feedformatter
from flask import Flask, render_template, send_from_directory, current_app, abort, Response, url_for
from flask.templating import TemplateNotFound
from flaskext.markdown import Markdown
from .blog import parse_blog_entries

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
    blog_entries = []
    language = app.language
    if language == 'en':
        blog_dir = os.path.join(current_app.root_path, 'templates', 'blog', 'en')
        blog_entries = parse_blog_entries(blog_dir)
    return render_template(language+'/index.html', language=language, entries=blog_entries)


@app.route("/blog/feed")
def blog_feed():
    blog_dir = os.path.join(current_app.root_path, 'templates', 'blog', 'en')
    blog_entries = parse_blog_entries(blog_dir)

    for header, _ in blog_entries:
        header['permalink'] = url_for('blog', slug=header['slug'], _external=True)

    rss = render_template(os.path.join('base', 'rss.xml'),
        entries=blog_entries,
        now=datetime.datetime.utcnow(),
    )
    return Response(rss, mimetype='application/xml')

@app.route("/blog/")
@app.route("/blog/<slug>")
def blog(slug=None):
    blog_dir = os.path.join(current_app.root_path, 'templates', 'blog', 'en')
    blog_entries = parse_blog_entries(blog_dir)

    if slug:
        blog_entries = [(h, c) for h, c in blog_entries if h['slug'] == slug]

    return render_template(os.path.join('base', 'blog.html'), language=app.language, entries=blog_entries)

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


