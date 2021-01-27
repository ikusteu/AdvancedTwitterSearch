import React from 'react';
import Feed from './Feed';
import { render } from '@testing-library/react';

describe('render test', () => {
  test('should render component', () => {
    render(<Feed />);
  });
});
