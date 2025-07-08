import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import ROUTES from '../routes';

const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert(`Logout failed. ${error}`);
    } finally {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <button onClick={handleLogout} className="button-unstyled">
      Logout
    </button>
  );
}

export { LogoutButton };