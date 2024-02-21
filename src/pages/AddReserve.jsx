import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const Reserve = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const cars = useSelector((state) => state.appData.appData.cars);
  const cities = useSelector((state) => state.appData.appData.cities);

  const [carId, setCarId] = useState('');
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
    <div>
      <h2>Make a Reservation</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="carId">
            Select Car:
            <select id="carId" name="carId" value={carId} onChange={(e) => setCarId(e.target.value)}>
              <option value="">Select a car</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>{car.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="city">
            Select City:
            <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="date">
            Date:
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
};

export default Reserve;
