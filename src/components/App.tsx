// polyfills
import 'regenerator-runtime/runtime';

// import from node modules
import React from 'react';

// import from local components
import TextInput from './TextInput';
import Form from './Form';
import Feed from './Feed';

// component function
const App: React.FC = () => {
  return (
    <>
      <Form onSubmit={(data) => console.log(data)}>
        {({ values, onChange }) => (
          <>
            <TextInput
              name='content'
              value={values.content}
              onChange={onChange}
            />
            <TextInput
              name='hashtags'
              value={values.hashtags}
              onChange={onChange}
            />
            <TextInput
              name='username'
              value={values.username}
              onChange={onChange}
            />
          </>
        )}
      </Form>
    </>
  );
};

export default App;
