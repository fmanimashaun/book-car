import React from 'react';
import PropTypes from 'prop-types';

const ReservationList = ({ reservations }) => (
  <div className="overflow-x-auto max-w-[500px] mx-auto">
    <table className="w-full table-auto border-collapse border border-black">
      <thead>
        <tr>
          <th className="px-2 py-2 font-bold text-center whitespace-nowrap border border-black">S/N</th>
          <th className="px-2 py-2 font-bold text-center border border-black">RERSERVATIONS</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation, index) => (
          <tr key={reservation.id} className="bg-gray-100">
            <td className="px-2 py-2 text-center border border-black">{index + 1}</td>
            <td className="px-2 border border-black">
              <div className="flex flex-col md:flex-row items-center space-x-2">
                <img className="w-24 h-24 object-contain rounded-lg" src={reservation.car.image_url} alt={reservation.car.name} />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{reservation.car.name}</h2>
                  <p className="text-sm text-gray-500">{reservation.car.description}</p>
                  <p className="text-sm">
                    <span className="font-semibold">City:</span>
                    {' '}
                    {reservation.city.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Reservation Date:</span>
                    {' '}
                    {reservation.date}
                  </p>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

ReservationList.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      city: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      car: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default ReservationList;
