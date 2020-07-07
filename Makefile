up-storybook:
	docker-compose up -d --force-recreate storybook

up: up-storybook

logs:
	docker-compose logs -f

install-storybook:
	docker-compose run --rm storybook "npm install"

install: install-storybook

into-storybook:
	docker-compose exec storybook bash

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
