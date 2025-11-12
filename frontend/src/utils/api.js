// FRONTEND-ONLY VERSION - No backend needed!
import { users, mockState } from './mockData';

// Helper to get/set data in localStorage
const getStorageData = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const setStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initialize storage
if (!localStorage.getItem('appState')) {
  setStorageData('appState', mockState);
}

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication
export const register = async (userData) => {
  await delay();

  // Check if user already exists
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    throw { response: { data: { error: 'Email already registered' } } };
  }

  // Create new user
  const newUser = {
    user_id: users.length + 1,
    ...userData,
    name: '',
    age: null,
    bio: '',
    images: []
  };

  users.push(newUser);

  return {
    data: {
      token: 'mock-token-' + newUser.user_id,
      user_id: newUser.user_id,
      user_type: newUser.user_type,
      message: 'User registered successfully'
    }
  };
};

export const login = async (credentials) => {
  await delay();

  const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

  if (!user) {
    throw { response: { data: { error: 'Invalid email or password' } } };
  }

  return {
    data: {
      token: 'mock-token-' + user.user_id,
      user_id: user.user_id,
      user_type: user.user_type,
      message: 'Login successful'
    }
  };
};

// Profile
export const getProfile = async (userId) => {
  await delay();

  const user = users.find(u => u.user_id === parseInt(userId));

  if (!user) {
    throw { response: { data: { error: 'User not found' } } };
  }

  return {
    data: {
      ...user,
      profile_picture_url: user.images[0]
    }
  };
};

export const updateProfile = async (userId, profileData) => {
  await delay();

  const userIndex = users.findIndex(u => u.user_id === parseInt(userId));

  if (userIndex === -1) {
    throw { response: { data: { error: 'User not found' } } };
  }

  users[userIndex] = { ...users[userIndex], ...profileData };

  return {
    data: { message: 'Profile updated successfully' }
  };
};

export const uploadImage = async (imageData) => {
  await delay();
  return {
    data: { message: 'Image uploaded successfully', image_url: imageData.image_url }
  };
};

// Discover/Swipe
export const getDiscoverCandidates = async () => {
  await delay();

  const currentUserId = parseInt(localStorage.getItem('userId'));
  const currentUser = users.find(u => u.user_id === currentUserId);

  if (!currentUser) {
    throw { response: { data: { error: 'User not found' } } };
  }

  const appState = getStorageData('appState', mockState);

  // Reset swipes if it's a new day
  const lastReset = new Date(appState.lastSwipeReset);
  const now = new Date();
  if (now.getDate() !== lastReset.getDate()) {
    appState.swipesRemaining = 20;
    appState.lastSwipeReset = now.toISOString();
    setStorageData('appState', appState);
  }

  // Get opposite type users that haven't been swiped yet
  const oppositeType = currentUser.user_type === 'technical' ? 'non-technical' : 'technical';
  const swipedIds = appState.swipes.filter(s => s.swiper_id === currentUserId).map(s => s.swiped_id);

  const candidates = users.filter(u =>
    u.user_type === oppositeType &&
    u.user_id !== currentUserId &&
    !swipedIds.includes(u.user_id)
  );

  return {
    data: {
      candidates: candidates.map(u => ({
        ...u,
        profile_picture_url: u.images[0]
      })),
      swipes_remaining: appState.swipesRemaining
    }
  };
};

export const recordSwipe = async (swipeData) => {
  await delay();

  const currentUserId = parseInt(localStorage.getItem('userId'));
  const appState = getStorageData('appState', mockState);

  // Decrease swipes
  if (appState.swipesRemaining > 0) {
    appState.swipesRemaining--;
  }

  // Record swipe
  appState.swipes.push({
    swiper_id: currentUserId,
    swiped_id: swipeData.swiped_id,
    swipe_type: swipeData.swipe_type,
    timestamp: new Date().toISOString()
  });

  // Check for match
  let isMatch = false;
  if (swipeData.swipe_type === 'like') {
    const reciprocalSwipe = appState.swipes.find(s =>
      s.swiper_id === swipeData.swiped_id &&
      s.swiped_id === currentUserId &&
      s.swipe_type === 'like'
    );

    if (reciprocalSwipe) {
      isMatch = true;
      // Create match
      appState.matches.push({
        match_id: appState.matches.length + 1,
        user1_id: Math.min(currentUserId, swipeData.swiped_id),
        user2_id: Math.max(currentUserId, swipeData.swiped_id),
        matched_at: new Date().toISOString(),
        status: 'active'
      });
    }
  }

  setStorageData('appState', appState);

  return {
    data: {
      message: 'Swipe recorded',
      is_match: isMatch,
      swipes_remaining: appState.swipesRemaining
    }
  };
};

// Matches
export const getMatches = async () => {
  await delay();

  const currentUserId = parseInt(localStorage.getItem('userId'));
  const appState = getStorageData('appState', mockState);

  const userMatches = appState.matches.filter(m =>
    (m.user1_id === currentUserId || m.user2_id === currentUserId) &&
    m.status === 'active'
  );

  const matchesWithDetails = userMatches.map(match => {
    const matchedUserId = match.user1_id === currentUserId ? match.user2_id : match.user1_id;
    const matchedUser = users.find(u => u.user_id === matchedUserId);

    return {
      match_id: match.match_id,
      user_id: matchedUserId,
      name: matchedUser.name,
      age: matchedUser.age,
      bio: matchedUser.bio,
      profile_picture_url: matchedUser.images[0],
      matched_at: match.matched_at
    };
  });

  return {
    data: { matches: matchesWithDetails }
  };
};

// Messages
export const getMessages = async (matchId) => {
  await delay();

  const appState = getStorageData('appState', mockState);

  const messages = appState.messages
    .filter(m => m.match_id === parseInt(matchId))
    .map(m => {
      const sender = users.find(u => u.user_id === m.sender_id);
      return {
        ...m,
        sender_name: sender ? sender.name : 'Unknown'
      };
    });

  return {
    data: { messages }
  };
};

export const sendMessage = async (matchId, messageData) => {
  await delay();

  const currentUserId = parseInt(localStorage.getItem('userId'));
  const appState = getStorageData('appState', mockState);

  const newMessage = {
    id: appState.messages.length + 1,
    match_id: parseInt(matchId),
    sender_id: currentUserId,
    message_text: messageData.message_text,
    sent_at: new Date().toISOString(),
    read_status: false
  };

  appState.messages.push(newMessage);
  setStorageData('appState', appState);

  return {
    data: {
      message: 'Message sent',
      message_id: newMessage.id
    }
  };
};

// Ratings
export const rateUser = async (userId, ratingData) => {
  await delay();

  const currentUserId = parseInt(localStorage.getItem('userId'));
  const appState = getStorageData('appState', mockState);

  // Remove existing rating if any
  appState.ratings = appState.ratings.filter(r =>
    !(r.rater_id === currentUserId && r.rated_id === userId)
  );

  // Add new rating
  appState.ratings.push({
    rater_id: currentUserId,
    rated_id: userId,
    rating: ratingData.rating,
    review_text: ratingData.review_text || '',
    created_at: new Date().toISOString()
  });

  // Update user's average rating
  const userRatings = appState.ratings.filter(r => r.rated_id === userId);
  const avgRating = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;

  const user = users.find(u => u.user_id === userId);
  if (user) {
    user.rating = avgRating;
    user.rating_count = userRatings.length;
  }

  setStorageData('appState', appState);

  return {
    data: {
      message: 'Rating submitted successfully',
      new_average: avgRating
    }
  };
};

// Settings
export const getSettings = async () => {
  await delay();

  const currentUserId = parseInt(localStorage.getItem('userId'));
  const user = users.find(u => u.user_id === currentUserId);

  if (!user) {
    throw { response: { data: { error: 'User not found' } } };
  }

  return {
    data: {
      email: user.email,
      name: user.name,
      user_type: user.user_type,
      country: user.country,
      school: user.school,
      subscription_tier: 'free'
    }
  };
};

export const updateSettings = async (settingsData) => {
  await delay();

  const currentUserId = parseInt(localStorage.getItem('userId'));
  const userIndex = users.findIndex(u => u.user_id === currentUserId);

  if (userIndex === -1) {
    throw { response: { data: { error: 'User not found' } } };
  }

  // Update user data
  if (settingsData.country) users[userIndex].country = settingsData.country;
  if (settingsData.school) users[userIndex].school = settingsData.school;

  return {
    data: { message: 'Settings updated successfully' }
  };
};

export const deleteAccount = async () => {
  await delay();

  localStorage.clear();

  return {
    data: { message: 'Account deleted successfully' }
  };
};

// Premium
export const upgradeToPremium = async () => {
  await delay();

  const appState = getStorageData('appState', mockState);
  appState.swipesRemaining = 999; // Unlimited swipes
  setStorageData('appState', appState);

  return {
    data: { message: 'Upgraded to premium successfully' }
  };
};

export default {
  register,
  login,
  getProfile,
  updateProfile,
  uploadImage,
  getDiscoverCandidates,
  recordSwipe,
  getMatches,
  getMessages,
  sendMessage,
  rateUser,
  getSettings,
  updateSettings,
  deleteAccount,
  upgradeToPremium
};
