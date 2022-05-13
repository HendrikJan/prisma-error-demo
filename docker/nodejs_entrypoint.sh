#!/usr/bin/env bash

# Wait for the database
echo "wait for mariadb"
/wait-for-it.sh "mariadb.prisma_demo:3306" -t 120

# generate the Prisma client based on the /prisma/schema.prisma file
npx prisma generate

# Migrate the database
npx prisma migrate reset --force

# Run the main application
npm run dev

# now tail dev/null to keep it running for ever.
echo '🚀 NodeJS container is up'
tail -f /dev/null
