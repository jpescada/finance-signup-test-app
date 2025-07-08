import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import ROUTES from '../routes';

interface SignUpData {
  name: string;
  password: string;
  certificate: FileList;
}

const SignUpForm: FC = () => {
  const navigate = useNavigate();

  const {
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignUpData>();

  const onSubmit = async (data: SignUpData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('password', data.password);
    formData.append('document_type', 'Certificate of Incorporation');
    formData.append('certificate', data.certificate[0]);

    try {
      await signup(formData);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      alert(`Sign-up failed. ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div>
        <input
          type="text"
          autoComplete="name"
          placeholder="Name"
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
          {...register('password', {
            required: 'Password is required', 
            minLength: {
              value: 6, 
              message: 'Password must be at least 6 characters' 
            }
          })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>
      <hr />
      <div>
        <label>Certificate of Incorporation (PDF or image)</label>
        <input
          type="file"
          placeholder='Certificate of Incorporation'
          accept=".pdf,.jpg,.png"
          {...register('certificate', { required: 'File is required' })}
        />
        {errors.certificate && (
          <span className="error">{errors.certificate.message}</span>
        )}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;