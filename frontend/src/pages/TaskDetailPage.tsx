import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    axios.get(`/tasks/${id}`).then(res => setTask(res.data));
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
    </div>
  );
}