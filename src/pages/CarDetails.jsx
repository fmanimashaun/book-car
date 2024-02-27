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
            <div className="flex justify-between">
              <div className="flex-grow pt-10 mt-10 max-h-96">
                <img
                  className="w-full h-auto p-4 max-w-xl justify-self-center mx-auto"
                  src={currentCar?.image_url}
                  alt={currentCar?.name}
                />
              </div>
              <div className="lg:w-1/3 p-10 pb-0 text-right">
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
                <div className="flex w-full p-3 mx-4 px-14 text-lg justify-center">
                  <p className="font-bold">{currentCar?.car_detail.horsepower}</p>
                  <p>&nbsp;Horse power</p>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="cursor-pointer text-sm font-bold hover:underline"
                    onClick={() => handleShowMoreDetails()}
                  >
                    {showMoreDetails ? 'CLOSE DETAILS △' : 'DISCOVER MORE DETAILS ▷'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <Link to={`/reservations/new?carId=${currentCar?.id}`} className="bg-light-green flex rounded-full text-white p-3 mr-10 text-lg justify-between ">
                <img src={reserve} alt="reserve" />
                &nbsp;Reserve&nbsp;
                <img src={reserveArrow} alt="reserve-arrow" />
              </Link>
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
