# ShopDB – Каталог товарів на MongoDB

Навчальний проект: каталог товарів інтернет-магазину на основі MongoDB.

## Стек технологій

| Шар | Технологія |
|-----|-----------|
| База даних | MongoDB |
| Бекенд | Node.js + Express |
| ODM | Mongoose |
| Фронтенд | React |

## Структура проекту

```
shop/
├── backend/
│   ├── models/
│   │   ├── Product.js       # Mongoose-схема товару з вкладеними документами
│   │   └── Category.js      # Схема категорій
│   ├── routes/
│   │   ├── products.js      # REST API: GET/POST/PUT/DELETE + відгуки
│   │   └── categories.js    # REST API для категорій
│   ├── server.js            # Express сервер
│   ├── seed.js              # Заповнення БД тестовими даними
│   └── .env.example
└── frontend/
    └── src/
        ├── pages/
        │   ├── CatalogPage.js   # Каталог з пошуком та фільтрацією
        │   └── AdminPage.js     # CRUD-панель адміністратора
        ├── components/
        │   ├── ProductModal.js  # Деталі товару + відгуки
        │   ├── ProductForm.js   # Форма додавання/редагування
        │   └── ReviewModal.js   # Форма відгуку
        └── api.js               # Сервіс для запитів до API
```

## Запуск

### 1. MongoDB
Переконайтеся, що MongoDB запущено локально на порту 27017.

### 2. Бекенд
```bash
cd backend
cp .env.example .env
npm install
node seed.js      # Заповнити БД тестовими даними
npm start         # Сервер на http://localhost:5000
```

### 3. Фронтенд
```bash
cd frontend
npm install
npm start         # Браузер на http://localhost:3000
```

## API Endpoints

| Метод | URL | Опис |
|-------|-----|------|
| GET | /api/products | Всі товари (підтримує ?search= та ?category=) |
| GET | /api/products/:id | Один товар |
| POST | /api/products | Створити товар |
| PUT | /api/products/:id | Оновити товар |
| DELETE | /api/products/:id | Видалити товар |
| POST | /api/products/:id/reviews | Додати відгук |
| GET | /api/categories | Список категорій |

## Структура документа Product у MongoDB

```json
{
  "_id": "ObjectId",
  "name": "Lenovo ThinkPad E14",
  "price": 32000,
  "category": {
    "id": "laptops",
    "name": "Ноутбуки"
  },
  "manufacturer": {
    "name": "Lenovo",
    "country": "China"
  },
  "characteristics": {
    "processor": "Intel Core i7",
    "ram": "16 GB",
    "ssd": "512 GB"
  },
  "reviews": [
    { "user": "Іван", "rating": 5, "comment": "Чудово!" }
  ]
}
```

Ключова перевага: поле `characteristics` – це Map з довільними ключами.
Ноутбук, телевізор і смартфон зберігаються в одній колекції з різними характеристиками – без зміни схеми.


### Env example
```bash
MONGO_URI=mongodb://localhost:27017/shop
PORT=5001
```
