import { deleteCarFromDatabase } from 'app/redux/AppDataSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeleteCars = () => {
  const cars = [...useSelector((store) => store.appData.appData.cars)];
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  if (cars.length) {
    cars.sort((a, b) => a.id - b.id);
  }

  const handleDelete = (carId) => {
    const options = { carId, token };
    dispatch(deleteCarFromDatabase(options));
  };

  return (
    <table className="table-auto mx-auto">
      <thead>
        <tr>
          <th className="px-4">Number</th>
          <th className="px-4">Car Name</th>
          <th className="px-4">Operation</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) => (
          <tr key={car.id}>
            <td className="px-4">{index + 1}</td>
            <td className="px-4">{car.name}</td>
            <td className="px-4">
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
