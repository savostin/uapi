#!/bin/bash
set -e

if [ ! -d /app/node_modules/ ]; then

apk update
apk add npm
echo "Installing modules, please wait..."
npm install

echo "Migrating database..."
./node_modules/.bin/prisma migrate dev
npx ts-node prisma/seed.ts

fi;

echo "Starting..."
npm run start:dev

#tail -f /dev/null