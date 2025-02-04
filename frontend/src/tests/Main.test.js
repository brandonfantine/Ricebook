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
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("should fetch and interact with articles", async () => {
  const user = userEvent.setup();
  render(<App />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submit = screen.getByText(/Sign In/);

  const userObj = users[0];

  userEvent.type(usernameInput, userObj.username);
  userEvent.type(passwordInput, userObj.address.street);
  userEvent.click(submit);

  expect(screen.getByText("🥰")).toBeInTheDocument();

  const articles = screen.getAllByText("🥰");

  expect(articles.length).toBe(30);

  const commentButton = screen.getByRole("button", { name: "Comment" });

  userEvent.click(commentButton);

  // Assert any necessary post-interaction state or behavior here
});

it("should perform a search and filter articles", async () => {
  const user = userEvent.setup();
  render(<App />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submit = screen.getByText(/Sign In/);

  const userObj = users[0];

  userEvent.type(usernameInput, userObj.username);
  userEvent.type(passwordInput, userObj.address.street);
  userEvent.click(submit);

  expect(screen.getByText("🥰")).toBeInTheDocument();

  const searchBar = screen.getByPlaceholderText("Search");
  userEvent.type(searchBar, "ea");

  const filteredArticles = screen.getAllByText("🥰");

  expect(filteredArticles.length).toBeLessThan(40);

  // Assert any necessary post-search state or behavior here
});

it("should add and remove followers and update articles", async () => {
  const user = userEvent.setup();
  render(<App />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submit = screen.getByText(/Sign In/);

  const userObj = users[0];

  userEvent.type(usernameInput, userObj.username);
  userEvent.type(passwordInput, userObj.address.street);
  userEvent.click(submit);

  expect(screen.getByText("🥰")).toBeInTheDocument();

  const userInput = screen.getByPlaceholderText("User");
  const addFollowerButton = screen.getByRole("button", { name: 'Add Follower' });

  userEvent.type(userInput, users[5].username);
  userEvent.click(addFollowerButton);

  const updatedArticlesCount = screen.getAllByText("🥰").length;

  expect(updatedArticlesCount).toBeGreaterThan(40);

  const removeFollowerButtons = screen.getAllByRole("button", { name: "Remove Follower" });

  userEvent.click(removeFollowerButtons[0]);

  const updatedArticlesCountAfterRemove = screen.getAllByText("🥰").length;

  expect(updatedArticlesCountAfterRemove).toBeLessThan(updatedArticlesCount);
});