import React, { useState, useEffect } from 'react';
import { api } from '../api';

const EMPTY = {
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  category: { id: '', name: '' },
  manufacturer: { name: '', country: '' },
  characteristics: []  // [{key, value}] locally, converted to map on save
};

export default function ProductForm({ product, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [chars, setChars] = useState([{ key: '', value: '' }]);

  useEffect(() => {
    api.getCategories().then(data => setCategories(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    if (product) {
      const charsObj = product.characteristics || {};
      const charsArr = Object.entries(charsObj).map(([key, value]) => ({ key, value }));
      setForm({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        imageUrl: product.imageUrl || '',
        category: product.category || { id: '', name: '' },
        manufacturer: product.manufacturer || { name: '', country: '' },
      });
      setChars(charsArr.length ? charsArr : [{ key: '', value: '' }]);
    }
  }, [product]);

  const handleCategoryChange = (id) => {
    const cat = categories.find(c => c.id === id);
    setForm(f => ({ ...f, category: cat ? { id: cat.id, name: cat.name } : { id: '', name: '' } }));
  };

  const addChar = () => setChars(c => [...c, { key: '', value: '' }]);
  const removeChar = (i) => setChars(c => c.filter((_, idx) => idx !== i));
  const updateChar = (i, field, val) =>
    setChars(c => c.map((row, idx) => idx === i ? { ...row, [field]: val } : row));

  const handleSubmit = () => {
    if (!form.name.trim()) return alert('Введіть назву товару');
    if (!form.price || isNaN(form.price)) return alert('Введіть коректну ціну');

    const characteristics = {};
    chars.forEach(({ key, value }) => {
      if (key.trim()) characteristics[key.trim()] = value.trim();
    });

    onSave({
      ...form,
      price: Number(form.price),
      characteristics
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{product ? 'Редагувати товар' : 'Додати товар'}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">

          <div className="form-group">
            <label>Назва *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Lenovo ThinkPad E14" />
          </div>

          <div className="inline-grid">
            <div className="form-group">
              <label>Ціна (грн) *</label>
              <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="32000" />
            </div>
            <div className="form-group">
              <label>Категорія</label>
              <select value={form.category.id} onChange={e => handleCategoryChange(e.target.value)}>
                <option value="">— Оберіть —</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="inline-grid">
            <div className="form-group">
              <label>Виробник</label>
              <input value={form.manufacturer.name} onChange={e => setForm(f => ({ ...f, manufacturer: { ...f.manufacturer, name: e.target.value } }))} placeholder="Lenovo" />
            </div>
            <div className="form-group">
              <label>Країна</label>
              <input value={form.manufacturer.country} onChange={e => setForm(f => ({ ...f, manufacturer: { ...f.manufacturer, country: e.target.value } }))} placeholder="China" />
            </div>
          </div>

          <div className="form-group">
            <label>Опис</label>
            <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Короткий опис товару..." />
          </div>

          <div className="form-group">
            <label>URL зображення</label>
            <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." />
          </div>

          <div className="form-group">
            <label>Характеристики (довільні поля — перевага MongoDB)</label>
            {chars.map((c, i) => (
              <div key={i} className="char-row">
                <input placeholder="Назва" value={c.key} onChange={e => updateChar(i, 'key', e.target.value)} />
                <input placeholder="Значення" value={c.value} onChange={e => updateChar(i, 'value', e.target.value)} />
                <button className="btn btn-danger btn-sm" onClick={() => removeChar(i)} title="Видалити">−</button>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm char-add" onClick={addChar}>+ Додати характеристику</button>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
            <button className="btn btn-ghost" onClick={onClose}>Скасувати</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {product ? '✓ Зберегти зміни' : '+ Додати товар'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
