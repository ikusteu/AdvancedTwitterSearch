// import from node modules
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// import from local components
import Feed, { View } from './Feed';

// default onViewChangeMock
const onViewChange = jest.fn();

// default render setup
const defaultDOM = (
  <Feed view={View.POSTED_BY} username='Ivan' onViewChange={onViewChange}>
    <div>item1</div>
    <div>item2</div>
  </Feed>
);

// begin tests
describe('in all cases', () => {
  beforeEach(() => {
    render(defaultDOM);
  });

  test('should render content passed as children', () => {
    expect(screen.queryAllByText(/item/i).length).toEqual(2);
  });

  test('should lift state from navbar up', () => {
    fireEvent.click(screen.getAllByText(/posted by/i)[0]);
    fireEvent.click(screen.getAllByText(/liked by/i)[0]);

    expect(onViewChange).toHaveBeenCalledTimes(2);
  });
});

describe('if passed username', () => {
  beforeEach(() => {
    render(defaultDOM);
  });

  test('should render navbar as buttons for tabs', () => {
    expect(screen.getByText(/posted by user/i)).not.toBeDisabled();
    expect(screen.getByText(/liked by user/i)).not.toBeDisabled();
  });

  test('should display "liked/posted by <username>" header', () => {
    screen.getByText(/tweets posted by/i);
    screen.getByText(/ivan/i);

    render(
      <Feed username='Ivan' view={View.LIKED_BY} onViewChange={onViewChange} />
    );
    screen.getByText(/tweets liked by/i);
    expect(screen.queryAllByText(/ivan/i)).toBeTruthy();
  });
});

describe('if username not provided', () => {
  beforeEach(() => {
    render(<Feed view={View.POSTED_BY} onViewChange={onViewChange} />);
    onViewChange.mockClear();
  });

  test('should not render "Posted/Liked by" header', () => {
    expect(screen.queryByText(/tweets posted by/i)).toBeNull();
    expect(screen.queryByText(/tweets liked by/i)).toBeNull();
  });

  test('should deactvate navbar', () => {
    const navButtons = screen.getAllByRole('button');
    navButtons.forEach((button) => expect(button).toBeDisabled());
  });
});
