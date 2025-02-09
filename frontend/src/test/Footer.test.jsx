import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  test('renders footer links and copyright', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByText(/© \d{4} Your Company/i)).toBeInTheDocument();
  });
});