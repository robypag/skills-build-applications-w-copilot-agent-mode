import React from 'react';

export default function BaseList({ title, items, renderItem }) {
  return (
    <div className="container mt-4">
      <h2>{title}</h2>
      {items && items.length ? (
        <ul className="list-group">
          {items.map((it, idx) => (
            <li className="list-group-item" key={it.id || idx}>
              {renderItem ? renderItem(it) : JSON.stringify(it)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
}
