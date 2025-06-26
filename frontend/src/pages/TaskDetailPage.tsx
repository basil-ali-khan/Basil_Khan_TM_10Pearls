import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/TaskDetailPage.css';

export default function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    axios.get(`/tasks/${id}`).then(res => setTask(res.data));
  }, [id]);

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

  if (!task) {
    return (
      <div className="task-detail-page">
        <div className="task-detail-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading task details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-detail-page">
      <div className="task-detail-container">
        <div className="task-detail-card">
          <div className="task-detail-header">
            <h1 className="task-detail-title">{task.title}</h1>
            <div className="task-detail-meta">
              <span className={`task-detail-status ${getStatusClass(task.status)}`}>
                {getStatusText(task.status)}
              </span>
            </div>
          </div>

          <div className="task-detail-body">
            <p className="task-detail-description">
              {task.description || 'No description provided.'}
            </p>
          </div>

          <div className="task-detail-actions">
            <Link to="/tasks" className="back-button">
              Back to Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}