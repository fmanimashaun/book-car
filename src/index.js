/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import store, { persistor } from 'app/store';
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
import RequireAuth from 'components/RequireAuth';
import Unauthorized from 'pages/Unauthorized';
import 'assets/styles/index.css';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <Missing />,
      children: [
        { index: true, element: <Home /> },
        { path: 'unauthorized', element: <Unauthorized /> },
        {
          element: <RequireAuth allowedRoles={['admin', 'user']} />,
          children: [
            {
              path: 'reservations',
              children: [
                { index: true, element: <MyResevation /> },
                { path: 'new', element: <AddReserve /> },
              ],
            },
          ],
        },
        { path: 'cars/:id', element: <CarDetails /> },
        { path: 'cars', element: <Navigate to="/" replace /> },
        {
          // element: <RequireAuth allowedRoles={['admin']} />,
          children: [
            { path: 'cars/new', element: <AddCar /> },
            { path: 'cars/delete', element: <DeleteCars /> },
          ],
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
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
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
