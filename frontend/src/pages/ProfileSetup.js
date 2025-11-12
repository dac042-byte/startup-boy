import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, uploadImage } from '../utils/api';
import { getUserId, getUserType } from '../utils/auth';
import './ProfileSetup.css';

function ProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userType = getUserType();

  const [formData, setFormData] = useState({
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
    profile_picture_url: 'https://i.pravatar.cc/400?img=' + Math.floor(Math.random() * 70),
    images: []
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.age || !formData.bio) {
        setError('Please fill in all fields');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const userId = getUserId();
      await updateProfile(userId, formData);

      // Upload images (if any were added)
      for (let i = 0; i < formData.images.length; i++) {
        await uploadImage({
          image_url: formData.images[i],
          order_number: i
        });
      }

      navigate('/discover');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const addPlaceholderImage = () => {
    const randomImg = `https://i.pravatar.cc/400?img=${Math.floor(Math.random() * 70)}`;
    setFormData({
      ...formData,
      images: [...formData.images, randomImg]
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="profile-setup-page">
      <div className="profile-setup-container">
        <div className="profile-setup-header">
          <h1 className="profile-setup-title">Create Your Profile</h1>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">Step {step} of 3</p>
        </div>

        {error && <div className="form-error">{error}</div>}

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="profile-step">
            <h2 className="step-title">Basic Information</h2>

            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                className="form-input"
                placeholder="Enter your age"
                min="18"
                max="100"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                name="bio"
                className="form-textarea"
                placeholder="Tell people about yourself... What are you passionate about? What's your story?"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary btn-large"
              onClick={handleNext}
              style={{ width: '100%' }}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div className="profile-step">
            <h2 className="step-title">Add Photos</h2>
            <p className="step-description">Add up to 6 photos to make your profile stand out</p>

            <div className="profile-picture-section">
              <label className="form-label">Profile Picture</label>
              <div className="profile-picture-preview">
                <img src={formData.profile_picture_url} alt="Profile" />
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-small"
                onClick={() => setFormData({
                  ...formData,
                  profile_picture_url: `https://i.pravatar.cc/400?img=${Math.floor(Math.random() * 70)}`
                })}
              >
                Change Profile Picture
              </button>
            </div>

            <div className="additional-photos-section">
              <label className="form-label">Additional Photos ({formData.images.length}/6)</label>
              <div className="photos-grid">
                {formData.images.map((img, index) => (
                  <div key={index} className="photo-item">
                    <img src={img} alt={`Photo ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-photo-btn"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {formData.images.length < 6 && (
                  <button
                    type="button"
                    className="add-photo-btn"
                    onClick={addPlaceholderImage}
                  >
                    <span className="add-photo-icon">+</span>
                    <span>Add Photo</span>
                  </button>
                )}
              </div>
            </div>

            <div className="step-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Type-specific info */}
        {step === 3 && (
          <div className="profile-step">
            {userType === 'technical' ? (
              <>
                <h2 className="step-title">Technical Details</h2>

                <div className="form-group">
                  <label htmlFor="skills" className="form-label">Skills (comma-separated)</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    className="form-input"
                    placeholder="e.g., React, Python, Machine Learning, iOS"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="portfolio_link" className="form-label">Portfolio Link (optional)</label>
                  <input
                    type="url"
                    id="portfolio_link"
                    name="portfolio_link"
                    className="form-input"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio_link}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="github_url" className="form-label">GitHub URL (optional)</label>
                  <input
                    type="url"
                    id="github_url"
                    name="github_url"
                    className="form-input"
                    placeholder="https://github.com/yourusername"
                    value={formData.github_url}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="step-title">Your Project Idea</h2>

                <div className="form-group">
                  <label htmlFor="project_idea" className="form-label">Project Description</label>
                  <textarea
                    id="project_idea"
                    name="project_idea"
                    className="form-textarea"
                    placeholder="Describe your project idea in detail..."
                    value={formData.project_idea}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="equity_offering" className="form-label">Equity Offering (%)</label>
                  <input
                    type="number"
                    id="equity_offering"
                    name="equity_offering"
                    className="form-input"
                    placeholder="e.g., 15"
                    min="0"
                    max="100"
                    value={formData.equity_offering}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="timeline" className="form-label">Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="form-select"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select timeline</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="payment_available"
                      checked={formData.payment_available}
                      onChange={handleChange}
                    />
                    <span>I can offer payment in addition to equity</span>
                  </label>
                </div>
              </>
            )}

            <div className="step-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Complete Profile'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSetup;
