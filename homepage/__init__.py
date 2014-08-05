import os

import datetime
from flask import Flask, render_template, send_from_directory, current_app, abort, Response, url_for
from flask.templating import TemplateNotFound
from .blog import parse_blog_entries

app = Flask('homepage')

error_codes = ['404']

def create_app(conf=None):
    app.debug = True
    app.language = 'en' # use 'de' or en'
    app.config.setdefault('FREEZER_DEFAULT_MIMETYPE', 'text/html')
    app.config.setdefault('FREEZER_IGNORE_MIMETYPE_WARNINGS', True)

    for error in error_codes:
        app.add_url_rule('/errors/%s.html' % error, error, error_pages, defaults={'error': error})
    return app

def error_pages(error):
    return render_template("errors/"+error+".html", error=error, language=app.language)

@app.route('/mapproxy.png')
def mapproxy_png():
    return send_from_directory(os.path.join(current_app.root_path, 'static', 'img'), 'mapproxy-overview.png')

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


@app.route("/blog/feed/")
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
@app.route("/blog/<slug>/")
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


