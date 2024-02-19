import { useSelector } from 'react-redux';
import CarList from 'components/CarList';

const Home = () => {
  const { appData: { cars } } = useSelector((state) => state.appData);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cars</h1>
      <CarList cars={cars} />
    </div>
  );
};

export default Home;
