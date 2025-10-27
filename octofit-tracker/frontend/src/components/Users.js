import React, { useEffect, useState } from 'react';
import BaseList from './BaseList';
// Contains: -8000.app.github.dev/api/users/


export default function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const name = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = name
      ? `https://${name}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/';
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Users fetched:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setItems(payload);
      })
      .catch((err) => console.error('Users fetch error:', err));
  }, []);

  return <BaseList title="Users" items={items} renderItem={(it) => <>{it.username || it.email || it.id}</>} />;
}
