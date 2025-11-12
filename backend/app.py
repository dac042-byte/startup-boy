from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, init_db
from auth import hash_password, verify_password, generate_token, token_required
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for local development

# Initialize database on first run
if not os.path.exists('compconnect.db'):
    print("Database not found. Initializing...")
    init_db()
    # You should run seed_data.py separately to populate the database

# ============== AUTHENTICATION ROUTES ==============

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        user_type = data.get('user_type')  # 'technical' or 'non-technical'
        country = data.get('country')
        school = data.get('school')

        # Validation
        if not all([email, password, user_type, country, school]):
            return jsonify({'error': 'All fields are required'}), 400

        if user_type not in ['technical', 'non-technical']:
            return jsonify({'error': 'Invalid user type'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if user already exists
        cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'error': 'Email already registered'}), 400

        # Create user
        password_hash = hash_password(password)
        cursor.execute('''
            INSERT INTO users (email, password_hash, user_type, country, school)
            VALUES (?, ?, ?, ?, ?)
        ''', (email, password_hash, user_type, country, school))

        user_id = cursor.lastrowid
        conn.commit()
        conn.close()

        # Generate token
        token = generate_token(user_id)

        return jsonify({
            'token': token,
            'user_id': user_id,
            'user_type': user_type,
            'message': 'User registered successfully'
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Get user
        cursor.execute('SELECT id, password_hash, user_type FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        conn.close()

        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401

        # Verify password
        if not verify_password(password, user['password_hash']):
            return jsonify({'error': 'Invalid email or password'}), 401

        # Generate token
        token = generate_token(user['id'])

        return jsonify({
            'token': token,
            'user_id': user['id'],
            'user_type': user['user_type'],
            'message': 'Login successful'
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============== PROFILE ROUTES ==============

@app.route('/api/profile/<int:user_id>', methods=['GET'])
@token_required
def get_profile(current_user_id, user_id):
    """Get user profile"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get user and profile data
        cursor.execute('''
            SELECT u.*, p.* FROM users u
            LEFT JOIN profiles p ON u.id = p.user_id
            WHERE u.id = ?
        ''', (user_id,))
        profile = cursor.fetchone()

        if not profile:
            conn.close()
            return jsonify({'error': 'User not found'}), 404

        # Get profile images
        cursor.execute('''
            SELECT image_url, order_number FROM profile_images
            WHERE user_id = ?
            ORDER BY order_number
        ''', (user_id,))
        images = [row['image_url'] for row in cursor.fetchall()]

        conn.close()

        return jsonify({
            'user_id': profile['id'],
            'email': profile['email'],
            'user_type': profile['user_type'],
            'country': profile['country'],
            'school': profile['school'],
            'name': profile['name'] if profile['name'] else None,
            'age': profile['age'] if profile['age'] else None,
            'bio': profile['bio'],
            'skills': profile['skills'],
            'portfolio_link': profile['portfolio_link'],
            'github_url': profile['github_url'],
            'project_idea': profile['project_idea'],
            'equity_offering': profile['equity_offering'],
            'payment_available': profile['payment_available'],
            'timeline': profile['timeline'],
            'rating': profile['rating'],
            'rating_count': profile['rating_count'],
            'profile_picture_url': profile['profile_picture_url'],
            'images': images
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/profile/<int:user_id>', methods=['PUT'])
@token_required
def update_profile(current_user_id, user_id):
    """Update user profile"""
    try:
        # Ensure user can only update their own profile
        if current_user_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403

        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if profile exists
        cursor.execute('SELECT id FROM profiles WHERE user_id = ?', (user_id,))
        profile_exists = cursor.fetchone()

        if profile_exists:
            # Update existing profile
            cursor.execute('''
                UPDATE profiles SET
                    name = ?,
                    age = ?,
                    bio = ?,
                    skills = ?,
                    portfolio_link = ?,
                    github_url = ?,
                    project_idea = ?,
                    equity_offering = ?,
                    payment_available = ?,
                    timeline = ?,
                    profile_picture_url = ?
                WHERE user_id = ?
            ''', (
                data.get('name'),
                data.get('age'),
                data.get('bio'),
                data.get('skills'),
                data.get('portfolio_link'),
                data.get('github_url'),
                data.get('project_idea'),
                data.get('equity_offering'),
                data.get('payment_available'),
                data.get('timeline'),
                data.get('profile_picture_url'),
                user_id
            ))
        else:
            # Create new profile
            cursor.execute('''
                INSERT INTO profiles (
                    user_id, name, age, bio, skills, portfolio_link, github_url,
                    project_idea, equity_offering, payment_available, timeline, profile_picture_url
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                user_id,
                data.get('name'),
                data.get('age'),
                data.get('bio'),
                data.get('skills'),
                data.get('portfolio_link'),
                data.get('github_url'),
                data.get('project_idea'),
                data.get('equity_offering'),
                data.get('payment_available'),
                data.get('timeline'),
                data.get('profile_picture_url')
            ))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Profile updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/profile/upload-image', methods=['POST'])
@token_required
def upload_image(current_user_id):
    """Upload profile image (placeholder - just stores URL)"""
    try:
        data = request.json
        image_url = data.get('image_url')
        order_number = data.get('order_number', 0)

        if not image_url:
            return jsonify({'error': 'Image URL is required'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert or update image
        cursor.execute('''
            INSERT INTO profile_images (user_id, image_url, order_number)
            VALUES (?, ?, ?)
        ''', (current_user_id, image_url, order_number))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Image uploaded successfully', 'image_url': image_url}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============== DISCOVER/SWIPE ROUTES ==============

@app.route('/api/discover', methods=['GET'])
@token_required
def discover(current_user_id):
    """Get swipe candidates (opposite user type, not already swiped)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get current user type and swipe data
        cursor.execute('SELECT user_type, swipes_remaining, last_swipe_reset FROM users WHERE id = ?', (current_user_id,))
        current_user = cursor.fetchone()

        if not current_user:
            conn.close()
            return jsonify({'error': 'User not found'}), 404

        # Reset swipes if it's a new day
        last_reset = datetime.fromisoformat(current_user['last_swipe_reset'])
        if datetime.now().date() > last_reset.date():
            cursor.execute('''
                UPDATE users SET swipes_remaining = 20, last_swipe_reset = ?
                WHERE id = ?
            ''', (datetime.now().isoformat(), current_user_id))
            conn.commit()
            swipes_remaining = 20
        else:
            swipes_remaining = current_user['swipes_remaining']

        # Determine opposite type
        opposite_type = 'non-technical' if current_user['user_type'] == 'technical' else 'technical'

        # Get candidates (opposite type, not already swiped by current user)
        cursor.execute('''
            SELECT u.id, u.user_type, p.* FROM users u
            JOIN profiles p ON u.id = p.user_id
            WHERE u.user_type = ?
            AND u.id != ?
            AND u.id NOT IN (
                SELECT swiped_id FROM swipes WHERE swiper_id = ?
            )
            ORDER BY RANDOM()
            LIMIT 10
        ''', (opposite_type, current_user_id, current_user_id))

        candidates = cursor.fetchall()

        # Get images for each candidate
        result = []
        for candidate in candidates:
            cursor.execute('''
                SELECT image_url FROM profile_images
                WHERE user_id = ?
                ORDER BY order_number
            ''', (candidate['user_id'],))
            images = [row['image_url'] for row in cursor.fetchall()]

            result.append({
                'user_id': candidate['user_id'],
                'name': candidate['name'],
                'age': candidate['age'],
                'bio': candidate['bio'],
                'user_type': candidate['user_type'],
                'skills': candidate['skills'],
                'portfolio_link': candidate['portfolio_link'],
                'github_url': candidate['github_url'],
                'project_idea': candidate['project_idea'],
                'equity_offering': candidate['equity_offering'],
                'payment_available': candidate['payment_available'],
                'timeline': candidate['timeline'],
                'rating': candidate['rating'],
                'rating_count': candidate['rating_count'],
                'images': images
            })

        conn.close()

        return jsonify({
            'candidates': result,
            'swipes_remaining': swipes_remaining
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/swipe', methods=['POST'])
@token_required
def swipe(current_user_id):
    """Record a swipe (like or dislike)"""
    try:
        data = request.json
        swiped_id = data.get('swiped_id')
        swipe_type = data.get('swipe_type')  # 'like' or 'dislike'

        if not swiped_id or not swipe_type:
            return jsonify({'error': 'Missing required fields'}), 400

        if swipe_type not in ['like', 'dislike']:
            return jsonify({'error': 'Invalid swipe type'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check swipes remaining (skip for premium users)
        cursor.execute('SELECT swipes_remaining, subscription_tier FROM users WHERE id = ?', (current_user_id,))
        user = cursor.fetchone()

        if user['subscription_tier'] == 'free' and user['swipes_remaining'] <= 0:
            conn.close()
            return jsonify({'error': 'No swipes remaining', 'swipes_remaining': 0}), 403

        # Record swipe
        cursor.execute('''
            INSERT INTO swipes (swiper_id, swiped_id, swipe_type)
            VALUES (?, ?, ?)
        ''', (current_user_id, swiped_id, swipe_type))

        # Decrease swipes remaining (if not premium)
        if user['subscription_tier'] == 'free':
            cursor.execute('''
                UPDATE users SET swipes_remaining = swipes_remaining - 1
                WHERE id = ?
            ''', (current_user_id,))

        # Check for match (if both users liked each other)
        is_match = False
        if swipe_type == 'like':
            cursor.execute('''
                SELECT id FROM swipes
                WHERE swiper_id = ? AND swiped_id = ? AND swipe_type = 'like'
            ''', (swiped_id, current_user_id))

            if cursor.fetchone():
                # It's a match! Create match record
                is_match = True
                # Ensure consistent ordering (lower user_id first)
                user1_id = min(current_user_id, swiped_id)
                user2_id = max(current_user_id, swiped_id)

                cursor.execute('''
                    INSERT OR IGNORE INTO matches (user1_id, user2_id)
                    VALUES (?, ?)
                ''', (user1_id, user2_id))

        conn.commit()

        # Get updated swipes remaining
        cursor.execute('SELECT swipes_remaining FROM users WHERE id = ?', (current_user_id,))
        swipes_remaining = cursor.fetchone()['swipes_remaining']

        conn.close()

        return jsonify({
            'message': 'Swipe recorded',
            'is_match': is_match,
            'swipes_remaining': swipes_remaining
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============== MATCHES ROUTES ==============

@app.route('/api/matches', methods=['GET'])
@token_required
def get_matches(current_user_id):
    """Get all matches for the current user"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get all matches for the current user
        cursor.execute('''
            SELECT m.*, u.id as match_user_id, p.name, p.age, p.bio, p.profile_picture_url
            FROM matches m
            JOIN users u ON (u.id = m.user1_id OR u.id = m.user2_id) AND u.id != ?
            JOIN profiles p ON u.id = p.user_id
            WHERE (m.user1_id = ? OR m.user2_id = ?)
            AND m.status = 'active'
            ORDER BY m.matched_at DESC
        ''', (current_user_id, current_user_id, current_user_id))

        matches = cursor.fetchall()

        result = []
        for match in matches:
            result.append({
                'match_id': match['id'],
                'user_id': match['match_user_id'],
                'name': match['name'],
                'age': match['age'],
                'bio': match['bio'],
                'profile_picture_url': match['profile_picture_url'],
                'matched_at': match['matched_at']
            })

        conn.close()

        return jsonify({'matches': result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============== MESSAGING ROUTES ==============

@app.route('/api/messages/<int:match_id>', methods=['GET'])
@token_required
def get_messages(current_user_id, match_id):
    """Get all messages for a specific match"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Verify user is part of this match
        cursor.execute('''
            SELECT * FROM matches
            WHERE id = ? AND (user1_id = ? OR user2_id = ?)
        ''', (match_id, current_user_id, current_user_id))

        if not cursor.fetchone():
            conn.close()
            return jsonify({'error': 'Unauthorized or match not found'}), 403

        # Get messages
        cursor.execute('''
            SELECT m.*, p.name as sender_name
            FROM messages m
            JOIN profiles p ON m.sender_id = p.user_id
            WHERE m.match_id = ?
            ORDER BY m.sent_at ASC
        ''', (match_id,))

        messages = cursor.fetchall()

        result = []
        for msg in messages:
            result.append({
                'id': msg['id'],
                'sender_id': msg['sender_id'],
                'sender_name': msg['sender_name'],
                'message_text': msg['message_text'],
                'sent_at': msg['sent_at'],
                'read_status': msg['read_status']
            })

        conn.close()

        return jsonify({'messages': result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/messages/<int:match_id>', methods=['POST'])
@token_required
def send_message(current_user_id, match_id):
    """Send a message in a match"""
    try:
        data = request.json
        message_text = data.get('message_text')

        if not message_text:
            return jsonify({'error': 'Message text is required'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Verify user is part of this match
        cursor.execute('''
            SELECT * FROM matches
            WHERE id = ? AND (user1_id = ? OR user2_id = ?)
        ''', (match_id, current_user_id, current_user_id))

        if not cursor.fetchone():
            conn.close()
            return jsonify({'error': 'Unauthorized or match not found'}), 403

        # Insert message
        cursor.execute('''
            INSERT INTO messages (match_id, sender_id, message_text)
            VALUES (?, ?, ?)
        ''', (match_id, current_user_id, message_text))

        message_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return jsonify({
            'message': 'Message sent',
            'message_id': message_id
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============== RATING ROUTES ==============

@app.route('/api/rate/<int:rated_user_id>', methods=['POST'])
@token_required
def rate_user(current_user_id, rated_user_id):
    """Rate another user"""
    try:
        data = request.json
        rating = data.get('rating')
        review_text = data.get('review_text', '')

        if not rating or rating < 1 or rating > 5:
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert or update rating
        cursor.execute('''
            INSERT OR REPLACE INTO ratings (rater_id, rated_id, rating, review_text)
            VALUES (?, ?, ?, ?)
        ''', (current_user_id, rated_user_id, rating, review_text))

        # Update average rating in profiles table
        cursor.execute('''
            SELECT AVG(rating) as avg_rating, COUNT(*) as count
            FROM ratings
            WHERE rated_id = ?
        ''', (rated_user_id,))

        result = cursor.fetchone()
        avg_rating = result['avg_rating']
        rating_count = result['count']

        cursor.execute('''
            UPDATE profiles
            SET rating = ?, rating_count = ?
            WHERE user_id = ?
        ''', (avg_rating, rating_count, rated_user_id))

        conn.commit()
        conn.close()

        return jsonify({
            'message': 'Rating submitted successfully',
            'new_average': avg_rating
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============== SETTINGS ROUTES ==============

@app.route('/api/settings', methods=['GET'])
@token_required
def get_settings(current_user_id):
    """Get user settings"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            SELECT u.*, p.name FROM users u
            LEFT JOIN profiles p ON u.id = p.user_id
            WHERE u.id = ?
        ''', (current_user_id,))

        user = cursor.fetchone()
        conn.close()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        return jsonify({
            'email': user['email'],
            'name': user['name'],
            'user_type': user['user_type'],
            'country': user['country'],
            'school': user['school'],
            'subscription_tier': user['subscription_tier']
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/settings', methods=['PUT'])
@token_required
def update_settings(current_user_id):
    """Update user settings"""
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()

        # Update user data
        if 'country' in data:
            cursor.execute('UPDATE users SET country = ? WHERE id = ?', (data['country'], current_user_id))

        if 'school' in data:
            cursor.execute('UPDATE users SET school = ? WHERE id = ?', (data['school'], current_user_id))

        # Change password if provided
        if 'new_password' in data and 'current_password' in data:
            cursor.execute('SELECT password_hash FROM users WHERE id = ?', (current_user_id,))
            user = cursor.fetchone()

            if not verify_password(data['current_password'], user['password_hash']):
                conn.close()
                return jsonify({'error': 'Current password is incorrect'}), 400

            new_password_hash = hash_password(data['new_password'])
            cursor.execute('UPDATE users SET password_hash = ? WHERE id = ?', (new_password_hash, current_user_id))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Settings updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/settings/delete-account', methods=['DELETE'])
@token_required
def delete_account(current_user_id):
    """Delete user account"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Delete user (CASCADE will delete related records)
        cursor.execute('DELETE FROM users WHERE id = ?', (current_user_id,))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Account deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============== PREMIUM ROUTES ==============

@app.route('/api/premium/upgrade', methods=['POST'])
@token_required
def upgrade_to_premium(current_user_id):
    """Upgrade to premium (mock - no real payment)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE users
            SET subscription_tier = 'premium'
            WHERE id = ?
        ''', (current_user_id,))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Upgraded to premium successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("Starting CompConnect Backend...")
    print("Backend running on http://localhost:5000")
    app.run(debug=True, port=5000)
