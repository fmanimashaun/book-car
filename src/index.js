/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from 'app/store';
import { Provider } from 'react-redux';
import Layout from 'pages/Layout';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Missing from 'pages/Missing';
import Home from 'pages/Home';
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
    basename: '/book-car',
  },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
