// ==========================================
// COMPCONNECT - MAIN JAVASCRIPT
// Complete dating app functionality
// ==========================================

// ===== MOCK USER DATA =====
const mockUsers = [
  // Technical Users
  {
    user_id: 1,
    email: 'alex.chen@stanford.edu',
    password: 'password123',
    user_type: 'technical',
    country: 'USA',
    school: 'Stanford University',
    name: 'Alex Chen',
    age: 21,
    bio: 'Full-stack dev passionate about building scalable systems. Love React & Node.js. Always down to turn great ideas into reality.',
    skills: 'React, Node.js, Python, AWS, MongoDB',
    portfolio_link: 'https://alexchen.dev',
    github_url: 'https://github.com/alexchen',
    rating: 4.8,
    rating_count: 12,
    images: ['https://i.pravatar.cc/400?img=12', 'https://i.pravatar.cc/400?img=13', 'https://i.pravatar.cc/400?img=33']
  },
  {
    user_id: 2,
    email: 'sarah.kim@mit.edu',
    password: 'password123',
    user_type: 'technical',
    country: 'USA',
    school: 'MIT',
    name: 'Sarah Kim',
    age: 22,
    bio: 'AI/ML enthusiast with experience in computer vision. Built models for 3 startups. Looking for meaningful projects to work on!',
    skills: 'Python, TensorFlow, PyTorch, Machine Learning',
    portfolio_link: 'https://sarahkim.io',
    github_url: 'https://github.com/sarahkim',
    rating: 4.9,
    rating_count: 18,
    images: ['https://i.pravatar.cc/400?img=5', 'https://i.pravatar.cc/400?img=20', 'https://i.pravatar.cc/400?img=45']
  },
  {
    user_id: 3,
    email: 'marcus.johnson@berkeley.edu',
    password: 'password123',
    user_type: 'technical',
    country: 'USA',
    school: 'UC Berkeley',
    name: 'Marcus Johnson',
    age: 23,
    bio: 'Mobile dev who loves crafting beautiful UIs. iOS & Android expert. Previously interned at Meta. Let\'s build something cool!',
    skills: 'Swift, Kotlin, React Native, iOS, Android',
    portfolio_link: 'https://marcusj.dev',
    github_url: 'https://github.com/mjohnson',
    rating: 4.7,
    rating_count: 15,
    images: ['https://i.pravatar.cc/400?img=14', 'https://i.pravatar.cc/400?img=51', 'https://i.pravatar.cc/400?img=52']
  },
  {
    user_id: 4,
    email: 'priya.patel@cmu.edu',
    password: 'password123',
    user_type: 'technical',
    country: 'USA',
    school: 'Carnegie Mellon',
    name: 'Priya Patel',
    age: 20,
    bio: 'Backend wizard specializing in system design and databases. Love solving complex technical challenges. Open to equity-based projects.',
    skills: 'Java, Spring Boot, PostgreSQL, Docker, Kubernetes',
    portfolio_link: 'https://priyapatel.tech',
    github_url: 'https://github.com/ppatel',
    rating: 5.0,
    rating_count: 20,
    images: ['https://i.pravatar.cc/400?img=9', 'https://i.pravatar.cc/400?img=29', 'https://i.pravatar.cc/400?img=38']
  },
  {
    user_id: 5,
    email: 'david.lee@harvard.edu',
    password: 'password123',
    user_type: 'technical',
    country: 'USA',
    school: 'Harvard University',
    name: 'David Lee',
    age: 22,
    bio: 'Blockchain developer and Web3 enthusiast. Built 2 DeFi apps. Looking for innovative crypto projects or traditional startups.',
    skills: 'Solidity, Ethereum, Web3.js, JavaScript',
    portfolio_link: 'https://davidlee.xyz',
    github_url: 'https://github.com/dlee',
    rating: 4.6,
    rating_count: 10,
    images: ['https://i.pravatar.cc/400?img=15', 'https://i.pravatar.cc/400?img=59', 'https://i.pravatar.cc/400?img=60']
  },

  // Non-Technical Users
  {
    user_id: 11,
    email: 'olivia.brown@stanford.edu',
    password: 'password123',
    user_type: 'non-technical',
    country: 'USA',
    school: 'Stanford University',
    name: 'Olivia Brown',
    age: 22,
    bio: 'Marketing major with a vision for disrupting social commerce. Love creating viral content. Looking for a tech co-founder!',
    project_idea: 'AI-powered social shopping platform where influencers can create virtual storefronts. Think Instagram meets Amazon with personalized recommendations.',
    equity_offering: 15,
    payment_available: true,
    timeline: '3-6 months',
    rating: 4.5,
    rating_count: 8,
    images: ['https://i.pravatar.cc/400?img=1', 'https://i.pravatar.cc/400?img=21', 'https://i.pravatar.cc/400?img=48']
  },
  {
    user_id: 12,
    email: 'michael.davis@yale.edu',
    password: 'password123',
    user_type: 'non-technical',
    country: 'USA',
    school: 'Yale University',
    name: 'Michael Davis',
    age: 23,
    bio: 'Economics student passionate about fintech. Researched payment systems for 2 years. Have industry connections and potential first customers.',
    project_idea: 'Micro-investing app for college students - automatically invest spare change from purchases. Gamified to make investing fun and educational.',
    equity_offering: 20,
    payment_available: true,
    timeline: '4-6 months',
    rating: 4.7,
    rating_count: 11,
    images: ['https://i.pravatar.cc/400?img=11', 'https://i.pravatar.cc/400?img=34', 'https://i.pravatar.cc/400?img=61']
  },
  {
    user_id: 13,
    email: 'sophia.anderson@duke.edu',
    password: 'password123',
    user_type: 'non-technical',
    country: 'USA',
    school: 'Duke University',
    name: 'Sophia Anderson',
    age: 21,
    bio: 'Pre-med student who experienced healthcare inefficiencies firsthand. Want to build tech that helps patients navigate the system better.',
    project_idea: 'Healthcare navigation app - helps patients find the right doctor, compare prices, and manage appointments. Uber for healthcare coordination.',
    equity_offering: 12,
    payment_available: false,
    timeline: '6-9 months',
    rating: 4.3,
    rating_count: 6,
    images: ['https://i.pravatar.cc/400?img=2', 'https://i.pravatar.cc/400?img=26', 'https://i.pravatar.cc/400?img=43']
  },
  {
    user_id: 14,
    email: 'ethan.white@nyu.edu',
    password: 'password123',
    user_type: 'non-technical',
    country: 'USA',
    school: 'New York University',
    name: 'Ethan White',
    age: 20,
    bio: 'Film student with entrepreneurial spirit. Created viral TikTok content (500K followers). Want to build the future of creator tools.',
    project_idea: 'AI video editing assistant for content creators - automatically cuts, edits, and suggests improvements. Save creators hours of editing time.',
    equity_offering: 18,
    payment_available: true,
    timeline: '3-5 months',
    rating: 4.8,
    rating_count: 14,
    images: ['https://i.pravatar.cc/400?img=8', 'https://i.pravatar.cc/400?img=30', 'https://i.pravatar.cc/400?img=62']
  },
  {
    user_id: 15,
    email: 'ava.thomas@northwestern.edu',
    password: 'password123',
    user_type: 'non-technical',
    country: 'USA',
    school: 'Northwestern University',
    name: 'Ava Thomas',
    age: 22,
    bio: 'Psychology major passionate about mental health. Ran support groups for 3 years. Want to make therapy more accessible and affordable.',
    project_idea: 'Mental wellness app with AI chatbot for immediate support + matching with licensed therapists. Subscription model at 1/3 the cost.',
    equity_offering: 10,
    payment_available: false,
    timeline: '6-12 months',
    rating: 4.9,
    rating_count: 17,
    images: ['https://i.pravatar.cc/400?img=3', 'https://i.pravatar.cc/400?img=22', 'https://i.pravatar.cc/400?img=44']
  },
  {
    user_id: 16,
    email: 'noah.jackson@brown.edu',
    password: 'password123',
    user_type: 'non-technical',
    country: 'USA',
    school: 'Brown University',
    name: 'Noah Jackson',
    age: 24,
    bio: 'MBA student with 2 years in consulting. Identified huge market gap in B2B SaaS for restaurants. Have LOIs from 5 restaurants.',
    project_idea: 'Restaurant management platform - inventory tracking, staff scheduling, POS integration. All-in-one solution for small restaurant chains.',
    equity_offering: 25,
    payment_available: true,
    timeline: '4-8 months',
    rating: 4.6,
    rating_count: 9,
    images: ['https://i.pravatar.cc/400?img=7', 'https://i.pravatar.cc/400?img=31', 'https://i.pravatar.cc/400?img=63']
  }
];

// ===== GLOBAL STATE =====
let currentUser = null;
let selectedUserType = null;
let currentSetupStep = 1;
let currentProfilePic = 'https://i.pravatar.cc/400?img=1';
let currentCandidateIndex = 0;
let candidates = [];
let currentChatUserId = null;
let selectedRating = 0;

// ===== HELPER FUNCTIONS =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initializeStorage() {
  if (!getFromStorage('appState')) {
    saveToStorage('appState', {
      swipes: [],
      matches: [],
      messages: [],
      ratings: [],
      swipesRemaining: 20,
      lastSwipeReset: new Date().toISOString()
    });
  }
}

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function showTab(tabName) {
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === tabName) {
      link.classList.add('active');
    }
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabName + 'Tab').classList.add('active');

  // Load content based on tab
  if (tabName === 'discover') {
    loadDiscoverCandidates();
  } else if (tabName === 'matches') {
    loadMatches();
  } else if (tabName === 'settings') {
    loadSettings();
  }
}

// ===== AUTHENTICATION =====
function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showToast('Please enter email and password');
    return;
  }

  const user = mockUsers.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem('userId', user.user_id);
    localStorage.setItem('userType', user.user_type);
    showPage('mainApp');
    loadDiscoverCandidates();
    showToast('Welcome back, ' + user.name + '!');
  } else {
    showToast('Invalid email or password');
  }
}

function quickLogin(type) {
  if (type === 'technical') {
    currentUser = mockUsers[0]; // Alex Chen
  } else {
    currentUser = mockUsers[5]; // Olivia Brown
  }

  localStorage.setItem('userId', currentUser.user_id);
  localStorage.setItem('userType', currentUser.user_type);
  showPage('mainApp');
  loadDiscoverCandidates();
  showToast('Logged in as ' + currentUser.name);
}

function showRegister() {
  showPage('registerPage');
}

function showLogin() {
  showPage('loginPage');
}

function selectUserType(type) {
  selectedUserType = type;
  document.querySelectorAll('.user-type-card').forEach(card => card.classList.remove('selected'));
  event.target.closest('.user-type-card').classList.add('selected');
}

function registerUser() {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const country = document.getElementById('regCountry').value;
  const school = document.getElementById('regSchool').value;

  if (!email || !password || !confirmPassword || !country || !school) {
    showToast('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    showToast('Passwords do not match');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters');
    return;
  }

  if (!selectedUserType) {
    showToast('Please select user type');
    return;
  }

  // Check if email already exists
  if (mockUsers.find(u => u.email === email)) {
    showToast('Email already registered');
    return;
  }

  // Create new user
  const newUser = {
    user_id: mockUsers.length + 1,
    email,
    password,
    user_type: selectedUserType,
    country,
    school,
    name: '',
    age: null,
    bio: '',
    images: [currentProfilePic],
    rating: 0,
    rating_count: 0
  };

  mockUsers.push(newUser);
  currentUser = newUser;
  localStorage.setItem('userId', newUser.user_id);
  localStorage.setItem('userType', newUser.user_type);

  showPage('profileSetupPage');
  updateProgress();
}

// ===== PROFILE SETUP =====
function updateProgress() {
  const progressBar = document.getElementById('progressBar');
  const currentStepSpan = document.getElementById('currentStep');
  const percentage = (currentSetupStep / 3) * 100;
  progressBar.style.width = percentage + '%';
  currentStepSpan.textContent = currentSetupStep;
}

function nextStep() {
  if (currentSetupStep === 1) {
    const name = document.getElementById('setupName').value;
    const age = document.getElementById('setupAge').value;
    const bio = document.getElementById('setupBio').value;

    if (!name || !age || !bio) {
      showToast('Please fill in all fields');
      return;
    }

    currentUser.name = name;
    currentUser.age = parseInt(age);
    currentUser.bio = bio;
  }

  if (currentSetupStep < 3) {
    document.getElementById('setupStep' + currentSetupStep).classList.remove('active');
    currentSetupStep++;
    document.getElementById('setupStep' + currentSetupStep).classList.add('active');
    updateProgress();

    // Show appropriate fields for step 3
    if (currentSetupStep === 3) {
      if (currentUser.user_type === 'technical') {
        document.getElementById('technicalFields').style.display = 'block';
        document.getElementById('nonTechnicalFields').style.display = 'none';
        document.getElementById('step3Title').textContent = 'Your Technical Profile';
      } else {
        document.getElementById('technicalFields').style.display = 'none';
        document.getElementById('nonTechnicalFields').style.display = 'block';
        document.getElementById('step3Title').textContent = 'Your Project Idea';
      }
    }
  }
}

function prevStep() {
  if (currentSetupStep > 1) {
    document.getElementById('setupStep' + currentSetupStep).classList.remove('active');
    currentSetupStep--;
    document.getElementById('setupStep' + currentSetupStep).classList.add('active');
    updateProgress();
  }
}

function changeProfilePic() {
  const randomNum = Math.floor(Math.random() * 70) + 1;
  currentProfilePic = 'https://i.pravatar.cc/400?img=' + randomNum;
  document.getElementById('profilePicPreview').src = currentProfilePic;
}

function completeSetup() {
  if (currentUser.user_type === 'technical') {
    const skills = document.getElementById('setupSkills').value;
    const portfolio = document.getElementById('setupPortfolio').value;
    const github = document.getElementById('setupGithub').value;

    if (!skills) {
      showToast('Please enter your skills');
      return;
    }

    currentUser.skills = skills;
    currentUser.portfolio_link = portfolio;
    currentUser.github_url = github;
  } else {
    const projectIdea = document.getElementById('setupProjectIdea').value;
    const equity = document.getElementById('setupEquity').value;
    const timeline = document.getElementById('setupTimeline').value;
    const payment = document.getElementById('setupPayment').checked;

    if (!projectIdea || !equity || !timeline) {
      showToast('Please fill in all fields');
      return;
    }

    currentUser.project_idea = projectIdea;
    currentUser.equity_offering = parseInt(equity);
    currentUser.timeline = timeline;
    currentUser.payment_available = payment;
  }

  currentUser.images = [currentProfilePic];
  showToast('Profile created successfully!');
  showPage('mainApp');
  loadDiscoverCandidates();
}

// ===== DISCOVER/SWIPE FUNCTIONALITY =====
function loadDiscoverCandidates() {
  const appState = getFromStorage('appState');

  // Reset swipes if new day
  const lastReset = new Date(appState.lastSwipeReset);
  const now = new Date();
  if (now.getDate() !== lastReset.getDate()) {
    appState.swipesRemaining = 20;
    appState.lastSwipeReset = now.toISOString();
    saveToStorage('appState', appState);
  }

  // Update swipes counter
  document.getElementById('swipesRemaining').textContent = appState.swipesRemaining + ' swipes remaining';

  // Get opposite type users not yet swiped
  const oppositeType = currentUser.user_type === 'technical' ? 'non-technical' : 'technical';
  const swipedIds = appState.swipes.filter(s => s.swiper_id === currentUser.user_id).map(s => s.swiped_id);

  candidates = mockUsers.filter(u =>
    u.user_type === oppositeType &&
    u.user_id !== currentUser.user_id &&
    !swipedIds.includes(u.user_id)
  );

  currentCandidateIndex = 0;
  renderCurrentCard();
}

function renderCurrentCard() {
  const cardStack = document.getElementById('cardStack');
  const noMoreProfiles = document.getElementById('noMoreProfiles');

  if (currentCandidateIndex >= candidates.length) {
    cardStack.innerHTML = '';
    noMoreProfiles.style.display = 'block';
    return;
  }

  noMoreProfiles.style.display = 'none';
  const user = candidates[currentCandidateIndex];

  cardStack.innerHTML = `
    <div class="profile-card" id="currentCard">
      <div class="card-image-container">
        <img src="${user.images[0]}" alt="${user.name}" class="card-image" id="cardImage">
        <div class="image-indicator">
          ${user.images.map((_, i) => `<div class="image-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
        </div>
      </div>
      <div class="card-info">
        <div class="card-header">
          <div class="card-name-age">
            <span class="card-name">${user.name}</span>
            <span class="card-age">${user.age}</span>
          </div>
          ${user.rating_count > 0 ? `
            <div class="card-rating">
              ⭐ ${user.rating.toFixed(1)} (${user.rating_count})
            </div>
          ` : ''}
        </div>
        <div class="card-school">🎓 ${user.school}</div>
        <div class="card-bio">${user.bio}</div>
      </div>
    </div>
  `;
}

function swipe(direction) {
  const appState = getFromStorage('appState');

  if (appState.swipesRemaining <= 0) {
    showToast('Out of swipes! Come back tomorrow or upgrade to premium');
    return;
  }

  if (currentCandidateIndex >= candidates.length) return;

  const card = document.getElementById('currentCard');
  const swipeType = direction === 'like' ? 'like' : 'dislike';
  const swipedUser = candidates[currentCandidateIndex];

  // Add animation class
  card.classList.add(direction === 'like' ? 'swipe-right' : 'swipe-left');

  // Record swipe
  appState.swipesRemaining--;
  appState.swipes.push({
    swiper_id: currentUser.user_id,
    swiped_id: swipedUser.user_id,
    swipe_type: swipeType,
    timestamp: new Date().toISOString()
  });

  // Check for match
  if (swipeType === 'like') {
    const reciprocalSwipe = appState.swipes.find(s =>
      s.swiper_id === swipedUser.user_id &&
      s.swiped_id === currentUser.user_id &&
      s.swipe_type === 'like'
    );

    if (reciprocalSwipe) {
      // It's a match!
      appState.matches.push({
        match_id: appState.matches.length + 1,
        user1_id: Math.min(currentUser.user_id, swipedUser.user_id),
        user2_id: Math.max(currentUser.user_id, swipedUser.user_id),
        matched_at: new Date().toISOString(),
        status: 'active'
      });

      saveToStorage('appState', appState);
      showMatchPopup(swipedUser);
    }
  }

  saveToStorage('appState', appState);
  document.getElementById('swipesRemaining').textContent = appState.swipesRemaining + ' swipes remaining';

  // Move to next card
  setTimeout(() => {
    currentCandidateIndex++;
    renderCurrentCard();
  }, 500);
}

function resetApp() {
  // Reset all swipes for demo purposes
  const appState = getFromStorage('appState');
  appState.swipes = appState.swipes.filter(s => s.swiper_id !== currentUser.user_id);
  saveToStorage('appState', appState);
  loadDiscoverCandidates();
  showToast('Profiles refreshed!');
}

// ===== MATCH POPUP =====
function showMatchPopup(user) {
  document.getElementById('matchName').textContent = user.name;
  document.getElementById('matchAvatar').src = user.images[0];
  document.getElementById('matchPopup').classList.add('active');
}

function closeMatchPopup() {
  document.getElementById('matchPopup').classList.remove('active');
}

function openChatWithMatch() {
  closeMatchPopup();
  const matchedUserId = document.getElementById('matchAvatar').src.includes('img=')
    ? candidates[currentCandidateIndex - 1].user_id
    : null;

  if (matchedUserId) {
    openChat(matchedUserId);
  }
  showTab('matches');
}

// ===== MATCHES PAGE =====
function loadMatches() {
  const appState = getFromStorage('appState');
  const matchesGrid = document.getElementById('matchesGrid');
  const noMatchesYet = document.getElementById('noMatchesYet');

  const userMatches = appState.matches.filter(m =>
    (m.user1_id === currentUser.user_id || m.user2_id === currentUser.user_id) &&
    m.status === 'active'
  );

  if (userMatches.length === 0) {
    matchesGrid.style.display = 'none';
    noMatchesYet.style.display = 'block';
    return;
  }

  matchesGrid.style.display = 'grid';
  noMatchesYet.style.display = 'none';

  matchesGrid.innerHTML = userMatches.map(match => {
    const matchedUserId = match.user1_id === currentUser.user_id ? match.user2_id : match.user1_id;
    const matchedUser = mockUsers.find(u => u.user_id === matchedUserId);

    return `
      <div class="match-card" onclick="openChat(${matchedUserId})">
        <img src="${matchedUser.images[0]}" alt="${matchedUser.name}" class="match-card-image">
        <div class="match-card-info">
          <div class="match-card-name">${matchedUser.name}, ${matchedUser.age}</div>
          <div class="match-card-bio">${matchedUser.bio}</div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== CHAT FUNCTIONALITY =====
function openChat(userId) {
  currentChatUserId = userId;
  const chatUser = mockUsers.find(u => u.user_id === userId);

  document.getElementById('selectMatchPrompt').style.display = 'none';
  document.getElementById('chatInterface').style.display = 'block';

  document.getElementById('chatAvatar').src = chatUser.images[0];
  document.getElementById('chatUserName').textContent = chatUser.name;

  loadMessages();
  showTab('chat');
}

function loadMessages() {
  const appState = getFromStorage('appState');
  const messagesContainer = document.getElementById('messagesContainer');

  // Find match_id
  const match = appState.matches.find(m =>
    (m.user1_id === currentUser.user_id && m.user2_id === currentChatUserId) ||
    (m.user2_id === currentUser.user_id && m.user1_id === currentChatUserId)
  );

  if (!match) return;

  const messages = appState.messages.filter(m => m.match_id === match.match_id);

  if (messages.length === 0) {
    messagesContainer.innerHTML = `
      <div style="text-align: center; color: #9CA3AF; padding: 40px;">
        <p>No messages yet. Say hi! 👋</p>
      </div>
    `;
    return;
  }

  messagesContainer.innerHTML = messages.map(msg => {
    const isSent = msg.sender_id === currentUser.user_id;
    const time = new Date(msg.sent_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return `
      <div class="message ${isSent ? 'sent' : 'received'}">
        <div class="message-bubble">
          <div class="message-text">${msg.message_text}</div>
          <div class="message-time">${time}</div>
        </div>
      </div>
    `;
  }).join('');

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const messageText = input.value.trim();

  if (!messageText) return;

  const appState = getFromStorage('appState');

  // Find match_id
  const match = appState.matches.find(m =>
    (m.user1_id === currentUser.user_id && m.user2_id === currentChatUserId) ||
    (m.user2_id === currentUser.user_id && m.user1_id === currentChatUserId)
  );

  if (!match) return;

  // Add message
  appState.messages.push({
    id: appState.messages.length + 1,
    match_id: match.match_id,
    sender_id: currentUser.user_id,
    message_text: messageText,
    sent_at: new Date().toISOString(),
    read_status: false
  });

  saveToStorage('appState', appState);
  input.value = '';
  loadMessages();
}

// ===== RATING SYSTEM =====
function showRatingModal() {
  document.getElementById('ratingUserName').textContent = mockUsers.find(u => u.user_id === currentChatUserId).name;
  document.getElementById('ratingModal').classList.add('active');
  selectedRating = 0;
  document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
}

function closeRatingModal() {
  document.getElementById('ratingModal').classList.remove('active');
}

function setRating(rating) {
  selectedRating = rating;
  document.querySelectorAll('.star').forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function submitRating() {
  if (selectedRating === 0) {
    showToast('Please select a rating');
    return;
  }

  const reviewText = document.getElementById('reviewText').value;
  const appState = getFromStorage('appState');

  // Remove existing rating if any
  appState.ratings = appState.ratings.filter(r =>
    !(r.rater_id === currentUser.user_id && r.rated_id === currentChatUserId)
  );

  // Add new rating
  appState.ratings.push({
    rater_id: currentUser.user_id,
    rated_id: currentChatUserId,
    rating: selectedRating,
    review_text: reviewText,
    created_at: new Date().toISOString()
  });

  // Update user's average rating
  const userRatings = appState.ratings.filter(r => r.rated_id === currentChatUserId);
  const avgRating = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;

  const ratedUser = mockUsers.find(u => u.user_id === currentChatUserId);
  if (ratedUser) {
    ratedUser.rating = avgRating;
    ratedUser.rating_count = userRatings.length;
  }

  saveToStorage('appState', appState);
  closeRatingModal();
  showToast('Rating submitted successfully!');
}

// ===== SETTINGS =====
function loadSettings() {
  document.getElementById('settingsName').value = currentUser.name || '';
  document.getElementById('settingsBio').value = currentUser.bio || '';
  document.getElementById('settingsEmail').value = currentUser.email || '';

  const isPremium = getFromStorage('appState').swipesRemaining > 50;
  document.getElementById('subscriptionStatus').textContent = isPremium ? 'Premium' : 'Free';
  if (isPremium) {
    document.getElementById('subscriptionStatus').style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
    document.getElementById('subscriptionStatus').style.color = 'white';
  }
}

function saveSettings() {
  const name = document.getElementById('settingsName').value;
  const bio = document.getElementById('settingsBio').value;

  if (!name || !bio) {
    showToast('Please fill in all fields');
    return;
  }

  currentUser.name = name;
  currentUser.bio = bio;

  // Update in mockUsers array
  const userIndex = mockUsers.findIndex(u => u.user_id === currentUser.user_id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = currentUser;
  }

  showToast('Settings saved successfully!');
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    currentUser = null;
    showPage('loginPage');
    showToast('Logged out successfully');
  }
}

function deleteAccount() {
  if (confirm('Are you sure you want to delete your account? This cannot be undone!')) {
    localStorage.clear();
    currentUser = null;
    showPage('loginPage');
    showToast('Account deleted');
  }
}

// ===== PREMIUM =====
function upgradeToPremium() {
  const appState = getFromStorage('appState');
  appState.swipesRemaining = 999;
  saveToStorage('appState', appState);

  showToast('Upgraded to Premium! Enjoy unlimited swipes! 🎉');
  document.getElementById('subscriptionStatus').textContent = 'Premium';
  document.getElementById('subscriptionStatus').style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
  document.getElementById('subscriptionStatus').style.color = 'white';

  loadDiscoverCandidates();
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeStorage();

  // Check if user is already logged in
  const userId = localStorage.getItem('userId');
  if (userId) {
    currentUser = mockUsers.find(u => u.user_id === parseInt(userId));
    if (currentUser) {
      showPage('mainApp');
      loadDiscoverCandidates();
    }
  }
});
