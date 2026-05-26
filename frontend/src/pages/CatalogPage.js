import React, { useState, useEffect } from 'react';
import { api } from '../api';
import ProductModal from '../components/ProductModal';
import ReviewModal from '../components/ReviewModal';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState(null);
  const [reviewTarget, setReviewTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    const data = await api.getProducts(params);
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    api.getCategories().then(data => setCategories(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  const avgRating = (reviews) => {
    if (!reviews?.length) return null;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  };

  const stars = (n) => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Каталог товарів</h1>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {products.length} товарів
        </span>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Пошук товарів..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Всі категорії</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {(search || category) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setCategory(''); }}>
            ✕ Скинути
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">Завантаження...</div>
      ) : products.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">📭</div>
          <div>Товарів не знайдено</div>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => {
            const rating = avgRating(product.reviews);
            return (
              <div key={product._id} className="product-card">
                <img
                  src={product.imageUrl || `https://placehold.co/400x300/e5e5e5/999999?text=${encodeURIComponent(product.name)}`}
                  alt={product.name}
                  onClick={() => setSelected(product)}
                />
                <div className="product-card-body">
                  <div className="product-card-category">{product.category?.name}</div>
                  <div className="product-card-name" onClick={() => setSelected(product)}>
                    {product.name}
                  </div>
                  {rating && (
                    <div style={{ fontSize: 12, color: '#f59e0b', marginBottom: 4 }}>
                      {stars(rating)} <span style={{ color: 'var(--text-muted)' }}>({product.reviews.length})</span>
                    </div>
                  )}
                  <div className="product-card-price">
                    {product.price.toLocaleString('uk-UA')} <span>грн</span>
                  </div>
                  <div className="product-card-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelected(product)}>
                      👁 Детальніше
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setReviewTarget(product)}>
                      ✍️ Відгук
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}

      {reviewTarget && (
        <ReviewModal
          product={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onSaved={() => { setReviewTarget(null); load(); }}
        />
      )}
    </div>
  );
}
