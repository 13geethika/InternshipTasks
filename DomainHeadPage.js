import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const DomainHeadPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/applications/emailreq');
        console.log('Response data:', res.data); 
        if (Array.isArray(res.data)) {
          setApplications(res.data);
        } else {
          console.error('Error: Response data is not an array');
        }
      } catch (err) {
        console.error(err.response ? err.response.data : 'Error fetching applications');
      }
    };
  
    fetchApplications();
  }, []);
  

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/applications/${id}`, { status });
      console.log(res.data);
      setApplications(applications.map(app => app._id === id ? { ...app, status } : app));
    } catch (err) {
      console.error(err.response ? err.response.data : 'Error updating status');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Applications</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.firstName}</td>
              <td>{app.lastName}</td>
              <td>
                {app.status === 'verified' ? (
                  <>
                    Verified&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                  </>
                ) : (
                  app.status
                )}
              </td>
              <td>
                <button className="btn btn-success mr-2" onClick={() => handleUpdateStatus(app._id, 'verified')}>Verify</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={() => handleUpdateStatus(app._id, 'declined')}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainHeadPage;
