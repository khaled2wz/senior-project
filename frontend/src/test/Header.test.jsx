import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import Header from '../components/Header';

describe('Header', () => {
  const renderHeader = (user) => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user, signOut: jest.fn() }}>
          <Header />
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  test('renders logo and navigation links', () => {
    renderHeader(null);
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Destination')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});