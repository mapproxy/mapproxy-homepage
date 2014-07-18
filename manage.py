# -*- coding: utf-8 -*-

from flask.ext.script import Manager
from flask_frozen import Freezer
from homepage import create_app,  error_codes

app = create_app()
manager = Manager(app)

freezer = Freezer(app)

# @freezer.register_generator
# def redirects_url_generator():
#     for redirect in redirects:
#         if app.language == redirect[3] or redirect[3] == '':
#             yield '/'+ redirect[0]

@freezer.register_generator
def errors_url_generator():
    for error in error_codes:
        yield '/errors/%s.html' % error

@manager.option('-l', '--language', help='Build language, start static server')
def freeze(language='de'):
    app.language = language
    app.config['FREEZER_DESTINATION'] = '../build/%s' % language
    freezer.run(debug=True)

@manager.command
def freeze_all():
    app.language = 'de'
    app.config['FREEZER_DESTINATION'] = '../build/de'
    freezer.freeze()

    app.language = 'en'
    app.config['FREEZER_DESTINATION'] = '../build/en'
    freezer.freeze()

if __name__ == "__main__":
    manager.run()


