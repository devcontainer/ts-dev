#!/bin/bash
set -x

ROOT_DIR="$(dirname $0)/.."

PROJECTS=("sbx" "")
# DEPLOYMENT_ZONE = dev | prod | qa
DEPLOYMENT_ZONE=("default" "prod" "qa" "dev")
randFile=$(md5 <(echo $(pwd)) | cut -d' ' -f4 | cut  -c1-6)
OIFS="${IFS}"
IFS=","
# READ ENV VARS in order default,prod,qa,dev
eval find  "${ROOT_DIR}/environment/.{${DEPLOYMENT_ZONE[*]},}.env" -type f -exec sed -E 's/^\ \*\[^#\]+/export\ \&/g' '{}'  2>/dev/null + > ${randFile}
IFS="${OIFS}"
unset -v IFS
source ${randFile} && rm -rf ${randFile}

docker-compose -f ${ROOT_DIR}/docker-compose.yml $([[ "${DEBUG}" = true ]] && echo "-f ${ROOT_DIR}/docker-compose.debug.yml") config
docker-compose -f ${ROOT_DIR}/docker-compose.yml $([[ "${DEBUG}" = true ]] && echo "-f ${ROOT_DIR}/docker-compose.debug.yml") down --remove-orphans
docker-compose --file ${ROOT_DIR}/docker-compose.yml $([[ "${DEBUG}" = true ]] && echo "-f ${ROOT_DIR}/docker-compose.debug.yml") --project-name ${PROJECT_NAME:-$(basename ${PWD%/*})} up --build