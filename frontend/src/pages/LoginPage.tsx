import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'signup';

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        ...form,
        userType
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userType', res.data.userType || userType);
      
      // Redirect based on user type
      if (res.data.userType === 'admin' || userType === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert("Authentication failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div className="user-type-selection">
            <label className="user-type-label">Login as:</label>
            <div className="user-type-options">
              <label className={`user-type-option ${userType === 'user' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={userType === 'user'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <span>User</span>
              </label>
              <label className={`user-type-option ${userType === 'admin' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={userType === 'admin'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          <input 
            type="email" 
            placeholder="Email Address" 
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="form-input"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="form-input"
            required
          />
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
            <button 
              type="button"
              className="toggle-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
