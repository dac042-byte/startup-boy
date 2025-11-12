import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchPopup.css';

function MatchPopup({ user, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Create confetti effect
    createConfetti();
  }, []);

  const createConfetti = () => {
    const colors = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      document.querySelector('.match-popup-overlay').appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };

  const handleSendMessage = () => {
    navigate('/matches');
    onClose();
  };

  return (
    <div className="match-popup-overlay" onClick={onClose}>
      <div className="match-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="match-animation">
          <div className="match-hearts">❤️</div>
          <h1 className="match-title">It's a Match!</h1>
          <p className="match-subtitle">You and {user.name} liked each other</p>
        </div>

        <div className="match-user-cards">
          <div className="match-user-card">
            <img
              src={user.images?.[0] || user.profile_picture_url}
              alt={user.name}
              className="match-user-image"
            />
            <p className="match-user-name">{user.name}</p>
          </div>
        </div>

        <div className="match-actions">
          <button
            className="btn btn-primary btn-large"
            onClick={handleSendMessage}
            style={{ width: '100%' }}
          >
            Send Message
          </button>
          <button
            className="btn btn-secondary"
            onClick={onClose}
            style={{ width: '100%' }}
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchPopup;
