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
import EditActivity from './Pages/EditActivity';
import Account from './Pages/Account';
import ActivityDetails from './Pages/ActivityDetails'; 
import { UserProvider } from './components/UserContext';
import ResetPassword from './Pages/ResetPassword'; 

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
          <Route path="/edit-activity" element={<EditActivity />} />
          <Route path="/account" element={<Account />} />
          <Route path="/activity/:id" element={<ActivityDetails />} /> 
          <Route path="/reset-password" element={<ResetPassword />} /> {/* Ensure this line is correct */}
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);