import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import ROUTES from '../routes';

interface LoginData {
  name: string;
  password: string;
}

const LoginForm: FC = () => {
  const navigate = useNavigate();

  const {
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginData>();  

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data.name, data.password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      alert(`Login failed. ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div>
        <input
          type="text"
          placeholder="Name"
          autoFocus
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <span className="error">{errors.name.message}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;