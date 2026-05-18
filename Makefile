.PHONY: up build preview install clean deploy-test help

HTML_DIR := html

up: ## Start dev server
	cd $(HTML_DIR) && npm run dev

build: ## Production build → html/dist/
	cd $(HTML_DIR) && npm run build

preview: ## Preview production build locally
	cd $(HTML_DIR) && npm run preview

install: ## Install dependencies
	cd $(HTML_DIR) && npm install

deploy-test: ## Build and rsync dist/ to test server (klim.serv:/home/www/okna/)
	cd $(HTML_DIR) && npm run build
	rsync -avz --delete $(HTML_DIR)/dist/ klim.serv:/home/www/okna/

clean: ## Remove html/dist/ and html/node_modules/
	rm -rf $(HTML_DIR)/dist $(HTML_DIR)/node_modules

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
