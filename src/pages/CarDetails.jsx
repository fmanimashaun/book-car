/* eslint-disable max-len */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarDetails } from 'app/redux/carDetailsSlice';
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
    <div className="h-full flex-col justify-between">
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
            <div className="flex-col">
              <div className="lg:flex justify-between">
                <div className="flex-grow max-h-96 pt-20">
                  <img
                    className="w-full h-auto p-4 max-w-xl justify-self-center mx-auto"
                    src={currentCar?.image_url}
                    alt={currentCar?.name}
                  />
                </div>
                <div className="lg:w-1/3 p-10 pb-0 lg:text-right text-center">
                  <h2 className="text-3xl font-bold mb-4 lg:text-right">{currentCar?.name}</h2>
                  <p className="lg:text-right">{currentCar?.description}</p>
                  <table className="table-auto inline-block align-top text-sm py-2">
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
                  <div className="flex w-full text-lg justify-center lg:text-left lg:justify-start lg:px-6">
                    <p className="font-bold">{currentCar?.car_detail.horsepower}</p>
                    <p>&nbsp;Horse power</p>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="cursor-pointer w-full text-sm font-bold py-4 lg:text-right hover:underline hover:text-light-green"
                      onClick={() => handleShowMoreDetails()}
                    >
                      <span>{showMoreDetails ? 'CLOSE DETAILS' : 'DISCOVER MORE DETAILS'}</span>
                      &nbsp;
                      <span className="text-yellow-400 font-black">{showMoreDetails ? '△' : '▷'}</span>
                    </button>
                  </div>
                  <div className="flex w-full justify-center lg:justify-end py-2">
                    <Link to={`/reservations/new?carId=${currentCar?.id}`} className="bg-light-green flex rounded-full text-white p-3 text-lg justify-between ">
                      <img src={reserve} alt="reserve" />
                      &nbsp;Reserve&nbsp;
                      <img src={reserveArrow} alt="reserve-arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/" className="flex justify-end items-center w-20 bg-light-green rounded-r-full h-16">
              <p className="text-white font-bold pr-5 text-lg">◁</p>
            </Link>
          </>
        );
      })()}
    </div>
  );
};

export default CarDetails;
