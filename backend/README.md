# Baba Canteen Backend

Production Express API for college canteen ordering.

## Setup

```bash
npm install
copy .env.example .env
# Set DB_URL for Mongo or use local JSON fallback
npm run dev  # port 5000
```

## Admin
```
POST /admin/login
email: admin@baba.com
pass: admin123
```
Token for /admin/menu CRUD.

## APIs
- /menu (CRUD)
- /cart (CRUD)
- /order (create/list)

Frontend proxy to :5000/api.

