import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addReservation } from 'app/redux/reservationsSlice';
import carCollage from '../assets/imgs/car-collage.jpg';

const Reserve = () => {
  const { user } = useSelector((store) => store.auth);
  const cars = useSelector((state) => state.appData.appData.cars);
  const cities = useSelector((state) => state.appData.appData.cities);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialCarId = queryParams.get('carId');

  const [carId, setCarId] = useState(initialCarId || '');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: user.id,
      car_id: carId,
      city_id: city,
      date,
    };

    const options = { data, token: user.token };
    const actionResult = await dispatch(addReservation(options));

    if (!addReservation.fulfilled.match(actionResult)) {
      setShowError(true);
      return; // Exit early if there was an error
    }
    setCarId('');
    setCity('');
    setDate('');
    setShowError(false);

    navigate('/reservations');
  };

  return (
    <div
      className="bg-opacity-70 rounded-lg h-full bg-center bg-no-repeat px-10 py-20 sm:px-5 sm:py-10 md:p-20 lg:py-40 lg:px-20 text-white text-center flex-col justify-center"
      style={{ backgroundImage: `linear-gradient(rgba(151, 191, 15, 0.9), rgba(151, 191, 15, 0.9)), url(${carCollage})` }}
    >
      <h2 className="bold text-3xl font-bold tracking-widest border-b mx-auto max-w-md pb-4">
        BOOK A CAR TEST-RIDE
      </h2>
      <p className="text-center py-4">
        There are over 20 different car models to choose from. Our
        ever-expanding selection offers various types of cars, from sports to
        casual. We have showrooms all over the US with test-drive facilities. If
        you wish to rent one of our models please use the selector below.
      </p>
      <form onSubmit={handleSubmit} className="pt-5 flex md:justify-around lg:justify-around flex-wrap md:flex-nowrap lg:flex-nowrap font-medium">
        <select className="bg-light-green p-2 my-1 md:my-unset lg:my-unset sm:p-3 lg:p-4 w-full md:w-auto lg:w-auto rounded-full border-2 border-white focus:outline-none" id="carId" name="carId" value={carId} onChange={(e) => setCarId(e.target.value)}>
          <option>Select a car</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
        <select className="bg-light-green p-2 my-1 md:my-unset lg:my-unset sm:p-3 lg:p-4 w-full md:w-auto lg:w-auto rounded-full border-2 border-white focus:outline-none" id="city" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <input className="bg-light-green p-2 my-1 md:my-unset lg:my-unset sm:p-3 lg:p-3 w-full md:w-auto lg:w-auto rounded-full border-2 border-white focus:outline-none" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="bg-white p-3 sm:p-2 my-1 md:my-unset lg:my-unset lg:p-3 w-full md:w-auto lg:w-auto rounded-full border border-white text-light-green" type="submit">Book now</button>
      </form>
      {showError && <p className="text-red-500">There has been an issue with your reservation. please verify the information.</p>}
    </div>
  );
};

export default Reserve;
