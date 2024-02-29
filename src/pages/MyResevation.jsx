import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReservationList from 'components/ReservationList';
import { fetchReservations } from 'app/redux/reservationsSlice';

const MyReservation = () => {
  const { token } = useSelector((store) => store.auth.user);
  const { reservations, status } = useSelector((state) => state.reservations);

  // set today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // filter out past reservations and sort by date
  const sortedReservations = [...reservations]
    ?.filter((reservation) => new Date(reservation.date) >= today)
    ?.sort((a, b) => new Date(b.date) - new Date(a.date));

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchReservations(token));
    }
  }, [dispatch, status, token]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = reservations?.length > 0 ? (
      <div className="container mx-auto ">
        <h2 className="text-3xl sm:text-4xl font-bold">Reservations</h2>
        <p className="text-gray-600 text-lg sm:text-xl">
          View your upcoming reservations
        </p>
        <ReservationList reservations={sortedReservations} />
      </div>
    ) : (
      <div>No reservations.</div>
    );
  } else if (status === 'failed') {
    content = <div>Error loading reservations, check you network and refresh browser</div>;
  }

  return <div>{content}</div>;
};

export default MyReservation;
