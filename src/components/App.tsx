// prefixes
import 'regenerator-runtime/runtime';

// import from node modules
import React, { useState } from 'react';
import InputFields from './InputFields';
import Feed from './Feed';
import TextInput from './TextInput';
import InputForm from './InputForm';

// component function
const App: React.FC = () => {
  return (
    <>
      <InputFields />
      <Feed />
    </>
  );
};

export default App;
