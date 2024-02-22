import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchAppData } from 'app/redux/AppDataSlice';

export default function AddCar() {
  const engineTypes = useSelector((store) => store.appData.appData.engine_type);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppData);
  }, [dispatch]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    engine_type_id: engineTypes[0].id,
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

  return (
    <section className="mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-3">Add a new Car</h2>
      <form
        onSubmit={handleSubmit}
      >
        <input
          required
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Name"
          className="form-control mb-2"
        />
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripton"
          className="form-control mb-2"
          rows={5}
        />
        {/* image Url */}
        <input
          required
          type="text"
          name="image_url"
          onChange={handleChange}
          value={formData.image_url}
          placeholder="Image Url"
          className="form-control mb-2"
        />
        <br />
        <label htmlFor="selectCar" className="w-100 mb-2">
          Engine type
          <br />
          <select
            required
            name="engine_type_id"
            id="selectCar"
            className="form-select my-2"
            value={formData.engine_type_id}
            onChange={handleChange}
          >
            {engineTypes.map((engine) => (
              <option value={engine.id} key={engine.id}>
                {engine.name}
              </option>
            ))}
          </select>
        </label>
        <input
          required
          type="number"
          min="1"
          name="horsepower"
          onChange={handleChange}
          value={formData.horsepower}
          placeholder="Horsepower"
          className="form-control mb-2"
        />
        <input
          required
          type="number"
          min="1"
          name="torque"
          onChange={handleChange}
          value={formData.torque}
          placeholder="Torque"
          className="form-control mb-2"
        />

        <input
          required
          type="number"
          min="1"
          name="range"
          onChange={handleChange}
          value={formData.range}
          placeholder="Range"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="fuel_economy"
          onChange={handleChange}
          value={formData.fuel_economy}
          placeholder="Fuel Economy"
          className="form-control mb-2"
        />
        <input
          required
          type="number"
          min="1"
          name="seating_capacity"
          onChange={handleChange}
          value={formData.seating_capacity}
          placeholder="Seating Capacity"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="cargo_space"
          onChange={handleChange}
          value={formData.cargo_space}
          placeholder="Cargo Space"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="infotainment_system"
          onChange={handleChange}
          value={formData.infotainment_system}
          placeholder="Infotainment System"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="safety_rating"
          onChange={handleChange}
          value={formData.safety_rating}
          placeholder="Safety Rating"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="tech_features"
          onChange={handleChange}
          value={formData.tech_features}
          placeholder="Tech Features"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="special_features"
          onChange={handleChange}
          value={formData.special_features}
          placeholder="Special Features"
          className="form-control mb-2"
        />
        <button
          type="submit"
          className="hover:bg-green-600 bg-light-green text-white font-bold py-2 px-4 rounded"
        >
          Add Car
        </button>
      </form>
    </section>
  );
}
