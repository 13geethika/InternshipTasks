import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EmailRequestPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [domain, setDomain] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/applications/emailreq', { firstName, lastName, domain, phoneNumber });
      console.log(res.data);
      setSubmitted(true);
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  const handleExit = () => {
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Request Email</h2>
              {submitted ? (
                <div>
                  <p>Your application is submitted and is under verification.</p>
                  <button className="btn btn-primary btn-block mt-3" onClick={handleExit}>Exit</button>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailRequestPage;