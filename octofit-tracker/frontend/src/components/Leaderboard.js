import React, { useEffect, useState } from 'react';
import BaseList from './BaseList';
// Contains: -8000.app.github.dev/api/leaderboard/


export default function Leaderboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const name = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = name
      ? `https://${name}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';
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
