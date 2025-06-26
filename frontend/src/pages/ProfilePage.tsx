import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
