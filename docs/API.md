# API Reference

## Auth

### POST /api/auth/register
- Body: `{ "nickname", "password" }`
- Response: `{ "user": {...}, "token": "..." }`

### POST /api/auth/login
- Body: `{ "nickname", "password" }`
- Response: `{ "user": {...}, "token": "..." }`

## Wallet

### GET /api/wallet/balance
- Headers: `Authorization: Bearer <token>`
- Response: `{ "balance": 100 }`

### POST /api/wallet/create
- Headers: `Authorization: Bearer <token>`
- Response: `{ "wallet": {...} }`
