require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shop';

const categories = [
  { id: 'laptops', name: 'Ноутбуки' },
  { id: 'tvs', name: 'Телевізори' },
  { id: 'phones', name: 'Смартфони' },
];

const products = [
  {
    name: 'Lenovo ThinkPad E14',
    price: 32000,
    description: 'Надійний бізнес-ноутбук з потужним процесором Intel Core i7.',
    imageUrl: 'https://placehold.co/400x300/1a1a2e/ffffff?text=ThinkPad+E14',
    category: { id: 'laptops', name: 'Ноутбуки' },
    manufacturer: { name: 'Lenovo', country: 'China' },
    characteristics: {
      processor: 'Intel Core i7-1255U',
      ram: '16 GB DDR4',
      ssd: '512 GB NVMe',
      display: '14" IPS FHD',
      os: 'Windows 11 Pro'
    },
    reviews: [
      { user: 'Іван', rating: 5, comment: 'Чудовий ноутбук, працює швидко!' },
      { user: 'Олена', rating: 4, comment: 'Добра якість збірки, рекомендую.' }
    ]
  },
  {
    name: 'ASUS VivoBook 15',
    price: 22000,
    description: 'Стильний та доступний ноутбук для навчання та роботи.',
    imageUrl: 'https://placehold.co/400x300/1a1a2e/ffffff?text=VivoBook+15',
    category: { id: 'laptops', name: 'Ноутбуки' },
    manufacturer: { name: 'ASUS', country: 'Taiwan' },
    characteristics: {
      processor: 'AMD Ryzen 5 5600H',
      ram: '8 GB DDR4',
      ssd: '256 GB SSD',
      display: '15.6" IPS FHD',
      battery: '50 Wh'
    },
    reviews: [
      { user: 'Михайло', rating: 4, comment: 'Гарне співвідношення ціна/якість.' }
    ]
  },
  {
    name: 'Samsung QLED 55"',
    price: 28000,
    description: '4K телевізор з технологією QLED та Smart TV.',
    imageUrl: 'https://placehold.co/400x300/0d1117/ffffff?text=Samsung+QLED',
    category: { id: 'tvs', name: 'Телевізори' },
    manufacturer: { name: 'Samsung', country: 'South Korea' },
    characteristics: {
      diagonal: '55 дюймів',
      resolution: '3840x2160 (4K)',
      matrix: 'QLED',
      hdr: 'HDR10+',
      smarttv: 'Tizen OS'
    },
    reviews: [
      { user: 'Сергій', rating: 5, comment: 'Неймовірна якість зображення!' },
      { user: 'Наталія', rating: 5, comment: 'Купили для вітальні — дуже задоволені.' }
    ]
  },
  {
    name: 'LG OLED 48"',
    price: 35000,
    description: 'Преміум OLED телевізор з ідеальним чорним кольором.',
    imageUrl: 'https://placehold.co/400x300/0d1117/ffffff?text=LG+OLED',
    category: { id: 'tvs', name: 'Телевізори' },
    manufacturer: { name: 'LG', country: 'South Korea' },
    characteristics: {
      diagonal: '48 дюймів',
      resolution: '3840x2160 (4K)',
      matrix: 'OLED',
      hdr: 'Dolby Vision',
      smarttv: 'webOS',
      refresh_rate: '120 Hz'
    },
    reviews: []
  },
  {
    name: 'iPhone 15 Pro',
    price: 45000,
    description: 'Флагманський смартфон Apple з чіпом A17 Pro та камерою 48 МП.',
    imageUrl: 'https://placehold.co/400x300/2d2d2d/ffffff?text=iPhone+15+Pro',
    category: { id: 'phones', name: 'Смартфони' },
    manufacturer: { name: 'Apple', country: 'USA' },
    characteristics: {
      chip: 'Apple A17 Pro',
      camera: '48 MP Triple',
      battery: '3274 mAh',
      storage: '256 GB',
      display: '6.1" Super Retina XDR',
      sim: '1 SIM + eSIM'
    },
    reviews: [
      { user: 'Андрій', rating: 5, comment: 'Найкращий смартфон!' }
    ]
  },
  {
    name: 'Samsung Galaxy S24',
    price: 38000,
    description: 'Потужний Android-смартфон із функціями штучного інтелекту.',
    imageUrl: 'https://placehold.co/400x300/2d2d2d/ffffff?text=Galaxy+S24',
    category: { id: 'phones', name: 'Смартфони' },
    manufacturer: { name: 'Samsung', country: 'South Korea' },
    characteristics: {
      chip: 'Snapdragon 8 Gen 3',
      camera: '50 MP Triple',
      battery: '4000 mAh',
      storage: '128 GB',
      display: '6.2" Dynamic AMOLED',
      sim: '2 SIM'
    },
    reviews: [
      { user: 'Юлія', rating: 4, comment: 'Швидкий, гарний екран.' }
    ]
  }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await Product.deleteMany({});
  await Category.deleteMany({});

  await Category.insertMany(categories);
  console.log(`${categories.length} категорій додано`);

  await Product.insertMany(products);
  console.log(`${products.length} товарів додано`);

  await mongoose.disconnect();
  console.log('Seed завершено!');
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
