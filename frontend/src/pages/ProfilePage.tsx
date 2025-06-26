import { useNavigate, Link } from 'react-router-dom';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              U
            </div>
            <h2 className="profile-title">User Profile</h2>
            <p className="profile-subtitle">Manage your account settings</p>
          </div>

          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-label">Status</span>
              <span className="profile-value">Active</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Member Since</span>
              <span className="profile-value">Today</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Tasks Created</span>
              <span className="profile-value">-</span>
            </div>
          </div>

          <div className="nav-buttons">
            <Link to="/dashboard" className="nav-button dashboard">
              Dashboard
            </Link>
            <Link to="/tasks" className="nav-button tasks">
              My Tasks
            </Link>
          </div>

          <div className="profile-actions">
            <button onClick={handleLogout} className="logout-button">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
