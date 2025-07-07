import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import ROUTES from '../routes';

const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout} className="button-unstyled">
      Logout
    </button>
  );
}

export { LogoutButton };