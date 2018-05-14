#!/bin/bash
set -e
if [ -z "$1" ]; then
  npm run run-with-settings 'npm run lint && npm run jest'
else
  npm run run-with-settings 'npm run lint && ./node_modules/.bin/jest --maxWorkers=2'
fi
