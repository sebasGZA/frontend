import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { showToast } from 'nextjs-toast-notify';
import { useRouter } from 'next/navigation';
import { postRequest } from '../../lib/api.service';
import LoginPage from './page';

jest.mock('../../lib/api.service', () => ({
  postRequest: jest.fn(),
}));

jest.mock('nextjs-toast-notify', () => ({
  showToast: {
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders correctly', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput).toHaveValue('test@mail.com');
    expect(passwordInput).toHaveValue('123456');
  });

  it('shows warning if fields are empty', async () => {
    render(<LoginPage />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(showToast.warning).toHaveBeenCalledWith('Please fill in all fields');
    });
  });

  it('submits form successfully and navigates', async () => {
    (postRequest as jest.Mock).mockResolvedValue({ token: 'jwt-token' });

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postRequest).toHaveBeenCalledWith('/auth/login', undefined, {
        email: 'test@mail.com',
        password: '123456',
      });
      expect(localStorage.getItem('token')).toBe('jwt-token');
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows error if login fails', async () => {
    (postRequest as jest.Mock).mockResolvedValue({});

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(showToast.error).toHaveBeenCalledWith('Failed to login');
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  it('navigates to register page on Sign up button click', () => {
    render(<LoginPage />);
    const registerButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.click(registerButton);

    expect(pushMock).toHaveBeenCalledWith('/register');
  });
});