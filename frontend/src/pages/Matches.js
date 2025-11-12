import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatches } from '../utils/api';
import './Matches.css';

function Matches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await getMatches();
      setMatches(response.data.matches);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchClick = (match) => {
    navigate(`/chat/${match.match_id}`, { state: { match } });
  };

  if (loading) {
    return (
      <div className="matches-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="matches-page">
      <div className="page-container">
        <h1 className="page-title">Your Matches</h1>

        {matches.length === 0 ? (
          <div className="no-matches">
            <div className="no-matches-icon">💔</div>
            <h2>No matches yet</h2>
            <p>Keep swiping to find your perfect project partner!</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/discover')}
            >
              Start Swiping
            </button>
          </div>
        ) : (
          <div className="matches-grid">
            {matches.map((match) => (
              <div
                key={match.match_id}
                className="match-card"
                onClick={() => handleMatchClick(match)}
              >
                <div className="match-card-image-container">
                  <img
                    src={match.profile_picture_url}
                    alt={match.name}
                    className="match-card-image"
                  />
                </div>
                <div className="match-card-info">
                  <h3 className="match-card-name">{match.name}, {match.age}</h3>
                  <p className="match-card-bio">{match.bio?.substring(0, 60)}...</p>
                  <div className="match-card-date">
                    Matched {new Date(match.matched_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="match-card-action">
                  <button className="chat-button">💬 Chat</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Matches;
