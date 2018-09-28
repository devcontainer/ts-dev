#!/usr/bin/env bash
# parcel --port ${APP_PORT} --hmr-port ${HMR_PORT} server.ts 
DEBUG=true node -r ts-node/register --nolazy --inspect=0.0.0.0:${DEBUG_PORT} server.ts