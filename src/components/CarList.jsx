import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import triangle from '../assets/imgs/triangle.png';
import facebook from '../assets/imgs/facebook.png';
import twitter from '../assets/imgs/twitter.png';
import instagram from '../assets/imgs/instagram.png';
import shape from '../assets/imgs/shape.png';

function CarList({ cars }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Check if cars array is empty
  if (cars.length === 0) {
    return <div>No cars available</div>;
  }

  const totalCars = cars.length;
  const maxIndex = totalCars - 1;

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
  };

  return (
    <div>
      {/* Pagination buttons */}
      <div className="flex space-x-2 justify-center w-full">
        {[...Array(totalCars)].map((_, index) => (
          <button
            key={uuidv4()}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`${
              index === currentIndex ? 'bg-black' : 'bg-light-gray'
            } px-2 py-1 rounded-full text-transparent h-4 w-1`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {/* Previous and Next buttons */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`mr-4 px-2 py-1 rounded-r-md ${
            currentIndex === 0 ? 'bg-light-gray text-gray-500' : 'bg-light-green text-white'
          }`}
        >
          <img src={triangle} alt="Previous" className="w-20 transform -rotate-90" />
        </button>
        {/* Display different number of cars based on screen size */}
        <div className="flex space-x-4">
          {/* For desktop: display 3 cars */}
          <div className="hidden md:flex space-x-4">
            {cars.slice(currentIndex, Math.min(currentIndex + 3, totalCars)).map((car) => (
              <div key={car.id} className="w-1/3">
                <div className="h-60 overflow-hidden">
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
                  <div className="flex justify-center">
                    <img src={shape} alt="shape" className="ml-5 transform rotate-45" />
                  </div>
                  <p className="text-light-gray">{car.description}</p>
                  <div className="flex w-full justify-center gap-3 pt-3">
                    <img src={facebook} alt="facebook" className="w-10 h-10 cursor-pointer" />
                    <img src={twitter} alt="twitter" className="w-10 h-10 cursor-pointer" />
                    <img src={instagram} alt="instagram" className="w-10 h-10 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* For mobile: display 1 car */}
          <div className="md:hidden">
            <div key={cars[currentIndex].id} className="w-full">
              <div className="h-60 overflow-hidden">
                <Link to={`/cars/${cars[currentIndex].id}`} className="block h-full">
                  <img
                    src={cars[currentIndex].image_url}
                    alt={cars[currentIndex].name}
                    className="w-full h-full object-contain"
                  />
                </Link>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{cars[currentIndex].name}</h2>
                <div className="flex justify-center">
                  <img src={shape} alt="shape" className="ml-5 transform rotate-45" />
                </div>
                <p className="text-light-gray">{cars[currentIndex].description}</p>
                <div className="flex w-full justify-center gap-3 pt-3">
                  <img src={facebook} alt="facebook" className="w-10 h-10 cursor-pointer" />
                  <img src={twitter} alt="twitter" className="w-10 h-10 cursor-pointer" />
                  <img src={instagram} alt="instagram" className="w-10 h-10 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className={`ml-4 px-2 py-1 rounded-md ${
            currentIndex === maxIndex ? 'bg-light-gray text-gray-500' : 'bg-light-green text-white'
          }`}
        >
          <img src={triangle} alt="Next" className="w-20 transform rotate-90" />
        </button>
      </div>
    </div>
  );
}

// Prop types validation
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
