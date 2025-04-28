#!/usr/bin/env bash
set -e

npx typeorm-ts-node-commonjs migration:generate ./src/migrations/"$1" -d ./src/datasource.ts
