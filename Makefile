up-http-server:
	docker-compose up -d --force-recreate --build http-server

up-express:
	docker-compose up -d --force-recreate --build express

up-storybook:
	docker-compose up -d --force-recreate storybook

up-webpack:
	docker-compose up -d --force-recreate webpack

up: up-http-server up-express up-storybook up-webpack

logs:
	docker-compose logs -f

install-http-server:
	docker-compose run --rm http-server "npm install"

install-express:
	docker-compose run --rm express "npm install"

install-storybook:
	docker-compose run --rm storybook "npm install"

install-webpack:
	docker-compose run --rm webpack "npm install"

install: install-http-server install-express install-storybook install-webpack

into-http-server:
	docker-compose exec http-server bash

into-express:
	docker-compose exec express bash

into-sandbox:
	docker-compose run --rm sandbox

into-storybook:
	docker-compose exec storybook bash

into-webpack:
	docker-compose exec webpack bash

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
