// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function DashboardPage() {
  const [counts, setCounts] = useState({ todo: 0, inProgress: 0, done: 0 });

  useEffect(() => {
    axios.get('/tasks/counts').then(res => setCounts(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>To Do: {counts.todo}</p>
      <p>In Progress: {counts.inProgress}</p>
      <p>Done: {counts.done}</p>
    </div>
  );
}