up-http-server:
	docker-compose up -d --force-recreate --build http-server

up-storybook:
	docker-compose up -d --force-recreate storybook

up: up-http-server up-storybook

logs:
	docker-compose logs -f

install-http-server:
	docker-compose run --rm http-server "npm install"

install-storybook:
	docker-compose run --rm storybook "npm install"

install: install-http-server install-storybook

into-http-server:
	docker-compose exec http-server bash

into-storybook:
	docker-compose exec storybook bash

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
