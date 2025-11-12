import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  // Don't show navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/profile-setup') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to={authenticated ? "/discover" : "/"} className="navbar-logo">
          <span>💡</span>
          <span>CompConnect</span>
        </Link>

        {authenticated && (
          <div className="navbar-menu">
            <Link
              to="/discover"
              className={`navbar-link ${location.pathname === '/discover' ? 'active' : ''}`}
            >
              Discover
            </Link>
            <Link
              to="/matches"
              className={`navbar-link ${location.pathname === '/matches' || location.pathname.startsWith('/chat') ? 'active' : ''}`}
            >
              Matches
            </Link>
            <Link
              to="/premium"
              className={`navbar-link ${location.pathname === '/premium' ? 'active' : ''}`}
            >
              Premium
            </Link>
            <Link
              to="/settings"
              className={`navbar-link ${location.pathname === '/settings' ? 'active' : ''}`}
            >
              Settings
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
