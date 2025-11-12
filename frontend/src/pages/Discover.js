import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { getDiscoverCandidates, recordSwipe } from '../utils/api';
import SwipeCard from '../components/SwipeCard';
import MatchPopup from '../components/MatchPopup';
import './Discover.css';

function Discover() {
  const [candidates, setCandidates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swipesRemaining, setSwipesRemaining] = useState(20);
  const [matchedUser, setMatchedUser] = useState(null);
  const [showMatchPopup, setShowMatchPopup] = useState(false);

  const [{ x, y, rotate }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
  }));

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await getDiscoverCandidates();
      setCandidates(response.data.candidates);
      setSwipesRemaining(response.data.swipes_remaining);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction) => {
    if (currentIndex >= candidates.length) return;

    const currentUser = candidates[currentIndex];
    const swipeType = direction === 'right' ? 'like' : 'dislike';

    // Animate card off screen
    const xMovement = direction === 'right' ? 1000 : -1000;
    api.start({
      x: xMovement,
      rotate: direction === 'right' ? 45 : -45,
      config: { tension: 200, friction: 20 },
    });

    try {
      const response = await recordSwipe({
        swiped_id: currentUser.user_id,
        swipe_type: swipeType,
      });

      setSwipesRemaining(response.data.swipes_remaining);

      // Check if it's a match
      if (response.data.is_match) {
        setMatchedUser(currentUser);
        setShowMatchPopup(true);
      }

      // Move to next card after animation
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        api.start({ x: 0, y: 0, rotate: 0, immediate: true });
      }, 300);
    } catch (error) {
      console.error('Swipe failed:', error);
      // Reset animation on error
      api.start({ x: 0, y: 0, rotate: 0 });
    }
  };

  const bind = useDrag(
    ({ movement: [mx, my], down, velocity }) => {
      const trigger = velocity > 0.2;

      if (!down && trigger) {
        // User released with enough velocity
        if (Math.abs(mx) > 100) {
          handleSwipe(mx > 0 ? 'right' : 'left');
        } else {
          // Snap back
          api.start({ x: 0, y: 0, rotate: 0 });
        }
      } else if (down) {
        // Update position while dragging
        api.start({
          x: mx,
          y: my,
          rotate: mx / 20,
          immediate: true,
        });

        // Show overlay based on drag direction
        const card = document.querySelector('.swipe-card');
        if (card) {
          const leftOverlay = card.querySelector('.swipe-overlay-left');
          const rightOverlay = card.querySelector('.swipe-overlay-right');

          if (mx < -50) {
            leftOverlay.style.opacity = Math.min(Math.abs(mx) / 200, 1);
            rightOverlay.style.opacity = 0;
          } else if (mx > 50) {
            rightOverlay.style.opacity = Math.min(mx / 200, 1);
            leftOverlay.style.opacity = 0;
          } else {
            leftOverlay.style.opacity = 0;
            rightOverlay.style.opacity = 0;
          }
        }
      }
    },
    { axis: 'x' }
  );

  if (loading) {
    return (
      <div className="discover-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div className="discover-page">
      <div className="discover-container">
        {/* Header */}
        <div className="discover-header">
          <h1 className="discover-title">Discover</h1>
          <div className="swipes-counter">
            <span className="swipes-icon">🔥</span>
            <span className="swipes-text">{swipesRemaining} swipes remaining</span>
          </div>
        </div>

        {/* Card Stack */}
        <div className="card-stack">
          {currentIndex >= candidates.length ? (
            <div className="no-more-cards">
              <div className="no-cards-icon">😔</div>
              <h2>No More Profiles</h2>
              <p>Check back later for more matches!</p>
              <button className="btn btn-primary" onClick={fetchCandidates}>
                Refresh
              </button>
            </div>
          ) : (
            <>
              {/* Show next card behind current */}
              {currentIndex + 1 < candidates.length && (
                <div className="card-behind">
                  <SwipeCard user={candidates[currentIndex + 1]} />
                </div>
              )}

              {/* Current card */}
              <div {...bind()} style={{ touchAction: 'none' }}>
                <SwipeCard
                  user={currentCandidate}
                  style={{ x, y, rotate }}
                />
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {currentCandidate && (
          <div className="swipe-actions">
            <button
              className="swipe-btn swipe-btn-dislike"
              onClick={() => handleSwipe('left')}
              disabled={swipesRemaining <= 0}
            >
              <span className="swipe-btn-icon">✕</span>
            </button>
            <button
              className="swipe-btn swipe-btn-like"
              onClick={() => handleSwipe('right')}
              disabled={swipesRemaining <= 0}
            >
              <span className="swipe-btn-icon">❤️</span>
            </button>
          </div>
        )}

        {swipesRemaining <= 0 && (
          <div className="out-of-swipes">
            <p>Out of swipes! Come back tomorrow or <a href="/premium">upgrade to premium</a> for unlimited swipes.</p>
          </div>
        )}
      </div>

      {/* Match Popup */}
      {showMatchPopup && matchedUser && (
        <MatchPopup
          user={matchedUser}
          onClose={() => setShowMatchPopup(false)}
        />
      )}
    </div>
  );
}

export default Discover;
