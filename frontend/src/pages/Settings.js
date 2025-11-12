import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSettings, updateSettings, getProfile, updateProfile, deleteAccount } from '../utils/api';
import { getUserId, logout } from '../utils/auth';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const userId = getUserId();

  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    bio: '',
    skills: '',
    portfolio_link: '',
    github_url: '',
    project_idea: '',
    equity_offering: '',
    payment_available: false,
    timeline: '',
  });

  const [accountData, setAccountData] = useState({
    email: '',
    country: '',
    school: '',
    subscription_tier: 'free',
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, profileRes] = await Promise.all([
        getSettings(),
        getProfile(userId),
      ]);

      setAccountData(settingsRes.data);
      setProfileData({
        name: profileRes.data.name || '',
        age: profileRes.data.age || '',
        bio: profileRes.data.bio || '',
        skills: profileRes.data.skills || '',
        portfolio_link: profileRes.data.portfolio_link || '',
        github_url: profileRes.data.github_url || '',
        project_idea: profileRes.data.project_idea || '',
        equity_offering: profileRes.data.equity_offering || '',
        payment_available: profileRes.data.payment_available || false,
        timeline: profileRes.data.timeline || '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateProfile(userId, profileData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateSettings({
        country: accountData.country,
        school: accountData.school,
      });
      setMessage('Account settings updated successfully!');
    } catch (error) {
      setMessage('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');

    if (passwordData.new_password !== passwordData.confirm_password) {
      setMessage('New passwords do not match');
      return;
    }

    setSaving(true);

    try {
      await updateSettings({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      setMessage('Password changed successfully!');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteAccount();
      logout();
      navigate('/login');
    } catch (error) {
      setMessage('Failed to delete account');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="page-container">
        <h1 className="page-title">Settings</h1>

        {message && (
          <div className={`settings-message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="settings-container">
          {/* Tabs */}
          <div className="settings-tabs">
            <button
              className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button
              className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="settings-content">
              <form onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-input"
                    value={profileData.age}
                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-textarea"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  />
                </div>

                {accountData.user_type === 'technical' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Skills (comma-separated)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileData.skills}
                        onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Portfolio Link</label>
                      <input
                        type="url"
                        className="form-input"
                        value={profileData.portfolio_link}
                        onChange={(e) => setProfileData({ ...profileData, portfolio_link: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={profileData.github_url}
                        onChange={(e) => setProfileData({ ...profileData, github_url: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="btn btn-primary btn-large" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="settings-content">
              <form onSubmit={handleAccountUpdate}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={accountData.email}
                    disabled
                  />
                  <small className="form-help">Email cannot be changed</small>
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-input"
                    value={accountData.country}
                    onChange={(e) => setAccountData({ ...accountData, country: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">School / University</label>
                  <input
                    type="text"
                    className="form-input"
                    value={accountData.school}
                    onChange={(e) => setAccountData({ ...accountData, school: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subscription</label>
                  <div className="subscription-badge">
                    {accountData.subscription_tier === 'premium' ? '⭐ Premium' : '🆓 Free'}
                  </div>
                  {accountData.subscription_tier === 'free' && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate('/premium')}
                    >
                      Upgrade to Premium
                    </button>
                  )}
                </div>

                <button type="submit" className="btn btn-primary btn-large" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <button className="btn btn-danger" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="settings-content">
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordData.confirm_password}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large" disabled={saving}>
                  {saving ? 'Changing...' : 'Change Password'}
                </button>
              </form>

              <div className="logout-section">
                <button className="btn btn-secondary btn-large" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
