import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/AdminDashboard.css';

interface UserTaskStats {
  userId: string;
  userEmail: string;
  todo: number;
  inProgress: number;
  done: number;
  total: number;
}

interface OverallStats {
  totalUsers: number;
  totalTasks: number;
  todo: number;
  inProgress: number;
  done: number;
}

export default function AdminDashboard() {
  const [userStats, setUserStats] = useState<UserTaskStats[]>([]);
  const [overallStats, setOverallStats] = useState<OverallStats>({
    totalUsers: 0,
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    done: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const userType = localStorage.getItem('userType');
    if (userType !== 'admin') {
      navigate('/dashboard');
      return;
    }

    fetchAdminData();
  }, [navigate]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Fetch user-specific task stats
      const userStatsResponse = await axios.get('/admin/user-task-stats');
      setUserStats(userStatsResponse.data);

      // Fetch overall stats
      const overallStatsResponse = await axios.get('/admin/overall-stats');
      setOverallStats(overallStatsResponse.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      alert('Failed to load admin data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title-section">
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">System overview and user management</p>
          </div>
          <div className="admin-actions">
            <Link to="/tasks" className="nav-button">All Tasks</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="stats-section">
          <h2 className="section-title">Overall Statistics</h2>
          <div className="overall-stats-grid">
            <div className="stat-card users">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-number">{overallStats.totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
            </div>
            
            <div className="stat-card tasks">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <div className="stat-number">{overallStats.totalTasks}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
            </div>
            
            <div className="stat-card todo">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <div className="stat-number">{overallStats.todo}</div>
                <div className="stat-label">To Do</div>
              </div>
            </div>
            
            <div className="stat-card inprogress">
              <div className="stat-icon">🔄</div>
              <div className="stat-content">
                <div className="stat-number">{overallStats.inProgress}</div>
                <div className="stat-label">In Progress</div>
              </div>
            </div>
            
            <div className="stat-card done">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-number">{overallStats.done}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* User-Specific Statistics */}
        <div className="user-stats-section">
          <h2 className="section-title">User Task Statistics</h2>
          
          {userStats.length === 0 ? (
            <div className="empty-state">
              <h3>No user data available</h3>
              <p>No users have created tasks yet.</p>
            </div>
          ) : (
            <div className="user-stats-table">
              <div className="table-header">
                <div className="table-cell">User</div>
                <div className="table-cell">Total</div>
                <div className="table-cell">To Do</div>
                <div className="table-cell">In Progress</div>
                <div className="table-cell">Done</div>
                <div className="table-cell">Progress</div>
              </div>
              
              {userStats.map((user) => (
                <div key={user.userId} className="table-row">
                  <div className="table-cell user-cell">
                    <div className="user-avatar">
                      {user.userEmail.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <div className="user-email">{user.userEmail}</div>
                      <div className="user-id">ID: {user.userId}</div>
                    </div>
                  </div>
                  <div className="table-cell">{user.total}</div>
                  <div className="table-cell">
                    <span className="status-badge todo">{user.todo}</span>
                  </div>
                  <div className="table-cell">
                    <span className="status-badge inprogress">{user.inProgress}</span>
                  </div>
                  <div className="table-cell">
                    <span className="status-badge done">{user.done}</span>
                  </div>
                  <div className="table-cell">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: user.total > 0 ? `${(user.done / user.total) * 100}%` : '0%' 
                        }}
                      ></div>
                      <span className="progress-text">
                        {user.total > 0 ? Math.round((user.done / user.total) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
