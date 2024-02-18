import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../app/redux/CarsSlice';

const Cars = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && (
      <p>
        Error:
        {error}
      </p>
      )}
      {cars && (
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              {car.name}
              {' '}
              {car.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cars;
