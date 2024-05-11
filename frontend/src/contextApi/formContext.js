import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    idCard: '',
    date: '',
    healthCode: '',
    nameError: '',
    documentNo: '',
    planCode: '',
    dob: '',
    age: '',
    gender: '',
    relation: '',
    cnic: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const setFormValues = (values) => {
    setFormData(values);
  };

console.log(formData.values)

  return (
    <FormContext.Provider value={{ formData, setFormValues, handleChange, setFormData}}>
      {children}
    </FormContext.Provider>
  );
};