import React from 'react';

function displayName(it) {
  if (!it) return '';
  return it.name || it.title || it.username || it.email || it.id || '';
}

function detailsFor(it) {
  if (!it || typeof it !== 'object') return String(it);
  // show up to 3 fields other than the display name
  const skip = new Set(['id', 'name', 'title', 'username', 'email']);
  const entries = Object.entries(it).filter(([k]) => !skip.has(k)).slice(0, 3);
  if (!entries.length) return '';
  return entries.map(([k, v]) => `${k}: ${String(v)}`).join(' • ');
}

export default function BaseList({ title, items, renderItem }) {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{title}</h2>
          <small className="text-muted">{items ? `${items.length} items` : '0 items'}</small>
        </div>
        <div className="card-body">
          {items && items.length ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ width: '48px' }}>#</th>
                    <th>Name</th>
                    <th>Details</th>
                    <th style={{ width: '140px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={it.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{renderItem ? renderItem(it) : displayName(it)}</td>
                      <td><small className="text-muted">{detailsFor(it)}</small></td>
                      <td>
                        <div className="d-flex gap-2">
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={(e) => { e.preventDefault(); /* TODO: wire to details view */ }}>
                            View
                          </button>
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={(e) => { e.preventDefault(); navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(it)); }}>
                            Copy
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mb-0">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
