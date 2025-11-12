import sqlite3
from datetime import datetime
import os

DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'compconnect.db')

def get_db_connection():
    """Create and return a database connection"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  # This enables column access by name
    return conn

def init_db():
    """Initialize the database with all required tables"""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            user_type TEXT NOT NULL CHECK(user_type IN ('technical', 'non-technical')),
            country TEXT NOT NULL,
            school TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            swipes_remaining INTEGER DEFAULT 20,
            last_swipe_reset TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            subscription_tier TEXT DEFAULT 'free' CHECK(subscription_tier IN ('free', 'premium'))
        )
    ''')

    # Profiles table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE NOT NULL,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            bio TEXT,
            skills TEXT,  -- Comma-separated for technical users
            portfolio_link TEXT,
            github_url TEXT,
            project_idea TEXT,  -- For non-technical users
            equity_offering INTEGER,  -- Percentage (0-100)
            payment_available BOOLEAN,
            timeline TEXT,
            rating REAL DEFAULT 0.0,
            rating_count INTEGER DEFAULT 0,
            profile_picture_url TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    ''')

    # Profile images table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS profile_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            image_url TEXT NOT NULL,
            order_number INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    ''')

    # Swipes table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS swipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            swiper_id INTEGER NOT NULL,
            swiped_id INTEGER NOT NULL,
            swipe_type TEXT NOT NULL CHECK(swipe_type IN ('like', 'dislike')),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (swiper_id) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (swiped_id) REFERENCES users (id) ON DELETE CASCADE,
            UNIQUE(swiper_id, swiped_id)
        )
    ''')

    # Matches table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS matches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user1_id INTEGER NOT NULL,
            user2_id INTEGER NOT NULL,
            matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'active' CHECK(status IN ('active', 'unmatched')),
            FOREIGN KEY (user1_id) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (user2_id) REFERENCES users (id) ON DELETE CASCADE,
            UNIQUE(user1_id, user2_id)
        )
    ''')

    # Messages table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            match_id INTEGER NOT NULL,
            sender_id INTEGER NOT NULL,
            message_text TEXT NOT NULL,
            sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            read_status BOOLEAN DEFAULT 0,
            FOREIGN KEY (match_id) REFERENCES matches (id) ON DELETE CASCADE,
            FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE
        )
    ''')

    # Ratings table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rater_id INTEGER NOT NULL,
            rated_id INTEGER NOT NULL,
            rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
            review_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (rater_id) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (rated_id) REFERENCES users (id) ON DELETE CASCADE,
            UNIQUE(rater_id, rated_id)
        )
    ''')

    conn.commit()
    conn.close()
    print("Database initialized successfully!")

if __name__ == '__main__':
    init_db()
