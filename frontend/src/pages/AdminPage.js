import React, { useState, useEffect } from 'react';
import { api } from '../api';
import ProductForm from '../components/ProductForm';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null=closed, 'new'=new, product=edit
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const data = await api.getProducts();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Видалити "${name}"?`)) return;
    await api.deleteProduct(id);
    load();
  };

  const handleSave = async (data) => {
    setError('');
    try {
      if (editing && editing !== 'new') {
        await api.updateProduct(editing._id, data);
      } else {
        await api.createProduct(data);
      }
      setEditing(null);
      load();
    } catch (e) {
      setError('Помилка збереження');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Управління товарами</h1>
        <button className="btn btn-primary" onClick={() => setEditing('new')}>
          + Додати товар
        </button>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Завантаження...</div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)' }}>Назва</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)' }}>Категорія</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)' }}>Виробник</th>
                <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted)' }}>Ціна</th>
                <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600, color: 'var(--text-muted)' }}>Відгуків</th>
                <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted)' }}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                    Немає товарів
                  </td>
                </tr>
              ) : products.map(p => (
                <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>{p.category?.name || '—'}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>{p.manufacturer?.name || '—'}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600 }}>
                    {p.price.toLocaleString('uk-UA')} грн
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {p.reviews?.length || 0}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditing(p)}>
                        ✏️ Ред.
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id, p.name)}>
                        🗑 Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== null && (
        <ProductForm
          product={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
