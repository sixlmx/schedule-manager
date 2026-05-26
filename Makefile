.PHONY: setup setup-windows install-git-hooks install-git-hooks-windows

setup:
	make install-git-hooks
	npm ci
	cd backend && npm ci
	cd frontend-admin && npm ci
	cd frontend-public && npm ci

setup-windows:
	make install-git-hooks-windows
	npm ci
	cd backend && npm ci
	cd frontend-admin && npm ci
	cd frontend-public && npm ci

start-server:
	cd backend && node src/index.js

start-front-public:
	cd frontend-public && npm run dev

start-front-admin:
	cd frontend-admin && npm run dev

lint:
	npm run lint
	npm run lint:css

lint-fix:
	npx eslint . --fix
	npx stylelint "frontend-admin/globals.css" "frontend-admin/src/**/*.css" --fix
	npx stylelint "frontend-public/globals.css" "frontend-public/src/**/*.css" --fix

pre-push: lint-fix
	@echo "✅ lint checks passed"

install-git-hooks:
	mkdir -p .git/hooks
	echo '#!/bin/sh' > .git/hooks/pre-push
	echo 'make pre-push || exit 1' >> .git/hooks/pre-push
	chmod +x .git/hooks/pre-push
	git config core.hooksPath .git/hooks
	@echo "✅ Git hooks installed"

install-git-hooks-windows:
	powershell -NoProfile -ExecutionPolicy Bypass -Command "$$hook = @('#!/bin/sh', 'make pre-push || exit 1'); New-Item -ItemType Directory -Force '.git/hooks' | Out-Null; Set-Content -Path '.git/hooks/pre-push' -Value $$hook -Encoding ascii; git config core.hooksPath .git/hooks; Write-Output 'Git hooks installed'"
