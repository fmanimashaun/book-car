/* eslint-disable max-len */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarDetails } from 'app/redux/carDetailsSlice';
import triangle from '../assets/imgs/triangle.png';
import circle from '../assets/imgs/color-circle.png';
import reserve from '../assets/imgs/reserve.png';
import reserveArrow from '../assets/imgs/reserve-arrow.png';

const CarDetails = () => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    carDetails: currentCar,
    status,
    error,
  } = useSelector((state) => state.carDetails);

  useEffect(() => {
    dispatch(fetchCarDetails(id));
  }, [id, dispatch]);

  const desiredKeys = ['torque', 'fuel_economy', 'seating_capacity', 'cargo_space'];
  const extraDetails = ['infotainment_system', 'safety_rating', 'tech_features', 'special_features'];

  const filteredDetails = Object.entries(currentCar?.car_detail || {})
    .filter(([key]) => desiredKeys.includes(key))
    .map(([key, value]) => [key.replace(/_/g, ' '), value]);

  const extraDetailsArray = Object.entries(currentCar?.car_detail || {})
    .filter(([key]) => extraDetails.includes(key))
    .map(([key, value]) => [key.replace(/_/g, ' '), value]);

  const handleShowMoreDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  return (
    <div>
      {(() => {
        if (status === 'loading') {
          return <p>Loading...</p>;
        }
        if (error) {
          return (
            <p>
              Error:
              {error}
            </p>
          );
        }
        return (
          <>
            <div className="flex">
              <div className="lg:flex-grow pt-10 mt-10">
                <img
                  className="w-full h-auto p-4"
                  src={currentCar?.image_url}
                  alt={currentCar?.name}
                />
                <Link to="/">
                  <img src={triangle} className="bg-light-green w-16 transform -rotate-90 rounded-b-xl" alt="Home" />
                </Link>
              </div>
              <div className="lg:w-1/3 p-10 text-right">
                <h2 className="text-3xl font-bold mb-4 text-right">{currentCar?.name}</h2>
                <p className="text-right">{currentCar?.description}</p>
                <table className="table-auto inline-block align-top text-sm">
                  <tbody>
                    {filteredDetails.map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                        <td className="border-none px-4 py-2 font-bold text-left">{key}</td>
                        <td className="border-none px-4 py-2 text-right">{value}</td>
                      </tr>
                    ))}
                    {showMoreDetails && extraDetailsArray.map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                        <td className="border-none px-4 py-2 font-bold text-left">{key}</td>
                        <td className="border-none px-4 py-2 text-right">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex w-full p-3 mx-4 px-14 text-lg">
                  <p className="font-bold">{currentCar?.car_detail.horsepower}</p>
                  <p>&nbsp;Horse power</p>
                </div>
                <div className="w-full p-3 mx-4">
                  <button
                    type="button"
                    className="cursor-pointer text-sm font-bold hover:underline"
                    onClick={() => handleShowMoreDetails()}
                  >
                    {showMoreDetails ? 'CLOSE DETAILS △' : 'DISCOVER MORE DETAILS ▷'}
                  </button>
                </div>
                <div className="flex justify-end">
                  <img src={circle} alt="color-circle" className="w-28" />
                </div>
                <div className="flex justify-end">
                  <Link to="/reservations/new" className="bg-light-green flex rounded-full text-white p-3 text-lg justify-between ">
                    <img src={reserve} alt="reserve" />
                    &nbsp;Reserve&nbsp;
                    <img src={reserveArrow} alt="reserve-arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default CarDetails;
