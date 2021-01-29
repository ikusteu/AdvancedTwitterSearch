// polyfills
import 'regenerator-runtime/runtime';

// import from node modules
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import types
import '@testing-library/jest-dom';

// import from local components
import InputForm from './InputForm';
import TextInput from './TextInput';

// begin tests
describe('render test', () => {
  beforeEach(() => {
    render(<InputForm onSubmit={() => {}}>{() => <div>Child</div>}</InputForm>);
  });

  test('should render form element', () => {
    expect(document.querySelector('form')).not.toBeNull;
  });

  test('should accept render prop as child', () => {
    screen.getByText(/child/i);
  });
});

describe('test onSubmit functionality', () => {
  // mock on submit function to be used as default
  const onSubmit = jest.fn(() => {
    // do nothing
  });

  beforeEach(() => {
    onSubmit.mockClear();
    render(
      <InputForm onSubmit={onSubmit} initialValues={{ name: '' }}>
        {({ onChange, values }) => (
          <TextInput name='name' onChange={onChange} value={values.name} />
        )}
      </InputForm>
    );
  });

  test('should call onSubmit on input(state) change with 2s debounce', (done) => {
    userEvent.type(screen.getByRole('textbox'), 'Ivan');

    setTimeout(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      done();
    }, 2000);
  });

  /* check for rerendering after submit ??? */

  test('should not call onSubmit within 2s of input change', (done) => {
    userEvent.type(screen.getByRole('textbox'), 'Ivan');

    setTimeout(() => {
      expect(onSubmit).not.toHaveBeenCalled();
      done();
    }, 1500);
  });
});

describe('test onChange and values passed down to render prop', () => {
  const initialValues = {
    name: 'foo',
    password: 'bar',
  };

  beforeEach(() => {
    render(
      <InputForm initialValues={initialValues} onSubmit={() => {}}>
        {({ values, onChange }) => (
          <>
            <TextInput name='name' value={values.name} onChange={onChange} />
            <pre>Name Value:{values.name}</pre>
            <TextInput
              name='password'
              value={values.password}
              onChange={onChange}
            />
            <pre>Password Value:{values.password}</pre>
            <TextInput name='email' value={values.email} onChange={onChange} />
            <pre>Email Value:{values.email}</pre>
          </>
        )}
      </InputForm>
    );
  });

  test('should accept initial values and pass them to children through render prop', () => {
    screen.getByText(/foo/i);
    screen.getByText(/bar/i);
  });

  test('shuld pass onChange function to children through render prop and adjust values accordingly', async () => {
    userEvent.type(screen.getAllByRole('textbox')[0], 'new foo');
    await screen.findByText(/new foo/);
  });

  test('if initial value not provided, should fall back to empty string', async () => {
    userEvent.type(screen.getAllByRole('textbox')[2], 'new email');
    await screen.findByText(/new email/);
  });
});
