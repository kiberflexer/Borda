NAME   := borda/borda
#TAG    := $(git log -1 --pretty=%!H(MISSING))
TAG    := $(shell git log --format="%h" -n 1)
VERSION:= $(shell node -p "require('./package.json').version")
IMG    := ${NAME}:v${VERSION}-${TAG}
LATEST := ${NAME}:latest

build-docker:
	@docker build --tag ${IMG} .
	@docker tag ${IMG} ${LATEST}

push:
	@docker push ${NAME}

login:
	@docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}

compose:
	docker-compose up -d

compose-build:
	docker-compose build

compose-logs:
	docker-compose logs -f

compose-down:
	docker-compose down --remove-orphans || true

compose-clear:
	docker-compose down -v --remove-orphans || true

compose-stop:
	docker-compose stop || true

compose-restart:
	docker-compose restart