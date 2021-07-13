RSYNC_OPTS = -a -v -P

all:
	@echo "main command:"
	@echo " update_all - make everything: build_all, sync"
	@echo "subcommands:"
	@echo " build_all  - rebuild static homepage (frozen-flask)"
	@echo " sync       - sync static homepage with rsync"

update_all: build_all sync

build_all:
	python manage.py freeze_all

sync:
	rsync $(RSYNC_OPTS) build/en/ user@host:/opt/www/mapproxy.org/
	rsync $(RSYNC_OPTS) build/de/ user@host:/opt/www/mapproxy.de/

