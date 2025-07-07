import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import ROUTES from '../routes';

const LoginPage = () => {
  return (
    <div className="page">
      <div>
        <h1>Login</h1>
        <LoginForm />
        <footer>
          Don't have an account? <Link to={ROUTES.SIGNUP}>Sign up</Link>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;