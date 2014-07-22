import glob
import os
import re
import io
import markdown

from pytz import timezone
localtz = timezone('Europe/Berlin')

from datetime import datetime
import logging
log = logging.getLogger(__name__)

def make_slug(title):
    return re.sub('[^a-z.0-9]', '-', title.lower())


def parse_blog_entries(blog_dir):
    blog_entries = []
    for blog_filename in sorted(glob.glob(os.path.join(blog_dir, '*.markdown')), reverse=True):
        header, content = parse_blog_entry(blog_filename)
        content = markdown.markdown(content)
        blog_entries.append((header, content))
    return blog_entries

def parse_blog_slugs(blog_dir):
    for header, _ in parse_blog_entries(blog_dir):
        yield header['slug']

def parse_blog_entry(filename):
    header_lines = []
    content_lines = []
    in_header = False
    with io.open(filename, encoding='utf8') as f:
        for line in f:
            line = line.rstrip('\n')
            if line.strip() == '' and not content_lines and not header_lines:
                # skip empty lines at begining
                continue
            if line.strip() == '---':
                if in_header:
                    in_header = False
                else:
                    if content_lines and not header_lines:
                        log.warn('no header at start of ' + filename)
                    else:
                        in_header = True
                continue

            if in_header:
                header_lines.append(line)
            else:
                content_lines.append(line)

    headers = {}
    for key, value in (l.split(':', 1) for l in header_lines):
        value = value.strip()
        if key == 'date':
            # parse date in format 2010/06/24 00:00:00
            value = localtz.localize(datetime.strptime(value, '%Y/%m/%d %H:%M:%S'))
        elif key == 'tags':
            value = [v.strip() for v in value.split(',')]
        elif key == 'title':
            headers['slug'] = make_slug(value)
        headers[key] = value

    return headers, '\n'.join(content_lines)
