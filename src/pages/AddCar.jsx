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
        <label htmlFor="name" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Name
          <input
            required
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={carData.car.name || ''}
            placeholder="Name"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="description" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Description
          <textarea
            id="description"
            required
            name="description"
            value={carData.car.description || ''}
            onChange={handleChange}
            placeholder="Descripton"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            rows={5}
          />
        </label>
        <label htmlFor="car_image" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Car Image
          <input
            id="car_image"
            required
            type="file"
            name="car_image"
            onChange={handleChange}
            placeholder="Upload Car image"
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          />
        </label>
        <br />
        <label htmlFor="engine_type_id" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Engine type
          <br />
          <select
            id="engine_type_id"
            name="engine_type_id"
            value={
              carData.car.car_detail_attributes.engine_type_id || undefined
            }
            onChange={handleChange}
            className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {engineTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="horsepower" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Horse Power
          <input
            id="horsepower"
            required
            type="number"
            min="1"
            name="horsepower"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.horsepower || 0}
            placeholder="Horsepower"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="torque" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Torque
          <input
            id="torque"
            required
            type="number"
            min="1"
            name="torque"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.torque || 0}
            placeholder="Torque"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="range" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Range&nbsp;&nbsp;
          {carData.car.car_detail_attributes.range}
          Kms
          <input
            id="range"
            required
            type="range"
            min="200"
            max="1000"
            name="range"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.range || 0}
            placeholder="Range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </label>
        <label htmlFor="fuel_economy" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Fuel Economy
          <input
            id="fuel_economy"
            required
            type="text"
            name="fuel_economy"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.fuel_economy || ''}
            placeholder="Fuel Economy"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="seating_capacity" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Seating Capacity
          <input
            id="seating_capacity"
            required
            type="number"
            min="1"
            name="seating_capacity"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.seating_capacity || 0}
            placeholder="Seating Capacity"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="cargo_space" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Cargo Space
          <input
            id="cargo_space"
            required
            type="text"
            name="cargo_space"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.cargo_space || ''}
            placeholder="Cargo Space"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="infotainment_system" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Infortainment System
          <input
            id="infotainment_system"
            required
            type="text"
            name="infotainment_system"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.infotainment_system || ''}
            placeholder="Infotainment System"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="safety_rating" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Safety Rating
          <input
            id="safety_rating"
            required
            type="text"
            name="safety_rating"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.safety_rating || ''}
            placeholder="Safety Rating"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="tech_features" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Tech Features
          <input
            id="tech_features"
            required
            type="text"
            name="tech_features"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.tech_features || ''}
            placeholder="Tech Features"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label htmlFor="special_features" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
          Special Features
          <input
            id="special_features"
            required
            type="text"
            name="special_features"
            onChange={handleChange}
            value={carData.car.car_detail_attributes.special_features || ''}
            placeholder="Special Features"
            className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <button
          type="submit"
          className="mt-3 hover:bg-green-600 bg-light-green text-white font-bold py-2 px-4 rounded"
        >
          Add Car
        </button>
      </form>
    </section>
  );
}
