#!/bin/sh
set -e

echo "Waiting for MongoDB..."
until nc -z mongodb 27017; do
  sleep 1
done
echo "MongoDB is ready."

echo "Running database seed..."
npx tsx prisma/seed.ts

echo "Starting application..."
exec node server.js
