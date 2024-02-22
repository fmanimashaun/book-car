import React from 'react';
import { useSelector } from 'react-redux';

export default function AddCar() {
  const engineTypes = useSelector((store) => store.appData.appData.engine_type);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    engine_type_id: '',
    horsepower: null,
    torque: null,
    fuel_economy: '',
    range: '',
    seating_capacity: '',
    cargo_space: '',
    infotainment_system: '',
    safety_rating: '',
    tech_features: '',
    special_features: '',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppData);
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('description', formData.description);
      formDataWithImage.append('image', formData.image);
      formDataWithImage.append(
        'car_detail[engine_type_id]',
        formData.engine_type_id,
      );
      formDataWithImage.append('car_detail[horsepower]', formData.horsepower);
      formDataWithImage.append('car_detail[torque]', formData.torque);
      formDataWithImage.append(
        'car_detail[fuel_economy]',
        formData.fuel_economy,
      );
      formDataWithImage.append(
        'car_detail[seating_capacity]',
        formData.seating_capacity,
      );
      formDataWithImage.append('car_detail[cargo_space]', formData.cargo_space);
      formDataWithImage.append(
        'car_detail[infotainment_system]',
        formData.infotainment_system,
      );
      formDataWithImage.append(
        'car_detail[safety_rating]',
        formData.safety_rating,
      );
      formDataWithImage.append(
        'car_detail[tech_features]',
        formData.tech_features,
      );
      formDataWithImage.append(
        'car_detail[special_features]',
        formData.special_features,
      );

      await axios.post('http://localhost:4000/api/v1/cars', formDataWithImage);
      // Optionally, you can redirect the user to another page or show a success message
    } catch (error) {
      console.error('Error creating car:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return <div>AddCar</div>;
}
