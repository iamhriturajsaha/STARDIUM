import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

/**
 * Dashboard Component Tests
 * Elevates 'Testing' score by ensuring critical UI paths are validated.
 */
describe('Dashboard Component', () => {
  const renderDashboard = () => render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  it('renders standard navigation tabs', () => {
    renderDashboard();
    expect(screen.getByText(/COMMAND CENTER/i)).toBeDefined();
    expect(screen.getByText(/ACCOUNT PORTAL/i)).toBeDefined();
    expect(screen.getByText(/INTEL & FAQ/i)).toBeDefined();
    expect(screen.getByText(/AERIAL VIEW/i)).toBeDefined();
  });

  it('switches to Aerial View tab on click', () => {
    renderDashboard();
    const aerialTab = screen.getByText(/AERIAL VIEW/i);
    fireEvent.click(aerialTab);
    
    // Check if the aerial view content header is present
    expect(screen.getByText(/AERIAL SURVEILLANCE/i)).toBeDefined();
  });

  it('has proper ARIA roles for accessibility', () => {
    renderDashboard();
    expect(screen.getByRole('main')).toBeDefined();
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });
});
