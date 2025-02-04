import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { users, mockFetch } from './mocks/mockFetch';
import { mockGetItem, mockSetItem } from './mocks/mockLocalStorage';

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(mockGetItem);
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(mockSetItem);
  window.sessionStorage.clear();

  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("should log in and navigate to the profile", async () => {
  const user = userEvent.setup();
  render(<App />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submit = screen.getByText(/Sign In/);

  const userObj = users[0];

  userEvent.type(usernameInput, userObj.username);
  userEvent.type(passwordInput, userObj.address.street);

  expect(usernameInput).toHaveValue(userObj.username);
  expect(passwordInput).toHaveValue(userObj.address.street);

  userEvent.click(submit);

  // Ensure we're on the profile page
  expect(screen.getByText(userObj.username)).toBeInTheDocument();
});

it("should update the logged-in user's profile information", async () => {
  const user = userEvent.setup();
  render(<App />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submit = screen.getByText(/Sign In/);

  const userObj = users[0];

  userEvent.type(usernameInput, userObj.username);
  userEvent.type(passwordInput, userObj.address.street);

  expect(usernameInput).toHaveValue(userObj.username);
  expect(passwordInput).toHaveValue(userObj.address.street);

  userEvent.click(submit);

  // Ensure we're on the profile page
  const profileButton = screen.getByRole("link", { name: "Profile" });
  userEvent.click(profileButton);

  const inputs = screen.getAllByRole("textbox");
  userEvent.type(inputs[2], "a@a.a");
  userEvent.type(inputs[3], "111-111-1111");
  userEvent.type(inputs[4], "12345");

  const updateButton = screen.getByRole("button", { name: "Update Data" });
  userEvent.click(updateButton);

  // Assert any necessary post-update state or behavior here
});
