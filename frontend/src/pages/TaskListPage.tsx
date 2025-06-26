import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks').then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <Link to="/tasks/new">+ New Task</Link>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            <Link to={`/tasks/${task.id}`}>{task.title}</Link> - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}