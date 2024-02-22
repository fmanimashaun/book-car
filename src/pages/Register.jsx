import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'assets/imgs/transparent-logo.png';
import { Formik, Form } from 'formik';
import { register } from 'app/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { object, ref, string } from 'yup';
import PropTypes from 'prop-types';

const Alert = ({
  isError,
  msg,
}) => (
  <div className={`border-l-4 p-4 text-sm ${isError ? 'bg-red-100 border-red-500 text-black' : 'bg-green-100 border-green-500 text-black'}`} role="alert">
    <p>{msg}</p>
  </div>
);

Alert.propTypes = {
  isError: PropTypes.bool,
  msg: PropTypes.string,
};

Alert.defaultProps = {
  isError: false,
  msg: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isLoggedIn) navigate('/');
  }, [auth.isLoggedIn, navigate]);

  const validator = object({
    email: string()
      .email('Please enter a valid Email to continue.')
      .required('Email is a required field'),
    name: string()
      .required('Name is a required field'),
    username: string()
      .required('Username is a required field'),
    password: string()
      .required('Password is a required field'),
    confirmPassword: string()
      .oneOf([ref('password')], 'Your passwords do not match.'),
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src={Logo} alt="Your Company" />
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark-blue">Sign In</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validator}
          onSubmit={(values) => dispatch(register(values))}
        >
          {
            ({
              values, errors, setFieldValue, getFieldMeta,
            }) => (
              <Form className="space-y-6">
                {
                  auth.message
                  && <Alert msg={auth.message} isError />
                }
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-dark-blue">
                    Email
                    <div className="mt-2">
                      <input value={values.email} onChange={(e) => setFieldValue('email', e.target.value)} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </label>
                  <small className="text-sm mt-0.5 text-red-400">{getFieldMeta('email').touched && errors.email}</small>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-dark-blue">
                    Name
                    <div className="mt-2">
                      <input value={values.name} onChange={(e) => setFieldValue('name', e.target.value)} id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </label>
                  <small className="text-sm mt-0.5 text-red-400">{getFieldMeta('name').touched && errors.name}</small>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-dark-blue">
                    Username
                    <div className="mt-2">
                      <input value={values.username} onChange={(e) => setFieldValue('username', e.target.value)} id="username" name="username" type="text" autoComplete="username" required className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </label>
                  <small className="text-sm mt-0.5 text-red-400">{getFieldMeta('username').touched && errors.username}</small>
                </div>

                <div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-dark-blue">
                      Password
                      <div className="mt-2">
                        <input onChange={(e) => setFieldValue('password', e.target.value)} value={values.password} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </label>
                  </div>
                  <small className="text-sm mt-0.5 text-red-400">{getFieldMeta('password').touched && errors.password}</small>
                </div>

                <div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-dark-blue">
                      Confirm Password
                      <div className="mt-2">
                        <input onChange={(e) => setFieldValue('confirmPassword', e.target.value)} value={values.confirmPassword} id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-confirmPassword" required className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </label>
                  </div>
                  <small className="text-sm mt-0.5 text-red-400">{getFieldMeta('confirmPassword').touched && errors.confirmPassword}</small>
                </div>

                <div>
                  <button disabled={auth.isLoading} type="submit" className={`flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${auth.isLoading ? 'cursor-not-allowed' : ''}`}>Register</button>
                </div>
                <div className="text-sm">
                  <Link to="/book-car/auth/forgot-password" className="font-semibold text-light-green hover:text-green-400">Forgot password?</Link>
                </div>
              </Form>
            )
          }
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <Link to="/login" className="mx-1.5 font-semibold leading-6 text-light-green hover:text-green-400">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
