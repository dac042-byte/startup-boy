import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/api';
import { setAuthToken, setUserId, setUserType } from '../utils/auth';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    user_type: '',
    country: '',
    school: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const countries = [
    'USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'India', 'China', 'Japan', 'South Korea'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeSelect = (type) => {
    setFormData({
      ...formData,
      user_type: type
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.user_type) {
      setError('Please select whether you\'re technical or have ideas');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registrationData } = formData;
      const response = await register(registrationData);
      const { token, user_id, user_type } = response.data;

      setAuthToken(token);
      setUserId(user_id);
      setUserType(user_type);

      navigate('/profile-setup');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">Join CompConnect</h1>
          <p className="register-subtitle">Find your perfect project partner today</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="form-error">{error}</div>}

          {/* User Type Selection */}
          <div className="form-group">
            <label className="form-label">I am...</label>
            <div className="user-type-buttons">
              <button
                type="button"
                className={`user-type-btn ${formData.user_type === 'technical' ? 'active' : ''}`}
                onClick={() => handleUserTypeSelect('technical')}
              >
                <div className="user-type-icon">💻</div>
                <div className="user-type-title">I'm Technical</div>
                <div className="user-type-desc">Developer, Designer, Engineer</div>
              </button>
              <button
                type="button"
                className={`user-type-btn ${formData.user_type === 'non-technical' ? 'active' : ''}`}
                onClick={() => handleUserTypeSelect('non-technical')}
              >
                <div className="user-type-icon">💡</div>
                <div className="user-type-title">I Have Ideas</div>
                <div className="user-type-desc">Entrepreneur, Visionary, Founder</div>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="your.email@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">Country</label>
            <select
              id="country"
              name="country"
              className="form-select"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select your country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="school" className="form-label">School / University</label>
            <input
              type="text"
              id="school"
              name="school"
              className="form-input"
              placeholder="e.g., Stanford University"
              value={formData.school}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login" className="register-link">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
