import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { upgradeToPremium } from '../utils/api';
import './Premium.css';

function Premium() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);

    // Mock payment process
    setTimeout(async () => {
      try {
        await upgradeToPremium();
        alert('🎉 Successfully upgraded to Premium!');
        navigate('/discover');
      } catch (error) {
        alert('Upgrade failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="premium-page">
      <div className="premium-container">
        <div className="premium-header">
          <h1 className="premium-title">Upgrade to Premium</h1>
          <p className="premium-subtitle">Unlock unlimited potential for finding your perfect project partner</p>
        </div>

        <div className="pricing-card">
          <div className="pricing-badge">Best Value</div>
          <h2 className="pricing-amount">$2<span className="pricing-period">/month</span></h2>
          <p className="pricing-description">Cancel anytime. No commitments.</p>
        </div>

        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">🔥</div>
            <div className="feature-content">
              <h3 className="feature-title">Unlimited Swipes</h3>
              <p className="feature-description">No daily limits. Swipe as much as you want!</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">👀</div>
            <div className="feature-content">
              <h3 className="feature-title">See Who Liked You</h3>
              <p className="feature-description">Know who's interested before you swipe</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">⭐</div>
            <div className="feature-content">
              <h3 className="feature-title">Premium Badge</h3>
              <p className="feature-description">Stand out with a premium badge on your profile</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <div className="feature-content">
              <h3 className="feature-title">Advanced Filters</h3>
              <p className="feature-description">Filter by skills, location, equity offering, and more</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🔔</div>
            <div className="feature-content">
              <h3 className="feature-title">Priority Support</h3>
              <p className="feature-description">Get help faster with priority customer support</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <div className="feature-content">
              <h3 className="feature-title">Profile Analytics</h3>
              <p className="feature-description">See detailed stats about your profile performance</p>
            </div>
          </div>
        </div>

        <div className="premium-cta">
          <button
            className="btn btn-primary btn-large premium-button"
            onClick={handleUpgrade}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Upgrade to Premium Now'}
          </button>
          <p className="premium-note">This is a demo. No real payment will be processed.</p>
        </div>

        <div className="premium-comparison">
          <h2 className="comparison-title">Compare Plans</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Daily Swipes</td>
                <td>20</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>See Who Liked You</td>
                <td>✕</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Advanced Filters</td>
                <td>✕</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Premium Badge</td>
                <td>✕</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Profile Analytics</td>
                <td>✕</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Priority Support</td>
                <td>✕</td>
                <td>✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="premium-footer">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
