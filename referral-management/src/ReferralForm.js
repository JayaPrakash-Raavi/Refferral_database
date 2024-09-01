import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ReferralForm.css';

function ReferralForm() {
  const [form, setForm] = useState({
    referral_type: '',
    age_group: '',
    zip_code: '',
  });
  const [selectedFields, setSelectedFields] = useState({
    referral_type: true,
    age_group: true,
    zip_code: true,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchCriteria = {};
    Object.keys(selectedFields).forEach((field) => {
      if (selectedFields[field] && form[field]) {
        searchCriteria[field] = form[field];
      }
    });

    setSuggestions([]);
    setNoResults(false);

    axios.post('http://localhost:3000/referrals/search', searchCriteria)
      .then((response) => {
        setSuggestions(response.data);
        setNoResults(response.data.length === 0);
      })
      .catch((error) => {
        console.error('There was an error making the request:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFields({ ...selectedFields, [name]: checked });
  };

  const handleRefer = (suggestion) => {
    navigate('/referral-data', { state: { suggestion } });
  };

  return (
    <div className="referral-form-container">
      <h2>Referral Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="referral_type"
              checked={selectedFields.referral_type}
              onChange={handleCheckboxChange}
            />
            Include Referral Type
          </label>
          {selectedFields.referral_type && (
            <input
              type="text"
              name="referral_type"
              placeholder="Referral Type (e.g., Mental Health)"
              value={form.referral_type}
              onChange={handleChange}
              required
            />
          )}
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="age_group"
              checked={selectedFields.age_group}
              onChange={handleCheckboxChange}
            />
            Include Age Group
          </label>
          {selectedFields.age_group && (
            <input
              type="text"
              name="age_group"
              placeholder="Age Group"
              value={form.age_group}
              onChange={handleChange}
              required
            />
          )}
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="zip_code"
              checked={selectedFields.zip_code}
              onChange={handleCheckboxChange}
            />
            Include Zip Code
          </label>
          {selectedFields.zip_code && (
            <input
              type="text"
              name="zip_code"
              placeholder="Zip Code"
              value={form.zip_code}
              onChange={handleChange}
              required
            />
          )}
        </div>

        <button type="submit" className="find-button">Find Organizations</button>
      </form>
      {noResults ? (
        <p className="no-results">No organizations found for the selected criteria.</p>
      ) : (
        <div className="suggestions-container">
          <table className="suggestions-table">
            <thead>
              <tr>
                <th>Referral Type</th>
                <th>Organization</th>
                <th>Services</th>
                <th>Ages Serviced</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Website</th>
                <th>Zip Code</th>
                <th>Last Updated</th>
                <th>Other Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((suggestion) => (
                <tr key={suggestion.id}>
                  <td>{suggestion.referral_type}</td>
                  <td>{suggestion.name}</td>
                  <td>{suggestion.services}</td>
                  <td>{suggestion.ages_serviced}</td>
                  <td>{suggestion.address}</td>
                  <td>{suggestion.phone}</td>
                  <td>{suggestion.email}</td>
                  <td>{suggestion.website}</td>
                  <td>{suggestion.zip_code}</td>
                  <td>{suggestion.last_updated}</td>
                  <td>{suggestion.other_details}</td>
                  <td>
                    <button onClick={() => handleRefer(suggestion)}>Refer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReferralForm;
