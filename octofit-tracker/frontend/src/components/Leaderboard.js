import React, { useEffect, useState } from 'react';
import BaseList from './BaseList';

const getBaseUrl = () => {
  const name = process.env.REACT_APP_CODESPACE_NAME;
  if (name) return `https://${name}-8000.app.github.dev/api`;
  return 'http://localhost:8000/api';
};

export default function Leaderboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `${getBaseUrl()}/leaderboard/`;
    console.log('Fetching Leaderboard from', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Leaderboard fetched:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setItems(payload);
      })
      .catch((err) => console.error('Leaderboard fetch error:', err));
  }, []);

  return <BaseList title="Leaderboard" items={items} renderItem={(it) => <>{it.username || it.name || it.id}</>} />;
}
