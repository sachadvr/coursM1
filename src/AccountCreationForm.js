import React, { useReducer, useState } from 'react';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    password: [],
    confirmPassword: ''
  }
};

const fieldPatterns = {
  firstName: [
    { pattern: /.+/, message: 'Le prénom est requis.' }
  ],
  lastName: [
    { pattern: /.+/, message: 'Le nom est requis.' }
  ],
  email: [
    { pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: 'Format d\'email invalide.' }
  ],
  password: [
    { pattern: /.{8,}/, message: 'Le mot de passe doit contenir au moins 8 caractères.' },
    { pattern: /[a-z]/, message: 'Le mot de passe doit contenir au moins une lettre minuscule.' },
    { pattern: /[A-Z]/, message: 'Le mot de passe doit contenir au moins une lettre majuscule.' },
    { pattern: /\d/, message: 'Le mot de passe doit contenir au moins un chiffre.' },
    { pattern: /[@$!%*?&]/, message: 'Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&).' }
  ],
  confirmPassword: [
    { pattern: (value, state) => value === state.password, message: 'Les mots de passe ne correspondent pas.' }
  ]
};

const validateField = (field, value, state) => {
  const errors = [];
  if (fieldPatterns[field]) {
    fieldPatterns[field].forEach(({ pattern, message }) => {
      if (typeof pattern === 'function') {
        if (!pattern(value, state)) errors.push(message);
      } else if (!pattern.test(value)) {
        errors.push(message);
      }
    });
  }
  return errors;
};

const AccountCreationForm = () => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return {
          ...state,
          [action.field]: action.value,
        };
      case 'SET_ERROR':
        return {
          ...state,
          errors: { ...state.errors, [action.field]: action.error },
        };
      case 'CLEAR_ERROR':
        return {
          ...state,
          errors: { ...state.errors, [action.field]: '' },
        };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  }, initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, state);
    if (Array.isArray(error)) {
      dispatch({ type: 'SET_ERROR', field: name, error });
    } else if (error) {
      dispatch({ type: 'SET_ERROR', field: name, error });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    Object.keys(state).forEach((field) => {
      if (field !== 'errors') {
        const error = validateField(field, state[field], state);
        if (Array.isArray(error) && error.length > 0) {
          hasErrors = true;
          dispatch({ type: 'SET_ERROR', field, error });
        } else if (error && error.length > 0) {
          hasErrors = true;
          dispatch({ type: 'SET_ERROR', field, error });
        }
      }
    });
    if (!hasErrors) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg neomorphism">
        <h1 className="text-2xl font-bold mb-6">Créer un compte</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full rounded-lg shadow-inner neomorphism-input"
            />
            {state.errors.firstName && <p className="text-red-500 text-xs mt-1">{state.errors.firstName}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full rounded-lg shadow-inner neomorphism-input"
            />
            {state.errors.lastName && <p className="text-red-500 text-xs mt-1">{state.errors.lastName}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full rounded-lg shadow-inner neomorphism-input"
            />
            {state.errors.email && <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full rounded-lg shadow-inner neomorphism-input"
            />
            {state.errors.password.length > 0 && (
              <ul className="text-red-500 text-xs mt-1">
                {state.errors.password.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full rounded-lg shadow-inner neomorphism-input"
            />
            {state.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{state.errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-md neomorphism-button hover:bg-blue-600">
            Créer un compte
          </button>
        </form>

        {submitted && <p className="text-green-500 text-sm mt-4">Formulaire soumis avec succès!</p>}
      </div>
    </div>
  );
};

export default AccountCreationForm;
