import { useState } from 'react';

const useForm = (initialValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
    validate({ [name]: values[name] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(values);
    setIsSubmitted(true);
    if (Object.keys(errors).length === 0 && Object.values(values).every((v) => v)) {
      alert('Formulaire soumis');
    }
  };

  return {
    values,
    errors,
    touched,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
  };
};

export default useForm;
