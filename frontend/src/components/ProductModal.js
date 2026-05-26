import React from 'react';

export default function ProductModal({ product, onClose }) {
  const chars = product.characteristics
    ? Object.entries(
        product.characteristics instanceof Map
          ? Object.fromEntries(product.characteristics)
          : product.characteristics
      )
    : [];

  const avgRating = product.reviews?.length
    ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{product.name}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="product-detail">
            <div>
              <img
                className="product-detail-img"
                src={product.imageUrl || `https://placehold.co/400x300/e5e5e5/999?text=${encodeURIComponent(product.name)}`}
                alt={product.name}
              />
              <div style={{ marginTop: 12 }}>
                <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {product.category?.name}
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}>
                  {product.price.toLocaleString('uk-UA')} грн
                </div>
                {avgRating && (
                  <div style={{ color: '#f59e0b', marginTop: 4, fontSize: 14 }}>
                    {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))} {avgRating} ({product.reviews.length} відгуків)
                  </div>
                )}
              </div>

              {product.manufacturer && (
                <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--bg)', borderRadius: 8, fontSize: 13 }}>
                  <strong>{product.manufacturer.name}</strong>
                  {product.manufacturer.country && (
                    <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>· {product.manufacturer.country}</span>
                  )}
                </div>
              )}

              {product.description && (
                <p style={{ marginTop: 10, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {product.description}
                </p>
              )}
            </div>

            <div>
              {chars.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div className="section-title">Характеристики</div>
                  <table className="characteristics-table">
                    <tbody>
                      {chars.map(([key, val]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div>
                <div className="section-title">
                  Відгуки {product.reviews?.length > 0 && `(${product.reviews.length})`}
                </div>
                {product.reviews?.length === 0 || !product.reviews ? (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '10px 0' }}>
                    Поки немає відгуків
                  </div>
                ) : (
                  product.reviews.map((r, i) => (
                    <div key={i} className="review-item">
                      <div className="review-header">
                        <span className="review-user">{r.user}</span>
                        <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                      </div>
                      {r.comment && <div className="review-comment">{r.comment}</div>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
