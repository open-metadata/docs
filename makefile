.PHONY: all
all:
	npm i

.PHONY: up
up:
	npm run dev

.PHONY: start
start:
	npm run start

.PHONY: build
build:
	npm run build

.PHONY: export
export:
	npm run export

.PHONY: search
search:
	python -m venv search-venv; \
		. search-venv/bin/activate; \
		pip install -r requirements.txt; \
		python scripts/build_search_index.py; \
		rm -rf search-venv;
