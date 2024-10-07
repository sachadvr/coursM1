import React from 'react';

const FormInput = ({ label, type, name, value, onChange, onBlur, error, touched, isSubmitted }) => {
  const showError = error && (touched || isSubmitted);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 w-fit">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        autoComplete="off"
        className="text-black p-2 border rounded"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {showError && (
        <div className="text-red-500 text-sm mt-1">
          {Array.isArray(error) ? (
            <ul>
              {error.map((errMsg, index) => (
                <li key={index}>{errMsg}</li>
              ))}
            </ul>
          ) : (
            <span>{error}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default FormInput;
