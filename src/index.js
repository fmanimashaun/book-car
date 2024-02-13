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
import AddReserve from 'pages/AddReserve';
import CarDetails from 'pages/CarDetails';
import AddCar from 'pages/AddCar';
import DeleteCars from 'pages/DeleteCars';
import MyResevation from 'pages/MyResevation';
import 'assets/styles/index.css';

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
        {
          path: 'reservations',
          element: <MyResevation />,
          children: [
            {
              path: 'new',
              element: <AddReserve />,
            },
          ],
        },
        {
          path: '/cars',
          element: <Home />,
          children: [
            {
              path: ':id',
              element: <CarDetails />,
            },
            {
              path: 'new',
              element: <AddCar />,
            },
            {
              path: 'delete',
              element: <DeleteCars />,
            },
          ],
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
