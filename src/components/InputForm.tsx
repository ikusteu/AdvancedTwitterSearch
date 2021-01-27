// import from node modules
import React, { useState } from 'react';

// import from local components
import { TextInputOnChange } from './TextInput';

// local types and interfaces
interface PassedData {
  values: Record<string, string>;
  onChange: TextInputOnChange;
}

type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : null;

interface InputFormProps {
  children: (data: PassedData) => ReturnType<React.FC>;
  onSubmit?: () => void;
  initialValues?: Record<string, string>;
}

// component fuction
const InputForm: React.FC<InputFormProps> = ({
  children,
  onSubmit,
  initialValues,
}) => {
  // create state object from initial values
  const [values, setValues] = useState({
    ...initialValues,
  });

  // default onChange function
  const onChange: TextInputOnChange = (e, name) => {
    if (name) {
      setValues({
        ...values,
        [name]: e.target.value,
      });
    }
  };

  // add prevent default to every onSubmit function
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };
  return <form onSubmit={handleSubmit}>{children({ values, onChange })}</form>;
};

export default InputForm;
