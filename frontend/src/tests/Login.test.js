import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock the useNavigate hook
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock JSON data
jest.mock('../data/users.json', () => ([{
    username: 'testuser',
    address: {
      street: 'testpassword',
    },
    company: {
      catchPhrase: 'Test Company',
    }
  }]));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();

    // Reset the useNavigate mock
    mockedUsedNavigate.mockClear();
  });

  test('should render the login form', () => {
    render(<App />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const login = screen.getByText(/Sign In/);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });

  test('should redirect to main page on successful login', () => {
    render(<App />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText(/Sign In/);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Simulate a form submit
    fireEvent.click(loginButton);

    // Expect redirection to the main page
    expect(mockedUsedNavigate).toBeCalledWith('/main');
  });

  test('should show an error message on failed password', () => {
    render(<App />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText(/Sign In/);

    // Simulate invalid user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

    // Simulate a form submit
    fireEvent.click(loginButton);

    // Expect an error message
    const errorMessage = screen.getByText('Username or Password Incorrect. Please try again.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('should show an error message on failed username', () => {
    render(<App />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText(/Sign In/);

    // Simulate invalid user input
    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Simulate a form submit
    fireEvent.click(loginButton);

    // Expect an error message
    const errorMessage = screen.getByText('Username or Password Incorrect. Please try again.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('should show an error message on failed login', () => {
    render(<App />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText(/Sign In/);

    // Simulate invalid user input
    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

    // Simulate a form submit
    fireEvent.click(loginButton);

    // Expect an error message
    const errorMessage = screen.getByText('Username or Password Incorrect. Please try again.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('users can make an account', () => {
    render(<App />);
    const makeNewUser = screen.getByRole('register');
    
    // Expect redirection to the registration page
    expect(makeNewUser).toHaveAttribute('href', '/registration');
  });

  test('log out a user', async () => {
    const user = userEvent.setup();
    render(<App />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText(/Sign In/);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    await user.click(loginButton);

    const logout = screen.getByText("Log Out");
    await user.click(logout);
});
});