default: install server

install:
	cp config.js.sample config.js
	npm install

run:
	npm install
	node --harmony server.js

server:
	node --harmony server.js

server-debug:
	DEBUG=* node --harmony server.js

.PHONY: default install run server server-debug
