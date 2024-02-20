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

  const filteredDetails = currentCar
    ? Object.entries(currentCar.car_detail).filter(([key]) => key !== 'car_id' && key !== 'range' && key !== 'id')
    : [];

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
              <div className="lg:flex-grow p-4">
                <img
                  className="w-full h-auto"
                  src={currentCar?.image_url}
                  alt="Vespa Scooter"
                />
              </div>
              <div className="lg:w-fit-content p-4">
                <h1 className="text-2xl font-bold mb-4 text-right">{currentCar?.name}</h1>
                <p className="text-right">{currentCar?.description}</p>
                <table className="table-auto">
                  <tbody>
                    {filteredDetails.map(([key, value]) => (
                      <tr key={key}>
                        <td className="border px-4 py-2 font-bold">{key}</td>
                        <td className="border px-4 py-2">{value}</td>
                      </tr>
                    ))}
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
