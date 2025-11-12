import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/api';
import { setAuthToken, setUserId, setUserType } from '../utils/auth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData);
      const { token, user_id, user_type } = response.data;

      setAuthToken(token);
      setUserId(user_id);
      setUserType(user_type);

      navigate('/discover');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back!</h1>
          <p className="login-subtitle">Log in to find your perfect project partner</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="form-error">{error}</div>}

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
              placeholder="Enter your password"
              value={formData.password}
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
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register" className="login-link">Sign up</Link></p>
        </div>

        {/* Quick login for demo */}
        <div className="demo-accounts">
          <p className="demo-title">Demo Accounts (for testing):</p>
          <div className="demo-buttons">
            <button
              className="btn btn-secondary btn-small"
              onClick={() => {
                setFormData({
                  email: 'alex.chen@stanford.edu',
                  password: 'password123'
                });
              }}
            >
              Login as Technical User
            </button>
            <button
              className="btn btn-secondary btn-small"
              onClick={() => {
                setFormData({
                  email: 'olivia.brown@stanford.edu',
                  password: 'password123'
                });
              }}
            >
              Login as Idea Maker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
