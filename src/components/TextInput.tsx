// import from node modules
import { getStoreKeyName } from '@apollo/client/utilities';
import React from 'react';

// import from local components
import StyledTextInput from './styled/StyledTextInput';

// local types and interfaces
export interface TextInputOnChange {
  (event: React.ChangeEvent<HTMLInputElement>, name?: string): void;
}

interface TextInputProps {
  name: string;
  value: string;
  onChange: TextInputOnChange;
  id?: string;
  label?: string;
  placeholder?: string;
}

// component function
const TextInput: React.FC<TextInputProps> = ({
  name,
  value,
  onChange,
  ...props
}) => {
  // const theme = {
  //   color: 'blue',
  //   border: '1px solid rgba(255, 255, 255, 0.7)',
  //   borderRadius: '4px',
  //   padding: '0 8px',
  // };

  return (
    <>
      {props.label && <label htmlFor={props.id || name}>{props.label}</label>}
      <StyledTextInput
        id={props.id || name}
        type='text'
        placeholder={props.placeholder || name}
        value={value}
        onChange={(event) => onChange(event, name)}
      />
    </>
  );
};

export default TextInput;
