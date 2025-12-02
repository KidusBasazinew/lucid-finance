# Lucid Finance API (server)

## Prerequisites

- Bun v1.2+
- PostgreSQL connection string in `.env` as `DATABASE_URL`
- Recommended: set `JWT_SECRET` and `JWT_REFRESH_SECRET`

## Install

```bash
cd packages/server
bun install
```

## Database & Prisma

- Prisma v7 is configured via `prisma.config.ts` (not `schema.prisma`).
- Ensure `DATABASE_URL` is set in `packages/server/.env`.

Generate Prisma Client:

```bash
cd packages/server
bun x prisma generate
```

Run migrations (adds `InvestmentStatus.PENDING` etc.):

```bash
cd packages/server
bun x prisma migrate dev --name init
```

## Run (dev)

```bash
cd packages/server
bun run dev
```

## API Base URL

`/api/v1`

## Auth

- `POST /api/v1/auth/register` { phone, password, email?, firstName?, lastName?, referralCode? }
- `POST /api/v1/auth/login` { phone, password }
- `POST /api/v1/auth/refresh` { refreshToken }
- `GET /api/v1/auth/me` Bearer token

## Packages

- `GET /api/v1/packages?limit=&page=&sort=&order=`
- `GET /api/v1/packages/:id`
- `POST /api/v1/packages` admin-only in production
- `PATCH /api/v1/packages/:id`

## Investments

- `GET /api/v1/investments` (auth, paginated)
- `POST /api/v1/investments` { packageId } (auth)

### Admin

- `PATCH /api/v1/admin/investments/:id/approve` (auth+admin)
- `POST /api/v1/admin/profits/process` (auth+admin)

## Wallet

- `GET /api/v1/wallet/me` (auth)

## Transactions

- `GET /api/v1/transactions` (auth, paginated)

## Referrals

- `GET /api/v1/referrals` (auth, paginated)

## Withdrawals

- `GET /api/v1/withdrawals` (auth, paginated)
- `POST /api/v1/withdrawals` { amountCents, destination } (auth)
- `PATCH /api/v1/admin/withdrawals/:id/approve` (auth+admin)
- `PATCH /api/v1/admin/withdrawals/:id/reject` (auth+admin)
- `PATCH /api/v1/admin/withdrawals/:id/paid` (auth+admin)

## Notes

- All list endpoints support pagination with `page`, `limit` (max 100), `sort`, and `order`.
- Phone is the primary identifier; email is optional.
- Monetary fields use cents and BPS (basis points) for accuracy.
- To enable `PENDING` investments end-to-end, run migrations after setting `DATABASE_URL`.
