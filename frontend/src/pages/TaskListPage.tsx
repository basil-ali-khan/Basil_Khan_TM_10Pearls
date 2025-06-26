import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/TaskListPage.css';

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks').then(res => setTasks(res.data));
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'inProgress':
        return 'inprogress';
      case 'done':
        return 'done';
      default:
        return 'todo';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'inProgress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return 'To Do';
    }
  };

  return (
    <div className="task-list-page">
      <div className="task-list-container">
        <Link to="/dashboard" className="back-button">
          Back to Dashboard
        </Link>
        
        <div className="task-list-header">
          <h2 className="task-list-title">All Tasks</h2>
          <Link to="/tasks/new" className="new-task-button">
            New Task
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Create your first task to get started!</p>
            <Link to="/tasks/new" className="btn btn-primary">
              Create First Task
            </Link>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task: any) => (
              <li key={task.id} className="task-item">
                <Link to={`/tasks/${task.id}`} className="task-link">
                  <div className="task-content">
                    <h3 className="task-title">{task.title}</h3>
                    <span className={`task-status ${getStatusClass(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}