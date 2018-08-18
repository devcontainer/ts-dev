#!/bin/bash
yarn install
./node_modules/.bin/parcel --port ${APP_PORT} --hmr-port ${HMR_PORT} index.html