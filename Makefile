.PHONY: help build up down logs restart stop clean dev

help:
	@echo "MagicStream Docker Commands"
	@echo "================================"
	@echo "make build     - Build all Docker images"
	@echo "make up        - Start all containers"
	@echo "make down      - Stop all containers"
	@echo "make restart   - Restart all containers"
	@echo "make logs      - View logs from all containers"
	@echo "make logs-server - View server logs"
	@echo "make logs-client - View client logs"
	@echo "make logs-db   - View MongoDB logs"
	@echo "make stop      - Stop containers without removing them"
	@echo "make clean     - Remove containers, volumes, and images"
	@echo "make ps        - Show running containers"

build:
	@echo "Building Docker images..."
	docker-compose build

up:
	@echo "Starting containers..."
	docker-compose up -d

down:
	@echo "Stopping and removing containers..."
	docker-compose down

restart: down up
	@echo "Containers restarted"

stop:
	@echo "Stopping containers..."
	docker-compose stop

logs:
	docker-compose logs -f

logs-server:
	docker-compose logs -f server

logs-client:
	docker-compose logs -f client

logs-db:
	docker-compose logs -f mongodb

ps:
	docker-compose ps

clean:
	@echo "Cleaning up Docker resources..."
	docker-compose down -v --remove-orphans
	docker system prune -f

dev: up logs
