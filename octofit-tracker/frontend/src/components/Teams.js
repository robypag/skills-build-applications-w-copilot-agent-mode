import React, { useEffect, useState } from 'react';
import BaseList from './BaseList';

const getBaseUrl = () => {
  const name = process.env.REACT_APP_CODESPACE_NAME;
  if (name) return `https://${name}-8000.app.github.dev/api`;
  return 'http://localhost:8000/api';
};

export default function Teams() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `${getBaseUrl()}/teams/`;
    console.log('Fetching Teams from', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Teams fetched:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setItems(payload);
      })
      .catch((err) => console.error('Teams fetch error:', err));
  }, []);

  return <BaseList title="Teams" items={items} renderItem={(it) => <>{it.name || it.id}</>} />;
}
