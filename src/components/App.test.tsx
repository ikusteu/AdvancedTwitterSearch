import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('If everthing is fine', () => {
  test('should render input fields and feed sections', async () => {
    render(<App />);
  });
});
