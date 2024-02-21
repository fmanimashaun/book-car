import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import carCollage from '../assets/imgs/car-collage.jpg';

const Reserve = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const cars = useSelector((state) => state.appData.appData.cars);
  const cities = useSelector((state) => state.appData.appData.cities);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCarId = queryParams.get('carId');

  const [carId, setCarId] = useState(initialCarId || '');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(''); // Added date state
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Decode the access token to get the user ID
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.sub;

      // Make API request to create reservation
      const response = await fetch('http://localhost:4000/api/v1/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          reservation: {
            user_id: userId,
            car_id: carId,
            city_id: city,
            date,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      // Handle successful response...
      setSuccessMessage('Reservation created successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="bg-opacity-70 rounded-lg h-full bg-center bg-no-repeat p-40 text-white text-center flex-col justify-center"
      style={{ backgroundImage: `linear-gradient(rgba(151, 191, 15, 0.9), rgba(151, 191, 15, 0.9)), url(${carCollage})` }}
    >
      <h2 className="bold text-3xl font-bold tracking-widest border-b mx-auto max-w-md pb-4">BOOK A CAR TEST-RIDE</h2>
      <p className="text-center py-4">
        There are over 20 different car models to choose from.
        Our ever-expanding selection offers various types of cars, from sports to casual.
        We have showrooms all over the US with test-drive facilities.
        If you wish to rent one of our models please use the selector below.
      </p>
      <form onSubmit={handleSubmit} className="pt-5 flex justify-around font-medium">
        {error && <p>{error}</p>}
        <select className="bg-light-green p-4 rounded-full border-2 border-white focus:outline-none" id="carId" name="carId" value={carId} onChange={(e) => setCarId(e.target.value)}>
          <option value="">Select a car</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>{car.name}</option>
          ))}
        </select>
        <select className="bg-light-green p-4 rounded-full border-2 border-white focus:outline-none" id="city" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
        <input className="bg-light-green p-4 rounded-full border-2 border-white focus:outline-none" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="bg-white p-4 rounded-full border border-white text-light-green" type="submit">Book now</button>
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
};

export default Reserve;
