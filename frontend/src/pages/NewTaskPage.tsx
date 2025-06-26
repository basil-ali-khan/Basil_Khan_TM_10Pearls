import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/NewTaskPage.css';

export default function NewTaskPage() {
  const [form, setForm] = useState({ title: '', description: '', status: 'todo' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', form);
      navigate('/tasks');
    } catch (error) {
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="new-task-page">
      <div className="new-task-container">
        <div className="new-task-card">
          <div className="new-task-header">
            <h2 className="new-task-title">Create New Task</h2>
            <p className="new-task-subtitle">Add a new task to your workflow</p>
          </div>

          <form className="new-task-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label" htmlFor="title">Task Title</label>
              <input 
                id="title"
                type="text"
                placeholder="Enter task title..." 
                value={form.title} 
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea 
                id="description"
                placeholder="Describe your task in detail..." 
                value={form.description} 
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="form-textarea"
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="status">Status</label>
              <select 
                id="status"
                value={form.status} 
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="form-select"
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Create Task
              </button>
              <Link to="/tasks" className="cancel-button">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
