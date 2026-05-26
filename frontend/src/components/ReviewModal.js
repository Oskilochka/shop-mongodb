import React, { useState } from 'react';
import { api } from '../api';

export default function ReviewModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState({ user: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.user.trim()) return alert('Введіть ваше ім\'я');
    setLoading(true);
    await api.addReview(product._id, form);
    setLoading(false);
    onSaved();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Залишити відгук</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div style={{ marginBottom: 16, fontSize: 14, color: 'var(--text-muted)' }}>
            {product.name}
          </div>

          <div className="form-group">
            <label>Ваше ім'я</label>
            <input
              value={form.user}
              onChange={e => setForm({ ...form, user: e.target.value })}
              placeholder="Наприклад: Іван"
            />
          </div>

          <div className="form-group">
            <label>Оцінка</label>
            <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>{'★'.repeat(n)} {n}/5</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Коментар</label>
            <textarea
              rows={3}
              value={form.comment}
              onChange={e => setForm({ ...form, comment: e.target.value })}
              placeholder="Ваша думка про товар..."
            />
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={onClose}>Скасувати</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Збереження...' : '✓ Зберегти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
