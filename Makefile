
RSYNC_OPTS = -a -v -P --delete-after

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
	rsync $(RSYNC_OPTS) build/en/ os@dev.omniscale.net:/opt/www/mapproxy.org/www/
	rsync $(RSYNC_OPTS) build/de/ os@dev.omniscale.net:/opt/www/mapproxy.de/

