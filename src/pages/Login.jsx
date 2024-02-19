import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'assets/imgs/transparent-logo.png';
import { Formik, Form } from 'formik';
import { login } from 'app/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import PropTypes from 'prop-types';

const Alert = ({
  isError,
  msg,
}) => (
  <div className={`border-l-4 p-4 ${isError ? 'bg-red-100 border-red-500 text-black' : 'bg-green-100 border-green-500 text-black'}`} role="alert">
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isLoggedIn) navigate('/');
  }, [auth.isLoggedIn, navigate]);

  const validator = object({
    username: string()
      .required('Username is a required field'),
    password: string()
      .required('Password is a required field'),
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
            username: '',
            password: '',
          }}
          validationSchema={validator}
          onSubmit={(values) => dispatch(login(values))}
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
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-dark-blue">
                    Username
                    <div className="mt-2">
                      <input value={values.username} onChange={(e) => setFieldValue('username', e.target.value)} id="username" name="username" type="username" autoComplete="username" required className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                  <button disabled={auth.isLoading} type="submit" className={`flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${auth.isLoading ? 'cursor-not-allowed' : ''}`}>Sign in</button>
                </div>
                <div className="text-sm">
                  <Link to="/book-car/auth/forgot-password" className="font-semibold text-light-green hover:text-green-400">Forgot password?</Link>
                </div>
              </Form>
            )
          }
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link to="/book-car/register" className="mx-1.5 font-semibold leading-6 text-light-green hover:text-green-400">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
