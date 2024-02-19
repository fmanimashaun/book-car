import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CarList({ cars }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCars = cars.length;
  const maxIndex = totalCars - 1;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="mr-4 bg-gray-200 px-2 py-1 rounded-md"
      >
        &lt; Prev
      </button>
      <div className="flex space-x-4">
        {cars.slice(currentIndex, currentIndex + 3).map((car) => (
          <div key={car.id} className="w-1/3">
            <div className="h-96 overflow-hidden">
              <Link to={`/cars/${car.id}`} className="block h-full">
                <img
                  src={car.image_url}
                  alt={car.name}
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold">{car.name}</h2>
              <p>{car.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        className="ml-4 bg-gray-200 px-2 py-1 rounded-md"
      >
        Next &gt;
      </button>
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
