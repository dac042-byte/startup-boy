# 💡 CompConnect - Dating App for Project Collaborations

A beautiful, interactive dating-style app that connects **technical professionals** (developers, engineers) with **non-technical idea makers** (entrepreneurs, visionaries) for project collaborations.

## ✨ Features

### Complete Dating App Experience
- **Tinder-Style Swipe Interface** - Swipe left to pass, right to like
- **Smart Matching Algorithm** - Technical users only see non-technical profiles and vice versa
- **It's a Match! Celebrations** - Animated popup with confetti when mutual likes occur
- **Real-Time Chat** - One-on-one messaging with your matches
- **User Ratings** - 5-star rating system with reviews
- **Daily Swipe Limits** - 20 free swipes per day (resets daily)
- **Premium Subscription** - Unlock unlimited swipes ($2/month demo)
- **Multi-Step Onboarding** - Beautiful profile creation wizard
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop

### User Types

**Technical Users** provide:
- Skills and expertise
- Portfolio links
- GitHub profile
- Professional experience

**Non-Technical Users** provide:
- Project ideas
- Equity offering (%)
- Timeline estimates
- Payment availability

## 🚀 How to Use

### Super Simple - No Installation Required!

1. **Open the App**
   - Simply open `index.html` in any modern web browser
   - That's it! No servers, no installation, no build process

2. **Quick Demo Login**
   - Click "Login as Technical User" to try the developer experience
   - Click "Login as Idea Maker" to try the entrepreneur experience

3. **Or Create Your Own Account**
   - Click "Sign up" to create a custom profile
   - Choose your user type
   - Fill in your information
   - Start swiping!

## 🎮 Demo Accounts

### Technical User
- **Email:** alex.chen@stanford.edu
- **Password:** password123
- **Profile:** Full-stack developer from Stanford

### Non-Technical User
- **Email:** olivia.brown@stanford.edu
- **Password:** password123
- **Profile:** Marketing major with social commerce idea

## 📱 How to Navigate

### Main Pages

1. **Discover** 🔥
   - Swipe through potential matches
   - View profile photos, bios, and details
   - Like (❤️) or pass (✕) on profiles
   - Get instant match notifications

2. **Matches** 💕
   - See all your mutual matches
   - Click on any match to start chatting
   - View match details and ratings

3. **Chat** 💬
   - Send messages to your matches
   - Rate your collaborators after chatting
   - Active status indicators

4. **Settings** ⚙️
   - Edit your profile information
   - Manage account settings
   - Logout or delete account
   - View subscription status

5. **Premium** ⭐
   - Upgrade for unlimited swipes
   - See who liked you
   - Get a premium badge
   - Access advanced filters

## 🎨 Customization

All styles are clearly labeled in `styles.css`:

```css
/* ===== BUTTON STYLING - Edit here ===== */
/* ===== CARD STYLING - Edit here ===== */
/* ===== NAVIGATION BAR STYLING - Edit here ===== */
```

To change colors, edit the CSS variables at the top of `styles.css`:

```css
:root {
  --primary-purple: #8B5CF6;
  --primary-pink: #EC4899;
  /* ... more colors */
}
```

## 💾 Data Storage

- All data is stored locally in your browser using `localStorage`
- No backend server required
- Data persists between sessions
- Swipe limits reset daily automatically

### Pre-Loaded Demo Data

The app comes with 11 realistic user profiles:
- 5 technical users (developers, engineers, designers)
- 6 non-technical users (entrepreneurs with project ideas)

## 🎯 Key Interactions

### Swiping
- Click ✕ button or swipe left to pass
- Click ❤️ button or swipe right to like
- Cards animate smoothly as you swipe
- See remaining swipes in top corner

### Matching
- When two users like each other, it's a match!
- Celebration popup appears with confetti animation
- Choose to send a message or keep swiping

### Messaging
- Click on any match to open chat
- Type message and press Enter or click Send
- Messages appear in real-time
- Scroll through conversation history

### Rating
- After chatting, click "⭐ Rate" button
- Select 1-5 stars
- Optionally leave a text review
- Ratings appear on user profiles

## 🏆 Premium Features (Demo)

Upgrade to Premium for:
- 🔥 **Unlimited Swipes** - No daily limits
- 👀 **See Who Liked You** - Know who's interested
- ⭐ **Premium Badge** - Stand out on profiles
- 🎯 **Advanced Filters** - Filter by skills & more
- 📊 **Profile Analytics** - See your stats
- 🔔 **Priority Support** - Get help faster

*Note: This is a demo - no real payment required. Just click "Upgrade to Premium Now" to activate.*

## 📂 File Structure

```
simple-app/
├── index.html       # Main HTML structure
├── styles.css       # All styling and animations
├── app.js          # Complete JavaScript functionality
├── privacy.html    # Privacy policy page
└── README.md       # This file
```

## 🌟 Features Walkthrough

### Authentication
- Email/password login
- User type selection (Technical vs Idea Maker)
- Quick demo login buttons
- Registration with validation

### Profile Setup (3 Steps)
1. **Basic Info** - Name, age, bio
2. **Photos** - Profile picture selection
3. **Type-Specific Details**
   - Technical: Skills, portfolio, GitHub
   - Non-Technical: Project idea, equity, timeline

### Discover Interface
- Beautiful card stack layout
- Multiple profile photos with indicators
- Smooth swipe animations
- Image carousel (click left/right to change photos)
- Profile details: name, age, school, rating, bio

### Match System
- Automatic match detection
- Animated match popup
- Confetti celebration effect
- Heartbeat animation

### Settings Page
- Edit profile information
- View subscription status
- Account management (logout, delete)
- Privacy policy link

## 🎨 Animations

- **Page Transitions** - Smooth fade-in effects
- **Card Swipes** - Left/right slide with rotation
- **Match Popup** - Scale up with confetti
- **Heartbeat** - Pulsing heart animation
- **Button Hovers** - Subtle lift and shadow
- **Toast Notifications** - Slide up from bottom

## 🔒 Privacy

- All data stored locally in browser
- No external servers or databases
- Full privacy policy included
- Delete account removes all data

## 🐛 Troubleshooting

**Problem:** Nothing happens when I click buttons
- **Solution:** Make sure JavaScript is enabled in your browser

**Problem:** Images not loading
- **Solution:** Check your internet connection (images are loaded from pravatar.cc)

**Problem:** Lost my data
- **Solution:** Data is stored in browser localStorage. Clearing browser data will delete it.

**Problem:** Can't find any matches
- **Solution:** Try swiping right on more profiles. Remember, matches only happen when both users like each other!

## 💻 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📱 Mobile Support

Fully responsive design:
- Touch-friendly swipe gestures
- Optimized layouts for small screens
- Mobile-first design approach

## 🎓 Educational Purpose

This is a demonstration project showcasing:
- Modern HTML5 structure
- CSS3 animations and transitions
- Vanilla JavaScript (no frameworks)
- LocalStorage data persistence
- Responsive design principles
- User experience best practices

## 🤝 Credits

- **Profile Images:** pravatar.cc (placeholder avatars)
- **Design Inspiration:** Modern dating apps
- **Icons:** Unicode emoji

## 📄 License

This is a demo project for educational purposes.

## 🎉 Have Fun!

Swipe right on great ideas and talented developers! Build amazing projects together! 🚀

---

**Made with 💜 by the CompConnect Team**
