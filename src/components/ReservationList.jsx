import React from 'react';
import PropTypes from 'prop-types';

const ReservationList = ({ reservations }) => (
  <div className="py-8">
    {reservations.map((reservation) => (
      <div
        key={reservation.id}
        className="bg-white rounded-lg p-4 shadow-md mb-6"
      >
        {/* Image and Date (Mobile: Same Row) */}
        <div className="flex items-start sm:items-center sm:justify-between flex-col-reverse sm:flex-row">
          <div className="w-64 sm:w-full">
            <img
              src={reservation.car.image_url}
              alt={reservation.car.name}
              className="w-40 h-32 object-contain rounded-md"
            />
          </div>

          <div className="text-gray-600 text-right sm:w-full sm:text-right">
            <p>{reservation.date}</p>
          </div>
        </div>

        {/* Car Details (Stacked) */}
        <div>
          <h2 className="font-medium text-lg">{reservation.car.name}</h2>
          <p className="text-gray-600 text-sm">{reservation.city.name}</p>
          <p className="text-gray-600 mt-2">{reservation.car.description}</p>
        </div>
      </div>
    ))}
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
