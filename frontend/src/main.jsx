import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Destination from './components/Destination.jsx';
import About from './components/about';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Destination" element={<Destination/>}></Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);