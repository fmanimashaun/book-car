/* eslint-disable max-len */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarDetails } from 'app/redux/carDetailsSlice';

const CarDetails = () => {
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
            <div className="flex flex-col">
              <div className="lg:flex-grow p-4">
                <img
                  className="w-full h-auto"
                  src={currentCar?.image_url}
                  alt="Vespa Scooter"
                />
              </div>
              <div className="lg:w-fit-content p-4">
                <h1 className="text-2xl font-bold mb-4">{currentCar?.name}</h1>
                <p>{currentCar?.description}</p>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 font-bold">
                        Engine Type ID
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Horsepower
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Torque
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Fuel Economy
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Seating Capacity
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Cargo Space
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Infotainment System
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Safety Rating
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Tech Features
                      </th>
                      <th className="border px-4 py-2 font-bold">
                        Special Features
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2 text-left">1</td>
                      <td className="border px-4 py-2 text-left">203</td>
                      <td className="border px-4 py-2 text-left">184</td>
                      <td className="border px-4 py-2 text-left">32 mpg</td>
                      <td className="border px-4 py-2 text-left">5</td>
                      <td className="border px-4 py-2 text-left">15.1 cu ft</td>
                      <td className="border px-4 py-2 text-left">
                        7-inch touchscreen, Apple CarPlay/Android Auto
                      </td>
                      <td className="border px-4 py-2 text-left">
                        5-star NHTSA
                      </td>
                      <td className="border px-4 py-2 text-left">
                        Bluetooth, Backup Camera, Adaptive Cruise Control
                      </td>
                      <td className="border px-4 py-2 text-left">
                        LED Headlights, Available panoramic sunroof
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default CarDetails;
