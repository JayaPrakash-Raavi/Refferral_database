import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailedFollowUp.css';

function DetailedFollowUp() {
  const { client_id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    client_name: '',
    referral_type: '',
    organization_referred_to: '',
    deadline_to_follow_up: '',
    appointment_made: false,
    gender: '',
    hispanic_or_latino: false,
    race_ethnicity: '',
    sexual_identity: '',
    age: '',
    religious_affiliation: '',
    housing: '',
    income: '',
    employment: '',
    education: '',
    primary_language: '',
    was_988_helpful: false,
    would_use_988_again: false,
    liked_988: '',
    disliked_988: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/followups/${client_id}`)
      .then((response) => {
        setForm(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the follow-up data:', error);
      });
  }, [client_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/followups/${client_id}`, form)
      .then(() => {
        alert('Follow-up data updated successfully!');
        navigate('/follow-up'); // Navigate back to the follow-up tab
      })
      .catch((error) => {
        console.error('There was an error updating the follow-up data:', error);
      });
  };

  return (
    <div className="detailed-follow-up-container">
      <h2>Detailed Follow-Up for Client {client_id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Client Name</label>
          <input type="text" name="client_name" value={form.client_name} onChange={handleChange} readOnly />
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
          <label>Deadline to Follow Up</label>
          <input type="date" name="deadline_to_follow_up" value={form.deadline_to_follow_up} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Appointment Made with Referral?</label>
          <input type="checkbox" name="appointment_made" checked={form.appointment_made} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input type="text" name="gender" value={form.gender} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Hispanic or Latino</label>
          <input type="checkbox" name="hispanic_or_latino" checked={form.hispanic_or_latino} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Race/Ethnicity</label>
          <input type="text" name="race_ethnicity" value={form.race_ethnicity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Sexual Identity</label>
          <input type="text" name="sexual_identity" value={form.sexual_identity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="text" name="age" value={form.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Religious Affiliation</label>
          <input type="text" name="religious_affiliation" value={form.religious_affiliation} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Housing</label>
          <input type="text" name="housing" value={form.housing} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Income</label>
          <input type="text" name="income" value={form.income} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Employment</label>
          <input type="text" name="employment" value={form.employment} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Education</label>
          <input type="text" name="education" value={form.education} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Primary Language</label>
          <input type="text" name="primary_language" value={form.primary_language} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>988 was helpful?</label>
          <input type="checkbox" name="was_988_helpful" checked={form.was_988_helpful} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Would use 988 again?</label>
          <input type="checkbox" name="would_use_988_again" checked={form.would_use_988_again} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>What did you like about using 988?</label>
          <textarea name="liked_988" value={form.liked_988} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>What did NOT like about using 988?</label>
          <textarea name="disliked_988" value={form.disliked_988} onChange={handleChange} required />
        </div>
        <button type="submit">Save Follow-Up Data</button>
      </form>
    </div>
  );
}

export default DetailedFollowUp;
