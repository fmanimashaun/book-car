import { deleteCar } from 'app/redux/AppDataSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeleteCars = () => {
  const cars = [...useSelector((store) => store.appData.appData.cars)];
  // const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  if (cars.length) {
    cars.sort((a, b) => a.id - b.id);
  }

  const handleDelete = (carId) => {
    dispatch(deleteCar(carId));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Car Name</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.name}</td>
            <td>
              <button
                className="btn btn-danger text-success"
                type="button"
                onClick={() => handleDelete(car.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeleteCars;
