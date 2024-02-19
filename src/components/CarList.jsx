import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CarList({ cars }) {
  return (
    <div>
      {cars?.map((car) => (
        <Link key={car.id} to={`/cars/${car.id}`} className="block mb-4">
          <img src={car.image_url} alt={car.name} className="w-full h-64 object-cover" />
          <h2 className="text-xl font-bold mt-2">{car.name}</h2>
          <p>{car.description}</p>
        </Link>
      ))}
    </div>
  );
}

CarList.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CarList;
