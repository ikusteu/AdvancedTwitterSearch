// prefixes
import 'regenerator-runtime/runtime';

// import from node modules
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import unit module
import TextInput, { TextInputOnChange } from './TextInput';

// mocked onChange and value to be used if not specified otherwise
const onChange = jest.fn<void, Parameters<TextInputOnChange>>((e) => {
  // do nothing
});
const value = 'value';

// start tests
describe('rendering test', () => {
  test('should render mocked component when passed mocked props', () => {
    const mockedProps = {
      name: 'username',
      id: 'username-input',
      label: 'Username:',
      placeholder: 'Your username',
      onChange,
      value,
    };

    render(<TextInput {...mockedProps} />);

    screen.getByLabelText(mockedProps.label);
    screen.getByPlaceholderText(mockedProps.placeholder);
    expect(document.querySelector(`#${mockedProps.id}`)).not.toBeNull();
  });

  test('should not render label element if label is not specified', () => {
    const name = 'password';
    render(<TextInput name={name} value={value} onChange={onChange} />);
    expect(document.querySelector('label')).toBeNull();
  });

  test('should render label element if label is specified', () => {
    const name = 'password';
    const label = 'Password';
    render(
      <TextInput name={name} value={value} label={label} onChange={onChange} />
    );
    expect(document.querySelector('label')).not.toBeNull();
  });

  test("should fallback to using 'name' prop for fields if not provided with optional props", () => {
    const name = 'password';
    render(<TextInput name={name} value={value} onChange={onChange} />);

    screen.getByPlaceholderText(name);
    expect(document.querySelector(`#${name}`)).not.toBeNull();
  });
});

describe('functionality test', () => {
  const functionalityProps = { value: 'username', name: 'username', onChange };
  const userInput = 'Ivan';

  beforeEach(() => {
    onChange.mockClear();
    render(<TextInput {...functionalityProps} />);
  });

  test('should set initial value to one provided in props', () => {
    const inputElement = document.querySelector(
      `#${functionalityProps.name}`
    ) as HTMLInputElement;
    expect(inputElement.value).toEqual(functionalityProps.value);
  });

  test("should call 'onChange' function when passed user input", () => {
    userEvent.type(screen.getByRole('textbox'), userInput);
    expect(onChange).toHaveBeenCalledTimes(userInput.length);
  });

  test("should update named state if 'name' passed to onChange callback", () => {
    // dummy object mocking component state, and its initial values
    const username = '';
    const password = '';
    const state = {
      username,
      password,
    };
    onChange.mockImplementation((e, name) => {
      state[name as 'username'] = e.target.value;
    });

    screen;
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: userInput },
    });

    // username should be updated while password remains the same
    expect(state.username).toEqual(userInput);
    expect(state.password).toEqual(password);
    screen.debug();
  });
});
