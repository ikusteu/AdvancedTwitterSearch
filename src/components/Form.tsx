// import from node modules
import React, { useEffect, useState } from 'react';

// import from local components
import { TextInputOnChange } from './TextInput';
import StyledForm from './styled/StyledForm';

// local types and interfaces
interface OnSubmitFunction {
  (data: Record<string, string>): void;
}

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
  onSubmit: OnSubmitFunction;
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

  // default onChange function for children
  const onChange: TextInputOnChange = (e, name) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  // call onSubmit while typing, with 2s debounce
  const [firstRender, setFirstRender] = useState(true);
  const [timeout, setNewTimeout] = useState<null | NodeJS.Timeout>(null);

  const debounce = (callback: OnSubmitFunction, debounceTime: number) => (
    data: Parameters<OnSubmitFunction>[0]
  ) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setNewTimeout(setTimeout(() => callback(data), debounceTime));
  };

  useEffect(() => {
    if (!firstRender) {
      debounce(onSubmit, 2000)(values);
    }
  }, [values]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return <StyledForm>{children({ values, onChange })}</StyledForm>;
};

export default InputForm;
