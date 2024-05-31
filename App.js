import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import EmailRequestPage from './components/EmailRequestPage';
import DomainHeadPage from './components/DomainHeadPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/email-request" element={<EmailRequestPage />} />
          <Route path="/domain-head" element={<DomainHeadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
