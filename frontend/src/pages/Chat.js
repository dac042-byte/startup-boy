import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMessages, sendMessage, rateUser } from '../utils/api';
import { getUserId } from '../utils/auth';
import './Chat.css';

function Chat() {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const match = location.state?.match;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const messagesEndRef = useRef(null);
  const currentUserId = parseInt(getUserId());

  useEffect(() => {
    if (matchId) {
      fetchMessages();
      // Poll for new messages every 2 seconds
      const interval = setInterval(fetchMessages, 2000);
      return () => clearInterval(interval);
    }
  }, [matchId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await getMessages(matchId);
      setMessages(response.data.messages);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage(matchId, { message_text: newMessage });
      setNewMessage('');
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSubmitRating = async () => {
    if (rating === 0) return;

    try {
      await rateUser(match.user_id, {
        rating,
        review_text: reviewText,
      });
      setShowRating(false);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Failed to submit rating:', error);
      alert('Failed to submit rating');
    }
  };

  if (!match) {
    return (
      <div className="chat-page">
        <div className="page-container">
          <p>Match not found. <button onClick={() => navigate('/matches')}>Go back to matches</button></p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      {/* Chat Header */}
      <div className="chat-header">
        <button className="back-button" onClick={() => navigate('/matches')}>
          ← Back
        </button>
        <div className="chat-header-user">
          <img
            src={match.profile_picture_url}
            alt={match.name}
            className="chat-header-avatar"
          />
          <div>
            <h2 className="chat-header-name">{match.name}</h2>
            <p className="chat-header-status">Active now</p>
          </div>
        </div>
        <button className="rate-button" onClick={() => setShowRating(true)}>
          ⭐ Rate
        </button>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Say hi to {match.name}!</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message) => {
              const isOwnMessage = message.sender_id === currentUserId;
              return (
                <div
                  key={message.id}
                  className={`message ${isOwnMessage ? 'message-own' : 'message-other'}`}
                >
                  <div className="message-bubble">
                    <p className="message-text">{message.message_text}</p>
                    <span className="message-time">
                      {new Date(message.sent_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <form className="message-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder={`Message ${match.name}...`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-button" disabled={!newMessage.trim()}>
          Send
        </button>
      </form>

      {/* Rating Modal */}
      {showRating && (
        <div className="modal-overlay" onClick={() => setShowRating(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Rate {match.name}</h2>

            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-button ${rating >= star ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ⭐
                </button>
              ))}
            </div>

            <textarea
              className="form-textarea"
              placeholder="Leave a review (optional)"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleSubmitRating}
                disabled={rating === 0}
              >
                Submit Rating
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowRating(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
