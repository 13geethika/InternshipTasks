import React, { useState } from 'react';

const EmailForm = ({ onSubmit, loading, error }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personalEmail, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, personalEmail, domain, phoneNumber });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label> 
        <input
          type="email"
          className="form-control"
          id="email"
          value={personalEmail}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="domain">Domain</label>
        <input
          type="text"
          className="form-control"
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </form>
  );
};

export default EmailForm;
