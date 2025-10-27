import React, { useEffect, useState } from 'react';
import BaseList from './BaseList';
// Contains: -8000.app.github.dev/api/activities/


export default function Activities() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const name = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = name
      ? `https://${name}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
    console.log('Fetching Activities from', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Activities fetched:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setItems(payload);
      })
      .catch((err) => console.error('Activities fetch error:', err));
  }, []);

  return <BaseList title="Activities" items={items} renderItem={(it) => <>{it.name || it.id}</>} />;
}
