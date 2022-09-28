# Backend

## Getting started

### Database

`docker compose up -d`

Database related info found in the `.env` file in the backend folder.

### Migrations

#### Empty database

If you have an empty database running, you can get everything running by:

1. create the database tables (run all existing migrations)

`npm run prisma:migrate`

2. seed the database with a few test cases

`npm run prisma:seed`

3. generate the models from the schema

`npm run prisma:generate`

#### New migrations

To create a new migration:

`npx prisma migrate dev --name NAME`
