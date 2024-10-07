import React from 'react';
import './App.css';
import FormInput from './FormInput';
import useForm from './useForm';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    prenom: '',
  };

  const {
    values,
    errors,
    touched,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
  } = useForm(initialValues, false, validate);

  function validate(fieldValues = values) {
    let tempErrors = { ...errors };

    if ('email' in fieldValues) {
      if (!fieldValues.email) {
        tempErrors.email = 'Email est requis';
      } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(fieldValues.email)) {
        tempErrors.email = 'Email invalide';
      } else {
        delete tempErrors.email;
      }
    }

    if ('password' in fieldValues) {
      const passwordErrors = [];
      if (fieldValues.password.length < 8) passwordErrors.push('Au moins 8 caractères');
      if (!/[A-Z]/.test(fieldValues.password)) passwordErrors.push('Au moins une lettre majuscule');
      if (!/[a-z]/.test(fieldValues.password)) passwordErrors.push('Au moins une lettre minuscule');
      if (!/[0-9]/.test(fieldValues.password)) passwordErrors.push('Au moins un chiffre');
      if (!/[!@#$%^&*]/.test(fieldValues.password)) passwordErrors.push('Au moins un caractère spécial');

      if (passwordErrors.length > 0) {
        tempErrors.password = passwordErrors;
      } else {
        delete tempErrors.password;
      }

      // Valider également confirmPassword lorsque password change
      if (values.confirmPassword && fieldValues.password !== values.confirmPassword) {
        tempErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      } else {
        delete tempErrors.confirmPassword;
      }
    }

    if ('confirmPassword' in fieldValues) {
      if (!fieldValues.confirmPassword || fieldValues.confirmPassword !== values.password) {
        tempErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      } else {
        delete tempErrors.confirmPassword;
      }
    }

    if ('nom' in fieldValues) {
      if (!fieldValues.nom) {
        tempErrors.nom = 'Nom est requis';
      } else {
        delete tempErrors.nom;
      }
    }

    if ('prenom' in fieldValues) {
      if (!fieldValues.prenom) {
        tempErrors.prenom = 'Prénom est requis';
      } else {
        delete tempErrors.prenom;
      }
    }

    setErrors(tempErrors);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form
          className="flex flex-col bg-white p-8 rounded shadow-md text-black"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl mb-6 w-fit">S'enregistrer</h2>

          <FormInput
            label="Nom"
            type="text"
            name="nom"
            value={values.nom}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.nom}
            touched={touched.nom}
            isSubmitted={isSubmitted}
          />

          <FormInput
            label="Prénom"
            type="text"
            name="prenom"
            value={values.prenom}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.prenom}
            touched={touched.prenom}
            isSubmitted={isSubmitted}
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            isSubmitted={isSubmitted}
          />

          <FormInput
            label="Mot de passe"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            isSubmitted={isSubmitted}
          />

          <FormInput
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            isSubmitted={isSubmitted}
          />

          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Valider
          </button>
        </form>
      </header>
    </div>
  );
};

export default Login;
