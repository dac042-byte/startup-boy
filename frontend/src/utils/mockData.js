// Mock users data - No backend needed!

export const users = [
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
    skills: 'React,Node.js,Python,AWS,MongoDB',
    portfolio_link: 'https://alexchen.dev',
    github_url: 'https://github.com/alexchen',
    rating: 4.8,
    rating_count: 12,
    images: [
      'https://i.pravatar.cc/400?img=12',
      'https://i.pravatar.cc/400?img=13',
      'https://i.pravatar.cc/400?img=33'
    ]
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
    skills: 'Python,TensorFlow,PyTorch,Machine Learning,Computer Vision',
    portfolio_link: 'https://sarahkim.io',
    github_url: 'https://github.com/sarahkim',
    rating: 4.9,
    rating_count: 18,
    images: [
      'https://i.pravatar.cc/400?img=5',
      'https://i.pravatar.cc/400?img=20',
      'https://i.pravatar.cc/400?img=45'
    ]
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
    bio: 'Mobile dev who loves crafting beautiful UIs. iOS & Android expert. Previously interned at Meta. Let\'s build something cool together!',
    skills: 'Swift,Kotlin,React Native,iOS,Android,UI/UX',
    portfolio_link: 'https://marcusj.dev',
    github_url: 'https://github.com/mjohnson',
    rating: 4.7,
    rating_count: 15,
    images: [
      'https://i.pravatar.cc/400?img=14',
      'https://i.pravatar.cc/400?img=51',
      'https://i.pravatar.cc/400?img=52'
    ]
  },
  {
    user_id: 4,
    email: 'priya.patel@cmu.edu',
    password: 'password123',
    user_type: 'technical',
    country: 'USA',
    school: 'Carnegie Mellon University',
    name: 'Priya Patel',
    age: 20,
    bio: 'Backend wizard specializing in system design and databases. Love solving complex technical challenges. Open to equity-based projects.',
    skills: 'Java,Spring Boot,PostgreSQL,Docker,Kubernetes,System Design',
    portfolio_link: 'https://priyapatel.tech',
    github_url: 'https://github.com/ppatel',
    rating: 5.0,
    rating_count: 20,
    images: [
      'https://i.pravatar.cc/400?img=9',
      'https://i.pravatar.cc/400?img=29',
      'https://i.pravatar.cc/400?img=38'
    ]
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
    skills: 'Solidity,Ethereum,Web3.js,JavaScript,Smart Contracts',
    portfolio_link: 'https://davidlee.xyz',
    github_url: 'https://github.com/dlee',
    rating: 4.6,
    rating_count: 10,
    images: [
      'https://i.pravatar.cc/400?img=15',
      'https://i.pravatar.cc/400?img=59',
      'https://i.pravatar.cc/400?img=60'
    ]
  },

  // Non-Technical Users (Idea Makers)
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
    timeline: '3-6 months MVP',
    rating: 4.5,
    rating_count: 8,
    images: [
      'https://i.pravatar.cc/400?img=1',
      'https://i.pravatar.cc/400?img=21',
      'https://i.pravatar.cc/400?img=48'
    ]
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
    images: [
      'https://i.pravatar.cc/400?img=11',
      'https://i.pravatar.cc/400?img=34',
      'https://i.pravatar.cc/400?img=61'
    ]
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
    images: [
      'https://i.pravatar.cc/400?img=2',
      'https://i.pravatar.cc/400?img=26',
      'https://i.pravatar.cc/400?img=43'
    ]
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
    images: [
      'https://i.pravatar.cc/400?img=8',
      'https://i.pravatar.cc/400?img=30',
      'https://i.pravatar.cc/400?img=62'
    ]
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
    project_idea: 'Mental wellness app with AI chatbot for immediate support + matching with licensed therapists. Subscription model at 1/3 the cost of traditional therapy.',
    equity_offering: 10,
    payment_available: false,
    timeline: '6-12 months',
    rating: 4.9,
    rating_count: 17,
    images: [
      'https://i.pravatar.cc/400?img=3',
      'https://i.pravatar.cc/400?img=22',
      'https://i.pravatar.cc/400?img=44'
    ]
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
    images: [
      'https://i.pravatar.cc/400?img=7',
      'https://i.pravatar.cc/400?img=31',
      'https://i.pravatar.cc/400?img=63'
    ]
  },
];

// Mock state for swipes, matches, messages
export const mockState = {
  swipes: [],
  matches: [],
  messages: [],
  ratings: [],
  swipesRemaining: 20,
  lastSwipeReset: new Date().toISOString(),
};
