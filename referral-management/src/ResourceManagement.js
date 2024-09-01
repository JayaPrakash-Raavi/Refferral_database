import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ResourceManagement.css';

function ResourceManagement() {
  const [form, setForm] = useState({
    referral_type: '',
    name: '',
    services: '',
    ages_serviced: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    zip_code: '',
    last_updated: '',
    other_details: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/organizations', form)
      .then(() => {
        setForm({
          referral_type: '',
          name: '',
          services: '',
          ages_serviced: '',
          address: '',
          phone: '',
          email: '',
          website: '',
          zip_code: '',
          last_updated: '',
          other_details: '',
        });
        alert('Organization added successfully!');
      })
      .catch((error) => console.error('There was an error adding the organization:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="resource-management-container">
      <h2>Resource Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="referral_type"
          placeholder="Referral Type"
          value={form.referral_type}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Organization"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="services"
          placeholder="Services"
          value={form.services}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ages_serviced"
          placeholder="Ages Serviced"
          value={form.ages_serviced}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          value={form.zip_code}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="last_updated"
          placeholder="Last Updated"
          value={form.last_updated}
          onChange={handleChange}
          required
        />
        <textarea
          name="other_details"
          placeholder="Other Details"
          value={form.other_details}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Organization</button>
      </form>
    </div>
  );
}

export default ResourceManagement;
