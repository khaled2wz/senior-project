import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Destination from './components/Destination.jsx';
import About from './components/about';
import AddActivity from './components/AddActivity';
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
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);