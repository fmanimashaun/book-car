import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReservationList from 'components/ReservationList';
import { fetchReservations } from 'app/redux/reservationsSlice';

const MyReservation = () => {
  const { token } = useSelector((store) => store.auth.user);
  const { reservations, status } = useSelector((state) => state.reservations);

  const sortedReservations = [...reservations]?.sort((a, b) => new Date(b.date) - new Date(a.date));

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
      <ReservationList reservations={sortedReservations} />
    ) : (
      <div>No reservations.</div>
    );
  } else if (status === 'failed') {
    content = <div>Error loading reservations, check you network and refresh browser</div>;
  }

  return <div>{content}</div>;
};

export default MyReservation;
