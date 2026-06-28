import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Register from './Register';
import { api } from '../services/api';

vi.mock('../services/api', () => ({
  api: {
    post: vi.fn(),
  }
}));

describe('Register Component', () => {
  const renderRegister = () => {
    return render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  };

  it('renders register form correctly', () => {
    renderRegister();
    expect(screen.getByPlaceholderText('Dan Gutman')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  it('Edge Case: displays error when user already exists', async () => {
    renderRegister();
    const nameInput = screen.getByPlaceholderText('Dan Gutman');
    const emailInput = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const button = screen.getByRole('button', { name: /Create Account/i });
    
    vi.mocked(api.post).mockRejectedValue({
      response: { data: { error: 'User already exists' } }
    });

    fireEvent.change(nameInput, { target: { value: 'Dan Gutman' } });
    fireEvent.change(emailInput, { target: { value: 'exist@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('User already exists')).toBeInTheDocument();
    });
  });
});
