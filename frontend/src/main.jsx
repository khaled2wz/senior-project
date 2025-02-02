import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Destination from './Pages/Destination.jsx';
import About from './Pages/about';
import AddActivity from './Pages/AddActivity';
import Account from './Pages/Account'; // Import the Account component
import { UserProvider } from './components/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Destination" element={<Destination />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-activity" element={<AddActivity />} />
          <Route path="/account" element={<Account />} /> {/* Add this line */}
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);