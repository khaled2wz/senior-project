import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';

describe('Hero', () => {
  test('renders hero title and cards', () => {
    render(<Hero />);
    expect(screen.getByText('Explore the World')).toBeInTheDocument();
    expect(screen.getByText('Places to Visit')).toBeInTheDocument();
    expect(screen.getByText('Activities')).toBeInTheDocument();
    expect(screen.getByText('Get Inspired')).toBeInTheDocument();
  });
});