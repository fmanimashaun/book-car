import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CarList({ cars }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCars = cars.length;
  const maxIndex = totalCars - 1;
  const totalSlides = Math.ceil(totalCars / 3);

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + 3, maxIndex);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - 3, 0);
    setCurrentIndex(prevIndex);
  };

  console.log(cars.length);
  console.log(totalSlides);
  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="flex space-x-4">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={uuidv4()}
              type="button"
              onClick={() => setCurrentIndex(index * 3)}
              className={`${
                index * 3 === currentIndex
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200'
              } px-2 py-1 rounded-full text-transparent h-5 w-5`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
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
          {cars.slice(currentIndex, Math.min(currentIndex + 3, totalCars)).map((car) => (
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
          disabled={currentIndex + 3 >= totalCars}
          className="ml-4 bg-gray-200 px-2 py-1 rounded-md"
        >
          Next &gt;
        </button>
      </div>
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
