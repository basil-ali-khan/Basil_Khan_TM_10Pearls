// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/DashboardPage.css';

export default function DashboardPage() {
  const [counts, setCounts] = useState({ todo: 0, inProgress: 0, done: 0 });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get('/tasks/counts').then(res => setCounts(res.data));
    
    // Check if user is admin
    const userType = localStorage.getItem('userType');
    setIsAdmin(userType === 'admin');
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Task Dashboard</h1>
          <p className="dashboard-subtitle">Overview of your task progress</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card todo">
            <div className="stat-number">{counts.todo}</div>
            <div className="stat-label">To Do</div>
          </div>
          
          <div className="stat-card inprogress">
            <div className="stat-number">{counts.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          
          <div className="stat-card done">
            <div className="stat-number">{counts.done}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="navigation-section">
          <div className="nav-buttons">
            <Link to="/tasks" className="nav-button tasks">
              View All Tasks
            </Link>
            {isAdmin && (
              <Link to="/admin-dashboard" className="nav-button admin">
                Admin Dashboard
              </Link>
            )}
            <Link to="/profile" className="nav-button profile">
              Profile Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}