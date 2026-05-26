const BASE = '/api';

export const api = {
  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${BASE}/products${query ? '?' + query : ''}`).then(r => r.json());
  },

  getProduct: (id) =>
    fetch(`${BASE}/products/${id}`).then(r => r.json()),

  createProduct: (data) =>
    fetch(`${BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  updateProduct: (id, data) =>
    fetch(`${BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  deleteProduct: (id) =>
    fetch(`${BASE}/products/${id}`, { method: 'DELETE' }).then(r => r.json()),

  addReview: (id, data) =>
    fetch(`${BASE}/products/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  // Categories
  getCategories: () =>
    fetch(`${BASE}/categories`).then(r => r.json()),
};
