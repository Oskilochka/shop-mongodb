import React, { useState } from 'react';
import CatalogPage from './pages/CatalogPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [page, setPage] = useState('catalog');

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <a href="#" className="logo" onClick={() => setPage('catalog')}>
              Shop<span>DB</span>
            </a>
            <nav style={{ display: 'flex', gap: 8 }}>
              <button
                className={`btn btn-ghost btn-sm ${page === 'catalog' ? 'btn-primary' : ''}`}
                onClick={() => setPage('catalog')}
              >
                Каталог
              </button>
              <button
                className={`btn btn-ghost btn-sm ${page === 'admin' ? 'btn-primary' : ''}`}
                onClick={() => setPage('admin')}
              >
                Адмін
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container">
        {page === 'catalog' ? <CatalogPage /> : <AdminPage />}
      </main>
    </div>
  );
}
