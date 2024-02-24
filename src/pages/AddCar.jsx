import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCarOnServer } from 'app/redux/AppDataSlice';
import { Form, Formik } from 'formik';
import FormError from 'components/FormError';
import {
  object,
  string,
  mixed,
  number,
} from 'yup';

export default function AddCar() {
  const engineTypes = useSelector(
    (store) => store.appData.appData.engine_types,
  );
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  const handleChange = (setFieldValue, event) => {
    const { name, value, files } = event.target;

    if (name === 'car_image') setFieldValue(name, files[0]);
    else setFieldValue(name, value);
  };

  const validator = object({
    name: string()
      .min(3, 'The minimum number of characters allowed for this field is 3 characters')
      .max(255, 'The maximum number of characters allowed for this field is 255 characters')
      .required('Car name is a required field.'),
    description: string()
      .min(10, 'The minimum number of characters allowed for this field is 10 characters')
      .max(255, 'The maximum number of characters allowed for this field is 255 characters')
      .required('Car description is a required field.'),
    car_image: mixed()
      .required('Car image is a required field.'),
    car_detail_attributes: object({
      engine_type_id: number()
        .label('Openings')
        .integer()
        .positive('Openings must be a postive number and ')
        .required('Engine type is a required field.')
        .typeError(({ label, type }) => `${label} must be a ${type}`),
      horsepower: number()
        .label('Horsepower')
        .required('Horsepower is a required field.')
        .integer()
        .positive('Horsepower must be a positive value')
        .typeError(({ label, type }) => `${label} must be a ${type}`),
      torque: number()
        .label('Torque')
        .integer()
        .positive('Torque must be a postive value')
        .required('Torque is a required field.')
        .typeError(({ label, type }) => `${label} must be a ${type}`),
      fuel_economy: string()
        .max(255, 'The maximum number of characters allowed for this field is 255 characters')
        .when('range', {
          is: (value) => value > 0,
          then: (schema) => schema.required('Fuel economy is a required field.'),
        }),
      range: number(),
      seating_capacity: number()
        .label('Seating Capacity')
        .integer()
        .positive('Seating Capacity must be a postive value')
        .required('Seating Capacity is a required field.')
        .typeError(({ label, type }) => `${label} must be a ${type}`),
      cargo_space: string()
        .max(255, 'The maximum number of characters allowed for this field is 255 characters')
        .required('Cargo Space is a required field.'),
      infotainment_system: string()
        .required('Infotainment System is a required field.'),
      safety_rating: string()
        .required('Safety Rating is a required field.'),
      tech_features: string()
        .required('Tech Features is a required field.'),
      special_features: string()
        .required('Special Features is a required field.'),
    }),
  });

  const handleSubmit = (values, { resetForm }) => {
    const data = new FormData();
    data.append('car[name]', values.name);
    data.append('car[description]', values.description);
    data.append('car[car_image]', values.car_image);
    data.append(
      'car[car_detail_attributes][engine_type_id]',
      values.car_detail_attributes.engine_type_id,
    );
    data.append(
      'car[car_detail_attributes][horsepower]',
      values.car_detail_attributes.horsepower,
    );
    data.append(
      'car[car_detail_attributes][torque]',
      values.car_detail_attributes.torque,
    );
    data.append(
      'car[car_detail_attributes][fuel_economy]',
      values.car_detail_attributes.fuel_economy,
    );
    data.append(
      'car[car_detail_attributes][range]',
      values.car_detail_attributes.range,
    );
    data.append(
      'car[car_detail_attributes][seating_capacity]',
      values.car_detail_attributes.seating_capacity,
    );
    data.append(
      'car[car_detail_attributes][cargo_space]',
      values.car_detail_attributes.cargo_space,
    );
    data.append(
      'car[car_detail_attributes][infotainment_system]',
      values.car_detail_attributes.infotainment_system,
    );
    data.append(
      'car[car_detail_attributes][safety_rating]',
      values.car_detail_attributes.safety_rating,
    );
    data.append(
      'car[car_detail_attributes][tech_features]',
      values.car_detail_attributes.tech_features,
    );
    data.append(
      'car[car_detail_attributes][special_features]',
      values.car_detail_attributes.special_features,
    );

    const options = { data, token };
    dispatch(createCarOnServer(options));

    resetForm();
  };

  return (
    <section className="mx-auto mt-10 lg:mt-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-3 text-dark-blue">Add a new Car</h2>
      <Formik
        initialValues={{
          name: '',
          description: '',
          car_image: '',
          car_detail_attributes: {
            engine_type_id: '',
            horsepower: '',
            torque: '',
            fuel_economy: '',
            range: 0,
            seating_capacity: '',
            cargo_space: '',
            infotainment_system: '',
            safety_rating: '',
            tech_features: '',
            special_features: '',
          },
        }}
        validationSchema={validator}
        onSubmit={handleSubmit}
      >
        {
          ({ values, setFieldValue }) => (
            <Form className="flex flex-wrap justify-between">
              <div className="w-full">
                <label htmlFor="name" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Name
                  <input
                    required
                    id="name"
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.name || ''}
                    placeholder="Name"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="name" />
              </div>
              <div className="w-full">
                <label htmlFor="description" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Description
                  <textarea
                    id="description"
                    required
                    name="description"
                    value={values.description || ''}
                    onChange={(e) => handleChange(setFieldValue, e)}
                    placeholder="Descripton"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    rows={5}
                  />
                </label>
                <FormError name="description" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="car_image" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Car Image
                  <input
                    id="car_image"
                    required
                    type="file"
                    name="car_image"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    placeholder="Upload Car image"
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  />
                </label>
                <FormError name="car_image" />
              </div>
              <br />
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="engine_type_id" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Engine type
                  <br />
                  <select
                    id="engine_type_id"
                    name="car_detail_attributes.engine_type_id"
                    value={
                      values.car_detail_attributes.engine_type_id || undefined
                    }
                    onChange={(e) => handleChange(setFieldValue, e)}
                    className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue>Select Engine Type</option>
                    {engineTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </label>
                <FormError name="car_detail_attributes.engine_type_id" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="horsepower" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Horse Power
                  <input
                    id="horsepower"
                    required
                    type="text"
                    name="car_detail_attributes.horsepower"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.horsepower}
                    placeholder="Horsepower"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.horsepower" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="torque" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Torque
                  <input
                    id="torque"
                    required
                    type="text"
                    min="1"
                    name="car_detail_attributes.torque"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.torque}
                    placeholder="Torque"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.torque" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="range" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Range&nbsp;&nbsp;
                  {values.car_detail_attributes.range}
                  Kms
                  <input
                    id="range"
                    type="range"
                    min="0"
                    max="1000"
                    name="car_detail_attributes.range"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.range}
                    placeholder="Range"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </label>
                <FormError name="car_detail_attributes.range" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="fuel_economy" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Fuel Economy
                  <input
                    id="fuel_economy"
                    type="text"
                    name="car_detail_attributes.fuel_economy"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.fuel_economy || ''}
                    placeholder="Fuel Economy"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.fuel_economy" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="seating_capacity" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Seating Capacity
                  <input
                    id="seating_capacity"
                    required
                    type="text"
                    name="car_detail_attributes.seating_capacity"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.seating_capacity}
                    placeholder="Seating Capacity"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.seating_capacity" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="cargo_space" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Cargo Space
                  <input
                    id="cargo_space"
                    required
                    type="text"
                    name="car_detail_attributes.cargo_space"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.cargo_space || ''}
                    placeholder="Cargo Space"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.cargo_space" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="infotainment_system" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Infortainment System
                  <input
                    id="infotainment_system"
                    required
                    type="text"
                    name="car_detail_attributes.infotainment_system"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.infotainment_system || ''}
                    placeholder="Infotainment System"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.infotainment_system" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="safety_rating" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Safety Rating
                  <input
                    id="safety_rating"
                    required
                    type="text"
                    name="car_detail_attributes.safety_rating"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.safety_rating || ''}
                    placeholder="Safety Rating"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.safety_rating" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="tech_features" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Tech Features
                  <input
                    id="tech_features"
                    required
                    type="text"
                    name="car_detail_attributes.tech_features"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.tech_features || ''}
                    placeholder="Tech Features"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.tech_features" />
              </div>
              <div className="w-full md:w-5/12 lg:w-5/12">
                <label htmlFor="special_features" className="block text-sm font-medium mt-3 leading-6 text-dark-blue">
                  Special Features
                  <input
                    id="special_features"
                    required
                    type="text"
                    name="car_detail_attributes.special_features"
                    onChange={(e) => handleChange(setFieldValue, e)}
                    value={values.car_detail_attributes.special_features || ''}
                    placeholder="Special Features"
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-dark-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </label>
                <FormError name="car_detail_attributes.special_features" />
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="mt-3 hover:bg-green-600 bg-light-green text-white font-bold py-2 px-4 rounded"
                >
                  Add Car
                </button>
              </div>
            </Form>
          )
        }
      </Formik>
    </section>
  );
}
