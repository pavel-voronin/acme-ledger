# acme-ledger

## First run

```
docker-compose up
```

Run migrations:

```
docker-compose exec app npx prisma migrate dev
```

Seed with 2 accounts:

```
docker-compose cp ./db/seed.sql db:/seed.sql
docker-compose exec db psql postgres postgres -f /seed.sql
```

## Next run

```
docker-compose up
```

## Usage

Make transactions:

```
curl --request POST \
  --url http://localhost:3000/v1/transfers \
  --header 'content-type: application/json' \
  --header 'idempotency-key: abcdef123456' \
  --data '{"from_account": "cjld2cyuq0000t3rmniod1foy","to_account": "cldmt86vb0023356kz6cc10p0","amount": "0.000001"}'
```

Check the balance:

```
curl --request GET \
  --url http://localhost:3000/v1/accounts/cjld2cyuq0000t3rmniod1foy
```

Get transactions:

```
curl --request GET \
  --url 'http://localhost:3000/v1/transfers?account_id=cjld2cyuq0000t3rmniod1foy'
```

## Tests

```
npm run tests
```

## Development track

- [x] Develop the plan
- [x] Start timer 4h // 14:21
- [x] [Task definition](TASK.md) // 14:27
- [x] Tech stack: express.js, Prisma.io, docker, OpenApi spec, Vitest // 14:30
- [x] Project structure + github repo + docker compose // 14:34
- [x] Domain design // 14:49
- [x] OpenApi specs // 15:19
- [x] Data models design // 15:32
- [x] Development // 17:22
- [x] Test // 18:00
- [x] Dockerize // 18:20
- [x] Stop timer // 18:21 - 4h
- [x] Documentation
- [x] What is next?

## TODO

- cuid -> cuid2
- errors mechanism
- transactions list paging: cursors or offset+limit
- Dockerfile security!
- Make code entities' names more consistent
- monitor & debug
- indexes