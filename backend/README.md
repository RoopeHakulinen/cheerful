# Backend

## Getting started

### Database

```bash
docker run --name cheerful --rm -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=cheerful -d postgres
```

#### Migrations

Generate a migration:

```bash
npm run migrations:generate <migration name>
```

Run migrations:

```bash
npm run migrations:run
```

#### Seeds

Generate a seed:

```bash
npm run seeds:generate <seeds name>
```

Run seeds:

```bash
npm run seeds:run
```


