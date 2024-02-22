import React from 'react';
import { useSelector } from 'react-redux';

export default function AddCar() {
  const engineTypes = useSelector((store) => store.appData.appData.engine_type);
  return <div>AddCar</div>;
}
