# CompConnect - Project Partner Dating App

**CompConnect** is a Tinder-style dating app that connects non-technical idea makers with technical engineers for project collaborations. Built for college students to find their perfect project partners!

## 🚀 Features

- **Tinder-Style Swipe Interface** - Swipe right to like, left to pass
- **Smart Matching** - Technical users see non-technical users and vice versa
- **Real-time Chat** - Message your matches instantly
- **User Profiles** - Detailed profiles with skills, project ideas, and equity offerings
- **Rating System** - Rate your collaborators after working together
- **Daily Swipe Limits** - 20 swipes per day for free users
- **Premium Subscription** - Unlimited swipes and exclusive features
- **Multi-step Onboarding** - Easy profile creation process
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Privacy Policy** - Comprehensive and readable privacy policy

## 🛠️ Tech Stack

### Frontend
- **React** (v18.2.0) - UI framework
- **React Router** - Navigation and routing
- **React Spring** - Smooth animations
- **Axios** - HTTP requests
- **CSS3** - Styling with clearly labeled sections

### Backend
- **Python Flask** (v3.0.0) - Web framework
- **SQLite** - Local database (no setup required!)
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing
- **Flask-CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** and npm installed
- Terminal/Command prompt

### Step 1: Clone or Navigate to Project

```bash
cd /home/user/startup-boy
```

### Step 2: Set Up Backend

```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Initialize and populate the database with 22 realistic users
python seed_data.py
```

You should see: "Successfully seeded database with 11 technical users and 11 non-technical users!"

### Step 3: Set Up Frontend

```bash
# Navigate to frontend folder (from project root)
cd ../frontend

# Install Node dependencies
npm install
```

## 🎮 Running the Application

You need **TWO terminal windows** - one for backend, one for frontend.

### Terminal 1: Start Backend

```bash
cd backend
python app.py
```

You should see:
```
Starting CompConnect Backend...
Backend running on http://localhost:5000
 * Running on http://127.0.0.1:5000
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

## 🧪 Testing the App

### Quick Demo Login

The app comes pre-loaded with 22 realistic users! Use these demo accounts:

**Technical User:**
- Email: `alex.chen@stanford.edu`
- Password: `password123`

**Non-Technical User (Idea Maker):**
- Email: `olivia.brown@stanford.edu`
- Password: `password123`

### Testing Flow

1. **Login** - Use a demo account or register a new one
2. **Profile Setup** - Complete the 3-step onboarding (if new user)
3. **Discover** - Start swiping on potential partners
   - Swipe RIGHT (❤️) to like
   - Swipe LEFT (✕) to pass
   - Click INFO button (ℹ️) to see full details
   - Click through photos with left/right clicks
4. **Match!** - When both users like each other, you'll see a celebration popup
5. **Matches Page** - View all your matches
6. **Chat** - Click a match to start messaging
7. **Rate Users** - Click ⭐ Rate button in chat to rate your partner
8. **Settings** - Edit profile, change password, or delete account
9. **Premium** - Check out the premium features (mock payment)
10. **Privacy Policy** - Read the comprehensive privacy policy

### Pre-loaded Users

The database includes 22 realistic profiles:

**11 Technical Users:**
- Alex Chen (React, Node.js, Python, AWS)
- Sarah Kim (AI/ML, TensorFlow, PyTorch)
- Marcus Johnson (iOS, Android, React Native)
- Priya Patel (Java, Spring Boot, System Design)
- David Lee (Blockchain, Solidity, Web3)
- Emma Wilson (Data Science, Python, SQL)
- James Rodriguez (DevOps, AWS, Docker)
- Lisa Chen (Game Dev, Unity, C#)
- Ryan Martinez (Cybersecurity, Python)
- Nina Gupta (Frontend, React, Vue.js)
- Chris Taylor (IoT, Embedded Systems, C++)

**11 Non-Technical Users (Idea Makers):**
- Olivia Brown (AI-powered social shopping platform)
- Michael Davis (Micro-investing app for students)
- Sophia Anderson (Healthcare navigation app)
- Ethan White (AI video editing assistant)
- Ava Thomas (Mental wellness app)
- Noah Jackson (Restaurant management platform)
- Mia Harris (Sustainable fashion marketplace)
- William Moore (Music discovery platform)
- Isabella Taylor (Carbon footprint tracker)
- Logan Martinez (NIL platform for athletes)
- Amelia Garcia (Smart tutoring marketplace)

## 📁 Project Structure

```
startup-boy/
├── backend/
│   ├── app.py                 # Main Flask application with all API endpoints
│   ├── auth.py                # JWT and bcrypt authentication
│   ├── database.py            # Database initialization and schema
│   ├── seed_data.py           # Populates DB with 22 realistic users
│   ├── requirements.txt       # Python dependencies
│   └── compconnect.db         # SQLite database (created on first run)
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Navbar.js
│   │   │   ├── SwipeCard.js
│   │   │   └── MatchPopup.js
│   │   ├── pages/             # Main app pages
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ProfileSetup.js
│   │   │   ├── Discover.js
│   │   │   ├── Matches.js
│   │   │   ├── Chat.js
│   │   │   ├── Settings.js
│   │   │   ├── Premium.js
│   │   │   └── PrivacyPolicy.js
│   │   ├── utils/             # Helper functions
│   │   │   ├── api.js         # API calls
│   │   │   └── auth.js        # Auth utilities
│   │   ├── App.js             # Main app with routing
│   │   ├── App.css            # Global styles (clearly labeled sections!)
│   │   └── index.js           # React entry point
│   └── package.json           # Node dependencies
│
└── README.md                  # This file!
```

## 🎨 Customizing Styles

All CSS files have **clearly labeled sections** for easy customization:

### App.css (Global Styles)
```css
/* ===== NAVIGATION BAR STYLING - Edit here ===== */
/* ===== BUTTON STYLING - Edit here ===== */
/* ===== FORM STYLING - Edit here ===== */
/* ===== CARD STYLING - Edit here ===== */
/* ===== PAGE CONTAINER STYLING - Edit here ===== */
/* ... and more! */
```

### Page-Specific CSS
Each page has its own CSS file with labeled sections:
- `Login.css` - Login page styles
- `Register.css` - Registration with user type buttons
- `ProfileSetup.css` - Multi-step onboarding styles
- `Discover.css` - Swipe interface
- `SwipeCard.css` - Card component styles
- `Matches.css` - Matches grid
- `Chat.css` - Messaging interface
- `Settings.css` - Settings tabs
- `Premium.css` - Premium page
- `PrivacyPolicy.css` - Privacy policy page

### Customizable Variables (in App.css)
```css
:root {
  --primary-gradient-start: #8B5CF6;  /* Purple */
  --primary-gradient-end: #EC4899;    /* Pink */
  --background-color: #F9FAFB;
  --card-background: #FFFFFF;
  /* ... customize all colors, fonts, spacing! */
}
```

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Server-side validation
- **SQL Injection Prevention** - Parameterized queries
- **CORS Protection** - Configured for local development

## 🗄️ Database Schema

The SQLite database includes these tables:

- **users** - Account information, subscription tier
- **profiles** - User profiles with bio, skills, projects
- **profile_images** - Multiple photos per user
- **swipes** - Record of all swipes (like/dislike)
- **matches** - Mutual likes
- **messages** - Chat messages between matches
- **ratings** - User ratings and reviews

## 🐛 Troubleshooting

### Backend won't start
- Make sure you're in the `backend` folder
- Verify Python 3.8+ is installed: `python --version`
- Reinstall dependencies: `pip install -r requirements.txt`

### Frontend won't start
- Make sure you're in the `frontend` folder
- Verify Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again

### Database errors
- Delete `compconnect.db` file
- Run `python seed_data.py` again to recreate with fresh data

### CORS errors
- Make sure backend is running on port 5000
- Make sure frontend is running on port 3000
- Check that Flask-CORS is installed

### Swipe animations not working
- Make sure you have `react-spring` installed
- Check browser console for errors
- Try refreshing the page

## 📱 Browser Compatibility

- **Chrome** - Fully supported ✅
- **Firefox** - Fully supported ✅
- **Safari** - Fully supported ✅
- **Edge** - Fully supported ✅
- **Mobile browsers** - Fully responsive ✅

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Profile
- `GET /api/profile/:userId` - Get user profile
- `PUT /api/profile/:userId` - Update profile
- `POST /api/profile/upload-image` - Upload image

### Discover/Swipe
- `GET /api/discover` - Get swipe candidates
- `POST /api/swipe` - Record a swipe

### Matches
- `GET /api/matches` - Get all matches

### Messages
- `GET /api/messages/:matchId` - Get messages
- `POST /api/messages/:matchId` - Send message

### Ratings
- `POST /api/rate/:userId` - Rate a user

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings
- `DELETE /api/settings/delete-account` - Delete account

### Premium
- `POST /api/premium/upgrade` - Upgrade to premium (mock)

## 🎨 Features Highlights

### Swipe Interface
- Touch gestures on mobile
- Smooth card animations
- Visual feedback (overlays)
- Image carousel (multiple photos)
- Detailed profile info on flip

### Match Celebration
- Confetti animation
- Celebration popup
- Direct message option
- Continue swiping option

### Chat System
- Real-time-ish messaging (2s polling)
- Message bubbles
- Timestamps
- Scroll to bottom
- In-chat rating

### Profile System
- Multi-step onboarding
- Type-specific fields
- Image management
- Skills tags
- Project ideas with equity %

## 💡 Tips for Demo

1. **Start with two browser windows** - Login as technical user in one, non-technical in another
2. **Swipe right on each other** - See the match animation
3. **Send messages** - Test the chat system
4. **Rate each other** - See ratings update on profiles
5. **Try premium upgrade** - See the mock payment flow
6. **Explore all pages** - Settings, Privacy Policy, etc.

## 📄 License

This is a demo project for educational purposes.

## 🙏 Credits

Built with ❤️ for connecting idea makers with builders!

---

**Ready to find your perfect project partner? Let's get started! 🚀**
