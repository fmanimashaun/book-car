import { useSelector } from 'react-redux';
import axios from 'axios';

const DeleteCars = () => {
  let cars = useSelector((store) => store.appData.appData.cars);
  cars = [...cars];
  if (cars) cars.sort((a, b) => a.id - b.id);

  
  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id}>
          <p>{car.id}</p>
          <p>{car.name}</p>
          <button type="button" onClick={() => handleDelete(car.id)}>
            Delete
          </button>
          <br />
          <br />
        </li>
      ))}
    </ul>
  );
};

export default DeleteCars;
