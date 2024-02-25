import ReservationList from 'components/ReservationList';

const MyResevation = () => {
  const data = [
    {
      id: 1,
      date: '2024-02-27',
      user_id: 1,
      user: {
        id: 1,
        name: 'Admin User',
      },
      city: {
        id: 2,
        name: 'Los Angeles',
      },
      car: {
        id: 2,
        name: 'Honda Accord',
        description: 'Sporty yet sensible, the Accord offers enjoyable handling, ample passenger room, and excellent gas mileage.',
        image_url: 'http://localhost:4000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MiwicHVyIjoiYmxvYl9pZCJ9fQ==--6206a9ad28842c3722f93eefb58dbad50fcbfea4/Honda-Accord.png',
      },
    },
    {
      id: 2,
      date: '2024-02-28',
      user_id: 1,
      user: {
        id: 1,
        name: 'Admin User',
      },
      city: {
        id: 2,
        name: 'Los Angeles',
      },
      car: {
        id: 2,
        name: 'Honda Accord',
        description: 'Sporty yet sensible, the Accord offers enjoyable handling, ample passenger room, and excellent gas mileage.',
        image_url: 'http://localhost:4000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MiwicHVyIjoiYmxvYl9pZCJ9fQ==--6206a9ad28842c3722f93eefb58dbad50fcbfea4/Honda-Accord.png',
      },
    },
  ];
  return (
    <div>
      <ReservationList reservations={data} />
    </div>
  );
};

export default MyResevation;
