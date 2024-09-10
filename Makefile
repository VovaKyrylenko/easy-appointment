.PHONY: install build_prod db_prod serve_prod build_dev db_dev extension

prod: install build_prod db_prod serve_prod
dev: install build_dev db_dev

deploy:
	git pull
	npm install
	npm run build
	npx prisma db push
	pm2 startOrRestart ecosystem.json
	pm2 save 
