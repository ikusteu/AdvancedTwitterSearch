// prefixes
import 'regenerator-runtime/runtime';

// import from node modules
import React, { useState } from 'react';
import InputFields from './InputFields';
import Feed from './Feed';
import TextInput from './TextInput';

// component function
const App: React.FC = () => {
  // init state
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <InputFields />
      <Feed />
    </>
  );
};

export default App;
