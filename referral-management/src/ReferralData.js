import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReferralData.css';

function ReferralData() {
  const location = useLocation();
  const navigate = useNavigate();
  const { suggestion } = location.state || { suggestion: {} };

  const [form, setForm] = useState({
    client_name: '',
    referral_type: suggestion.referral_type || '',
    organization_referred_to: suggestion.name || '',
    date_referred: new Date().toISOString().split('T')[0],
    able_to_contact: false,
    contact_type_preferred: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/referrals', form)
      .then(() => {
        alert('Referral data saved successfully!');
        navigate('/referral-form');
      })
      .catch((error) => {
        console.error('There was an error saving the referral data:', error);
      });
  };

  return (
    <div className="referral-data-container">
      <h2>Referral Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Client Name</label>
          <input type="text" name="client_name" value={form.client_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Referral Type</label>
          <input type="text" name="referral_type" value={form.referral_type} onChange={handleChange} readOnly />
        </div>
        <div className="form-group">
          <label>Organization Referred To</label>
          <input type="text" name="organization_referred_to" value={form.organization_referred_to} onChange={handleChange} readOnly />
        </div>
        <div className="form-group">
          <label>Date Referred</label>
          <input type="date" name="date_referred" value={form.date_referred} onChange={handleChange} readOnly />
        </div>
        <div className="form-group">
          <label>Able to Contact for Follow Up?</label>
          <input type="checkbox" name="able_to_contact" checked={form.able_to_contact} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Type Preferred</label>
          <input type="text" name="contact_type_preferred" value={form.contact_type_preferred} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <button type="submit">Save Referral Data</button>
      </form>
    </div>
  );
}

export default ReferralData;
