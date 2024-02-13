/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import Layout from 'components/Layout';
import Login from 'components/Login';
import Register from 'components/Register';
import Missing from 'components/Missing';
import Home from 'components/Home';
import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <Missing />,
      children: [
        { path: '/', element: <Home /> },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
      ],
    },
  ],
  {
    basename: '/book-a-car',
  },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
