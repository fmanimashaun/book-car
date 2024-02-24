import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const FormError = ({ name }) => {
  const [, meta] = useField(name);

  return <small className="text-sm mt-0.5 text-red-400">{meta.touched && meta.error}</small>;
};

FormError.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormError;
