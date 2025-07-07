import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import ROUTES from '../routes';

const SignUpPage = () => {
  return (
    <div className="page">
      <div>
        <h1>Apply for Finance</h1>
        <SignUpForm />
        <footer>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </footer>
      </div>
    </div>
  );
};

export default SignUpPage;