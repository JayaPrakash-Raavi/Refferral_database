import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FollowUp.css';

function FollowUp() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/followups')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the follow-up data:', error);
      });
  }, []);

  return (
    <div className="follow-up-container">
      <h2>Follow-Up</h2>
      <table className="follow-up-table">
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Referral Type</th>
            <th>Organization Referred To</th>
            <th>Deadline to Follow Up</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.client_id}</td>
              <td>{client.client_name}</td>
              <td>{client.referral_type}</td>
              <td>{client.organization_referred_to}</td>
              <td>{client.deadline_to_follow_up}</td>
              <td>
                <Link to={`/follow-up/${client.client_id}`}>
                  <button>Follow Up</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FollowUp;
