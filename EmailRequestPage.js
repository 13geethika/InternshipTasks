import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import EmailForm from './EmailForm';

const EmailRequestPage = () => {
  const { userEmail } = useLocation().state; 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');
  const navigate = useNavigate();

  const fetchApplicationStatus = async () => {
    try {
      console.log(userEmail);
      const res = await axios.get('http://localhost:5000/api/applications/emailreq', {
        params: { personalEmail: userEmail }
      });
      console.log(res.data, "hello");
      const applications = res.data;
      const submittedApplication = applications.find(application => application.submit);
      if (submittedApplication) {
        setSubmitted(true);
        setStatusUpdate(submittedApplication.status);
        localStorage.setItem('applicationStatus', submittedApplication.status); 
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch application status');
    }
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem('applicationStatus');
    if (storedStatus) {
      setSubmitted(true);
      setStatusUpdate(storedStatus);
    } else if (userEmail) {
      fetchApplicationStatus();
    }
  }, [userEmail]);

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/applications/emailreq', formData);
      console.log(res.data);
      if (res.data && res.data.application && res.data.application.submit) {
        
        setSubmitted(true);
        setStatusUpdate(res.data.application.status); 
        localStorage.setItem('applicationStatus', res.data.application.status); 
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleExit = () => {
    localStorage.removeItem('applicationStatus'); 
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
                  <p>Your application is submitted and it is {statusUpdate}.</p>
                  <button className="btn btn-primary btn-block mt-3" onClick={handleExit}>Exit</button>
                </div>
              ) : (
                <EmailForm onSubmit={handleSubmit} loading={loading} error={error} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailRequestPage;
