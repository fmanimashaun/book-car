import { useSelector } from 'react-redux';
import CarList from 'components/CarList';

const Home = () => {
  const { appData: { cars } } = useSelector((state) => state.appData);

  return (
    <div className="text-center">
      <div className="py-5 mx-5">
        <h2 className="text-3xl font-bold">LATEST MODELS</h2>
        <h3>Please select a car model</h3>
      </div>
      <CarList cars={cars} />
    </div>
  );
};

export default Home;
