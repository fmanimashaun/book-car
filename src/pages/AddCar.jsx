import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCarOnServer } from 'app/redux/AppDataSlice';

export default function AddCar() {
  const engineTypes = useSelector(
    (store) => store.appData.appData.engine_types,
  );
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  const [carData, setCarData] = useState({
    car: {
      name: null,
      description: null,
      car_image: null,
      car_detail_attributes: {
        engine_type_id: null,
        horsepower: null,
        torque: null,
        fuel_economy: null,
        range: null,
        seating_capacity: null,
        cargo_space: null,
        infotainment_system: null,
        safety_rating: null,
        tech_features: null,
        special_features: null,
      },
    },
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setCarData((prevData) => {
      if (name in prevData.car) {
        if (name === 'car_image' && files) {
          return {
            ...prevData,
            car: {
              ...prevData.car,
              car_image: files[0],
            },
          };
        }
        return {
          ...prevData,
          car: {
            ...prevData.car,
            [name]: value,
          },
        };
      }
      if (name in prevData.car.car_detail_attributes) {
        const intValue = ['horsepower', 'torque', 'seating_capacity'].includes(
          name,
        )
          ? parseInt(value, 10)
          : value;

        return {
          ...prevData,
          car: {
            ...prevData.car,
            car_detail_attributes: {
              ...prevData.car.car_detail_attributes,
              [name]: intValue,
            },
          },
        };
      }
      return prevData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('car[name]', carData.car.name);
    data.append('car[description]', carData.car.description);
    data.append('car[car_image]', carData.car.car_image);
    data.append(
      'car[car_detail_attributes][engine_type_id]',
      carData.car.car_detail_attributes.engine_type_id,
    );
    data.append(
      'car[car_detail_attributes][horsepower]',
      carData.car.car_detail_attributes.horsepower,
    );
    data.append(
      'car[car_detail_attributes][torque]',
      carData.car.car_detail_attributes.torque,
    );
    data.append(
      'car[car_detail_attributes][fuel_economy]',
      carData.car.car_detail_attributes.fuel_economy,
    );
    data.append(
      'car[car_detail_attributes][range]',
      carData.car.car_detail_attributes.range,
    );
    data.append(
      'car[car_detail_attributes][seating_capacity]',
      carData.car.car_detail_attributes.seating_capacity,
    );
    data.append(
      'car[car_detail_attributes][cargo_space]',
      carData.car.car_detail_attributes.cargo_space,
    );
    data.append(
      'car[car_detail_attributes][infotainment_system]',
      carData.car.car_detail_attributes.infotainment_system,
    );
    data.append(
      'car[car_detail_attributes][safety_rating]',
      carData.car.car_detail_attributes.safety_rating,
    );
    data.append(
      'car[car_detail_attributes][tech_features]',
      carData.car.car_detail_attributes.tech_features,
    );
    data.append(
      'car[car_detail_attributes][special_features]',
      carData.car.car_detail_attributes.special_features,
    );

    const options = { data, token };
    dispatch(createCarOnServer(options));
  };

  return (
    <section className="mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-3">Add a new Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          name="name"
          onChange={handleChange}
          value={carData.car.name || ''}
          placeholder="Name"
          className="form-control mb-2"
        />
        <textarea
          required
          name="description"
          value={carData.car.description || ''}
          onChange={handleChange}
          placeholder="Descripton"
          className="form-control mb-2"
          rows={5}
        />
        <input
          required
          type="file"
          name="car_image"
          onChange={handleChange}
          placeholder="Upload Car image"
          className="form-control mb-2"
        />
        <br />
        <label htmlFor="selectEngineType" className="w-100 mb-2">
          Engine type
          <br />
          <select
            name="engine_type_id"
            value={
              carData.car.car_detail_attributes.engine_type_id || undefined
            }
            onChange={handleChange}
          >
            {engineTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
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
          value={carData.car.car_detail_attributes.horsepower || 0}
          placeholder="Horsepower"
          className="form-control mb-2"
        />
        <input
          required
          type="number"
          min="1"
          name="torque"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.torque || 0}
          placeholder="Torque"
          className="form-control mb-2"
        />

        <input
          required
          type="number"
          min="1"
          name="range"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.range || 0}
          placeholder="Range"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="fuel_economy"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.fuel_economy || ''}
          placeholder="Fuel Economy"
          className="form-control mb-2"
        />
        <input
          required
          type="number"
          min="1"
          name="seating_capacity"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.seating_capacity || 0}
          placeholder="Seating Capacity"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="cargo_space"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.cargo_space || ''}
          placeholder="Cargo Space"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="infotainment_system"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.infotainment_system || ''}
          placeholder="Infotainment System"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="safety_rating"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.safety_rating || ''}
          placeholder="Safety Rating"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="tech_features"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.tech_features || ''}
          placeholder="Tech Features"
          className="form-control mb-2"
        />
        <input
          required
          type="text"
          name="special_features"
          onChange={handleChange}
          value={carData.car.car_detail_attributes.special_features || ''}
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
