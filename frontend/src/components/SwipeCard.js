import React, { useState } from 'react';
import './SwipeCard.css';

function SwipeCard({ user, onSwipe, style }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const images = user.images && user.images.length > 0 ? user.images : [user.profile_picture_url];

  const handleImageClick = (e) => {
    const cardWidth = e.currentTarget.offsetWidth;
    const clickX = e.nativeEvent.offsetX;

    if (clickX > cardWidth / 2) {
      // Clicked on right side - next image
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      // Clicked on left side - previous image
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="swipe-card" style={style}>
      {/* Image section with carousel */}
      <div className="swipe-card-image-container" onClick={handleImageClick}>
        <img
          src={images[currentImageIndex]}
          alt={user.name}
          className="swipe-card-image"
        />

        {/* Image indicators */}
        {images.length > 1 && (
          <div className="image-indicators">
            {images.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        )}

        {/* Swipe overlays */}
        <div className="swipe-overlay swipe-overlay-left">
          <span>NOPE</span>
        </div>
        <div className="swipe-overlay swipe-overlay-right">
          <span>LIKE</span>
        </div>
      </div>

      {/* Card info */}
      <div className="swipe-card-info">
        <div className="swipe-card-header">
          <div>
            <h2 className="swipe-card-name">
              {user.name}, {user.age}
            </h2>
            {user.rating > 0 && (
              <div className="swipe-card-rating">
                ⭐ {user.rating.toFixed(1)} ({user.rating_count} reviews)
              </div>
            )}
          </div>
          <button
            className="info-button"
            onClick={() => setFlipped(!flipped)}
          >
            ℹ️
          </button>
        </div>

        {!flipped ? (
          <div className="swipe-card-bio">
            <p>{user.bio}</p>
          </div>
        ) : (
          <div className="swipe-card-details">
            {user.user_type === 'technical' ? (
              <>
                <div className="detail-section">
                  <h4>Skills</h4>
                  <div className="skills-tags">
                    {user.skills?.split(',').map((skill, index) => (
                      <span key={index} className="skill-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
                {user.portfolio_link && (
                  <div className="detail-section">
                    <h4>Portfolio</h4>
                    <a href={user.portfolio_link} target="_blank" rel="noopener noreferrer" className="detail-link">
                      View Portfolio
                    </a>
                  </div>
                )}
                {user.github_url && (
                  <div className="detail-section">
                    <h4>GitHub</h4>
                    <a href={user.github_url} target="_blank" rel="noopener noreferrer" className="detail-link">
                      View GitHub
                    </a>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="detail-section">
                  <h4>Project Idea</h4>
                  <p>{user.project_idea}</p>
                </div>
                <div className="detail-section">
                  <h4>Offering</h4>
                  <p>
                    <strong>{user.equity_offering}% equity</strong>
                    {user.payment_available && ' + Payment available'}
                  </p>
                </div>
                <div className="detail-section">
                  <h4>Timeline</h4>
                  <p>{user.timeline}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SwipeCard;
