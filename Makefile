WORKDIR=$(shell pwd)

up:
	docker-compose up backend

npm-install:
	docker-compose exec frontend npm i ${PACKAGE}

build: build-frontend build-backend

build-frontend:
	docker-compose build frontend

build-backend:
	docker-compose build backend

# TODO: fix these
autoformat-frontend:
	docker-compose run --rm frontend npm run autoformat

autoformat-backend:
	docker-compose run --rm backend npm run 

autoformat-tool: autoformat-frontend autoformat-backend