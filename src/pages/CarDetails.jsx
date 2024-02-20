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

  const desiredKeys = ['horsepower', 'fuel_economy', 'seating_capacity', 'cargo_space'];

  const filteredDetails = Object.entries(currentCar?.car_detail || {})
    .filter(([key]) => desiredKeys.includes(key))
    .map(([key, value]) => [key.replace(/_/g, ' '), value]);

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
            <div className="flex p-10">
              <div className="lg:flex-grow p-4 flex items-center justify-center">
                <img
                  className="w-full h-auto"
                  src={currentCar?.image_url}
                  alt={currentCar?.name}
                />
              </div>
              <div className="lg:w-1/3 p-4 text-right">
                <h2 className="text-3xl font-bold mb-4 text-right">{currentCar?.name}</h2>
                <p className="text-right">{currentCar?.description}</p>
                <table className="table-auto inline-block align-top">
                  <tbody>
                    {filteredDetails.map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                        <td className="border-none px-4 py-2 font-bold text-left">{key}</td>
                        <td className="border-none px-4 py-2 text-right">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-left px-5 mx-5">hello</p>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default CarDetails;
