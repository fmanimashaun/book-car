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
  return <div>AddCar</div>;
}
