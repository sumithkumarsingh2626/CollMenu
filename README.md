# CollMenu

CollMenu now includes a modular premium frontend and a production-ready backend for a college canteen ordering system.

## Backend Highlights

- Express API with clean route, controller, model, middleware, config, and service separation
- MongoDB-ready data layer using Mongoose
- Automatic local JSON fallback when `DB_URL` is not configured or MongoDB is unavailable
- Working menu, cart, and order APIs with validation, error handling, order status, and timestamps
- CORS enabled and static frontend served from the same server

## Folder Structure

```text
.
|-- app.js
|-- server.js
|-- package.json
|-- config
|   |-- database.js
|   `-- env.js
|-- controllers
|   |-- cartController.js
|   |-- menuController.js
|   `-- orderController.js
|-- data
|   |-- localStore.js
|   `-- menuSeed.js
|-- middlewares
|   |-- errorHandler.js
|   |-- notFound.js
|   `-- validate.js
|-- models
|   |-- CartItem.js
|   |-- MenuItem.js
|   `-- Order.js
|-- routes
|   |-- cartRoutes.js
|   |-- menuRoutes.js
|   `-- orderRoutes.js
|-- services
|   `-- dataStore.js
|-- utils
|   |-- apiError.js
|   |-- app-utils.js
|   `-- serializers.js
|-- frontend files...
```

## API Endpoints

### Menu

- `GET /menu`
- `GET /menu/:id`
- `POST /menu`
- `PUT /menu/:id`
- `DELETE /menu/:id`

### Cart

- `GET /cart`
- `POST /cart`
- `PUT /cart/:id`
- `DELETE /cart/:id`

### Order

- `POST /order`
- `GET /order`
- `GET /order/:id`

### Health

- `GET /health`

## Environment

Copy `.env.example` to `.env` and adjust values if needed:

```env
PORT=3000
DB_URL=mongodb://127.0.0.1:27017/collmenu
CORS_ORIGIN=http://127.0.0.1:3000
```

## Run Locally

```bash
npm install
npm run dev
```

For production-style startup:

```bash
npm start
```

Open the app at `http://127.0.0.1:3000`

## Request Examples

Add to cart:

```json
{
  "itemId": "menu-item-id",
  "quantity": 2
}
```

Create or update menu item:

```json
{
  "name": "Paneer Burger",
  "price": 85,
  "image": "https://example.com/paneer-burger.jpg",
  "category": "Snacks",
  "description": "Fresh paneer patty with mint mayo",
  "tag": "New",
  "prepTime": "7 min",
  "rating": "4.6"
}
```

Update cart quantity:

```json
{
  "quantity": 3
}
```
