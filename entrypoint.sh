#!/bin/sh

npm i
echo "====== run migrate ======"

npm run build

node dist/index.js