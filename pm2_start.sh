#! /bin/bash
SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
cd "$SHELL_FOLDER"

set -x -e -u -o pipefail

#if [[ ! -d "dist" ]]; then
    #mkdir dist
#fi

#rm -rf dist
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
pm2 start --watch ./app.js


