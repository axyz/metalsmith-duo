mocha=node_modules/.bin/mocha --reporter spec --harmony-generators

node_modules: package.json
	@npm install

test: node_modules
	@$(mocha)

.PHONY: test
