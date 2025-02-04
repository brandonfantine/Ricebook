import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import ProfilePage from './pages/Profile';
import RegistrationPage from './pages/Registration';

export default function App() {

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          {/* Set the root path to render the login page */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}