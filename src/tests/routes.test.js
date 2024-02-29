import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from 'app/store';
import Layout from 'pages/Layout';
import Home from 'pages/Home';
import AddCar from 'pages/AddCar';
import Reserve from 'pages/AddReserve';
import CarDetails from 'pages/CarDetails';
import DeleteCars from 'pages/DeleteCars';
import Missing from 'pages/Missing';
import MyReservation from 'pages/MyResevation';
import Register from 'pages/Register';
import Login from 'pages/Login';

describe('Test for routes', () => {
  it('Home page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <Home />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Add car page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <AddCar />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Add reservation page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <Reserve />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Car detail page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <CarDetails />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Delete car page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <DeleteCars />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Missing page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <Missing />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('My reservations page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <MyReservation />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Register page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <Register />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Login page renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Layout>
                <Login />
              </Layout>
            </BrowserRouter>
          </PersistGate>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
