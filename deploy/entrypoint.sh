#!/bin/bash
set -e

if ! which npm >/dev/null; then

apk update
apk add npm
npm install -g ts-node
echo "Installing modules, please wait..."

fi; 

npm install

echo "Migrating database..."
./node_modules/.bin/prisma migrate dev
npx ts-node prisma/seed.ts

echo "Starting..."
npm run start:dev

#tail -f /dev/null