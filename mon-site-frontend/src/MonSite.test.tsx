import React from 'react';
import { render } from '@testing-library/react';
import MonSite from './MonSite';

test('renders learn react link', () => {
  const { getByText } = render(<MonSite />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
