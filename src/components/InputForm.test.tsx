import 'regenerator-runtime/runtime';
import React from 'react';
import InputForm from './InputForm';
import TextInput from './TextInput';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('render test', () => {
  beforeEach(() => {
    render(<InputForm>{() => <div>Child</div>}</InputForm>);
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

  test('shuld call on submit function without rerendering', async () => {
    render(
      <InputForm onSubmit={onSubmit}>
        {() => <input id='textfield' value='ss' type='text' />}
      </InputForm>
    );

    const input = 'search';
    const textBox = screen.getByRole('textbox');

    fireEvent.submit(textBox);
    expect(onSubmit).toHaveBeenCalledTimes(1);

    /* check for rerendering after submit ??? */
  });
});

describe('test onChange and values passed down to render prop', () => {
  const initialValues = {
    name: 'foo',
    password: 'bar',
  };

  beforeEach(() => {
    render(
      <InputForm initialValues={initialValues}>
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
