from database import get_db_connection, init_db
from auth import hash_password

def seed_database():
    """Populate the database with realistic placeholder users"""

    # First, initialize the database
    init_db()

    conn = get_db_connection()
    cursor = conn.cursor()

    # Technical users data
    technical_users = [
        {
            'email': 'alex.chen@stanford.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'Stanford University',
            'name': 'Alex Chen',
            'age': 21,
            'bio': 'Full-stack dev passionate about building scalable systems. Love React & Node.js. Always down to turn great ideas into reality.',
            'skills': 'React,Node.js,Python,AWS,MongoDB',
            'portfolio_link': 'https://alexchen.dev',
            'github_url': 'https://github.com/alexchen',
            'images': [
                'https://i.pravatar.cc/400?img=12',
                'https://i.pravatar.cc/400?img=13',
                'https://i.pravatar.cc/400?img=33'
            ]
        },
        {
            'email': 'sarah.kim@mit.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'MIT',
            'name': 'Sarah Kim',
            'age': 22,
            'bio': 'AI/ML enthusiast with experience in computer vision. Built models for 3 startups. Looking for meaningful projects to work on!',
            'skills': 'Python,TensorFlow,PyTorch,Machine Learning,Computer Vision',
            'portfolio_link': 'https://sarahkim.io',
            'github_url': 'https://github.com/sarahkim',
            'images': [
                'https://i.pravatar.cc/400?img=5',
                'https://i.pravatar.cc/400?img=20',
                'https://i.pravatar.cc/400?img=45'
            ]
        },
        {
            'email': 'marcus.johnson@berkeley.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'UC Berkeley',
            'name': 'Marcus Johnson',
            'age': 23,
            'bio': 'Mobile dev who loves crafting beautiful UIs. iOS & Android expert. Previously interned at Meta. Let\'s build something cool together!',
            'skills': 'Swift,Kotlin,React Native,iOS,Android,UI/UX',
            'portfolio_link': 'https://marcusj.dev',
            'github_url': 'https://github.com/mjohnson',
            'images': [
                'https://i.pravatar.cc/400?img=14',
                'https://i.pravatar.cc/400?img=51',
                'https://i.pravatar.cc/400?img=52'
            ]
        },
        {
            'email': 'priya.patel@cmu.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'Carnegie Mellon University',
            'name': 'Priya Patel',
            'age': 20,
            'bio': 'Backend wizard specializing in system design and databases. Love solving complex technical challenges. Open to equity-based projects.',
            'skills': 'Java,Spring Boot,PostgreSQL,Docker,Kubernetes,System Design',
            'portfolio_link': 'https://priyapatel.tech',
            'github_url': 'https://github.com/ppatel',
            'images': [
                'https://i.pravatar.cc/400?img=9',
                'https://i.pravatar.cc/400?img=29',
                'https://i.pravatar.cc/400?img=38'
            ]
        },
        {
            'email': 'david.lee@harvard.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'Harvard University',
            'name': 'David Lee',
            'age': 22,
            'bio': 'Blockchain developer and Web3 enthusiast. Built 2 DeFi apps. Looking for innovative crypto projects or traditional startups.',
            'skills': 'Solidity,Ethereum,Web3.js,JavaScript,Smart Contracts',
            'portfolio_link': 'https://davidlee.xyz',
            'github_url': 'https://github.com/dlee',
            'images': [
                'https://i.pravatar.cc/400?img=15',
                'https://i.pravatar.cc/400?img=59',
                'https://i.pravatar.cc/400?img=60'
            ]
        },
        {
            'email': 'emma.wilson@cornell.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'Cornell University',
            'name': 'Emma Wilson',
            'age': 21,
            'bio': 'Data scientist who loves turning data into insights. Python expert with experience in analytics and visualization. Let\'s build data-driven products!',
            'skills': 'Python,Pandas,SQL,Data Analysis,Tableau,Statistics',
            'portfolio_link': 'https://emmawilson.com',
            'github_url': 'https://github.com/ewilson',
            'images': [
                'https://i.pravatar.cc/400?img=10',
                'https://i.pravatar.cc/400?img=24',
                'https://i.pravatar.cc/400?img=32'
            ]
        },
        {
            'email': 'james.rodriguez@gatech.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'Georgia Tech',
            'name': 'James Rodriguez',
            'age': 24,
            'bio': 'DevOps engineer passionate about automation and cloud infrastructure. Love optimizing workflows. Open to all types of projects!',
            'skills': 'AWS,Docker,Kubernetes,CI/CD,Terraform,Linux',
            'portfolio_link': 'https://jamesrod.dev',
            'github_url': 'https://github.com/jrodriguez',
            'images': [
                'https://i.pravatar.cc/400?img=17',
                'https://i.pravatar.cc/400?img=56',
                'https://i.pravatar.cc/400?img=57'
            ]
        },
        {
            'email': 'lisa.chen@usc.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'USC',
            'name': 'Lisa Chen',
            'age': 20,
            'bio': 'Game developer and Unity expert. Love creating immersive experiences. Also do web dev on the side. Always looking for creative projects!',
            'skills': 'Unity,C#,Game Development,3D Modeling,WebGL',
            'portfolio_link': 'https://lisachen.games',
            'github_url': 'https://github.com/lchen',
            'images': [
                'https://i.pravatar.cc/400?img=6',
                'https://i.pravatar.cc/400?img=25',
                'https://i.pravatar.cc/400?img=47'
            ]
        },
        {
            'email': 'ryan.martinez@ucla.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'UCLA',
            'name': 'Ryan Martinez',
            'age': 23,
            'bio': 'Security engineer focused on building secure applications. Certified ethical hacker. Let\'s build something secure and scalable!',
            'skills': 'Cybersecurity,Penetration Testing,Python,Network Security',
            'portfolio_link': 'https://ryanmartinez.security',
            'github_url': 'https://github.com/rmartinez',
            'images': [
                'https://i.pravatar.cc/400?img=18',
                'https://i.pravatar.cc/400?img=53',
                'https://i.pravatar.cc/400?img=58'
            ]
        },
        {
            'email': 'nina.gupta@princeton.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'Princeton University',
            'name': 'Nina Gupta',
            'age': 21,
            'bio': 'Frontend engineer obsessed with creating pixel-perfect designs. React & Vue specialist. Love working with designers to build beautiful products.',
            'skills': 'React,Vue.js,CSS,HTML,JavaScript,Figma,UI/UX',
            'portfolio_link': 'https://ninagupta.design',
            'github_url': 'https://github.com/ngupta',
            'images': [
                'https://i.pravatar.cc/400?img=16',
                'https://i.pravatar.cc/400?img=27',
                'https://i.pravatar.cc/400?img=41'
            ]
        },
        {
            'email': 'chris.taylor@columbia.edu',
            'password': 'password123',
            'user_type': 'technical',
            'country': 'USA',
            'school': 'Columbia University',
            'name': 'Chris Taylor',
            'age': 22,
            'bio': 'IoT and embedded systems developer. Built smart home projects and wearable tech. Looking for hardware-software integration projects.',
            'skills': 'C++,Embedded Systems,Arduino,Raspberry Pi,IoT,Python',
            'portfolio_link': 'https://christaylor.io',
            'github_url': 'https://github.com/ctaylor',
            'images': [
                'https://i.pravatar.cc/400?img=19',
                'https://i.pravatar.cc/400?img=54',
                'https://i.pravatar.cc/400?img=68'
            ]
        }
    ]

    # Non-technical users data
    non_technical_users = [
        {
            'email': 'olivia.brown@stanford.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'Stanford University',
            'name': 'Olivia Brown',
            'age': 22,
            'bio': 'Marketing major with a vision for disrupting social commerce. Love creating viral content. Looking for a tech co-founder!',
            'project_idea': 'AI-powered social shopping platform where influencers can create virtual storefronts. Think Instagram meets Amazon with personalized recommendations.',
            'equity_offering': 15,
            'payment_available': True,
            'timeline': '3-6 months MVP',
            'images': [
                'https://i.pravatar.cc/400?img=1',
                'https://i.pravatar.cc/400?img=21',
                'https://i.pravatar.cc/400?img=48'
            ]
        },
        {
            'email': 'michael.davis@yale.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'Yale University',
            'name': 'Michael Davis',
            'age': 23,
            'bio': 'Economics student passionate about fintech. Researched payment systems for 2 years. Have industry connections and potential first customers.',
            'project_idea': 'Micro-investing app for college students - automatically invest spare change from purchases. Gamified to make investing fun and educational.',
            'equity_offering': 20,
            'payment_available': True,
            'timeline': '4-6 months',
            'images': [
                'https://i.pravatar.cc/400?img=11',
                'https://i.pravatar.cc/400?img=34',
                'https://i.pravatar.cc/400?img=61'
            ]
        },
        {
            'email': 'sophia.anderson@duke.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'Duke University',
            'name': 'Sophia Anderson',
            'age': 21,
            'bio': 'Pre-med student who experienced healthcare inefficiencies firsthand. Want to build tech that helps patients navigate the system better.',
            'project_idea': 'Healthcare navigation app - helps patients find the right doctor, compare prices, and manage appointments. Uber for healthcare coordination.',
            'equity_offering': 12,
            'payment_available': False,
            'timeline': '6-9 months',
            'images': [
                'https://i.pravatar.cc/400?img=2',
                'https://i.pravatar.cc/400?img=26',
                'https://i.pravatar.cc/400?img=43'
            ]
        },
        {
            'email': 'ethan.white@nyu.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'New York University',
            'name': 'Ethan White',
            'age': 20,
            'bio': 'Film student with entrepreneurial spirit. Created viral TikTok content (500K followers). Want to build the future of creator tools.',
            'project_idea': 'AI video editing assistant for content creators - automatically cuts, edits, and suggests improvements. Save creators hours of editing time.',
            'equity_offering': 18,
            'payment_available': True,
            'timeline': '3-5 months',
            'images': [
                'https://i.pravatar.cc/400?img=8',
                'https://i.pravatar.cc/400?img=30',
                'https://i.pravatar.cc/400?img=62'
            ]
        },
        {
            'email': 'ava.thomas@northwestern.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'Northwestern University',
            'name': 'Ava Thomas',
            'age': 22,
            'bio': 'Psychology major passionate about mental health. Ran support groups for 3 years. Want to make therapy more accessible and affordable.',
            'project_idea': 'Mental wellness app with AI chatbot for immediate support + matching with licensed therapists. Subscription model at 1/3 the cost of traditional therapy.',
            'equity_offering': 10,
            'payment_available': False,
            'timeline': '6-12 months',
            'images': [
                'https://i.pravatar.cc/400?img=3',
                'https://i.pravatar.cc/400?img=22',
                'https://i.pravatar.cc/400?img=44'
            ]
        },
        {
            'email': 'noah.jackson@brown.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'Brown University',
            'name': 'Noah Jackson',
            'age': 24,
            'bio': 'MBA student with 2 years in consulting. Identified huge market gap in B2B SaaS for restaurants. Have LOIs from 5 restaurants.',
            'project_idea': 'Restaurant management platform - inventory tracking, staff scheduling, POS integration. All-in-one solution for small restaurant chains.',
            'equity_offering': 25,
            'payment_available': True,
            'timeline': '4-8 months',
            'images': [
                'https://i.pravatar.cc/400?img=7',
                'https://i.pravatar.cc/400?img=31',
                'https://i.pravatar.cc/400?img=63'
            ]
        },
        {
            'email': 'mia.harris@upenn.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'University of Pennsylvania',
            'name': 'Mia Harris',
            'age': 21,
            'bio': 'Design major with UX obsession. Created mockups for 10+ app ideas. Looking to finally bring one to life with the right developer.',
            'project_idea': 'Sustainable fashion marketplace - buy/sell/trade secondhand clothes with AI-powered style recommendations. Fighting fast fashion!',
            'equity_offering': 15,
            'payment_available': False,
            'timeline': '5-7 months',
            'images': [
                'https://i.pravatar.cc/400?img=4',
                'https://i.pravatar.cc/400?img=23',
                'https://i.pravatar.cc/400?img=42'
            ]
        },
        {
            'email': 'william.moore@vanderbilt.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'Vanderbilt University',
            'name': 'William Moore',
            'age': 23,
            'bio': 'Music industry major with connections to indie labels. Want to build tech that helps independent artists get discovered and monetize.',
            'project_idea': 'Music discovery platform with AI curation - helps indie artists reach fans who will actually love their music. Fair revenue sharing model.',
            'equity_offering': 20,
            'payment_available': True,
            'timeline': '6-9 months',
            'images': [
                'https://i.pravatar.cc/400?img=13',
                'https://i.pravatar.cc/400?img=35',
                'https://i.pravatar.cc/400?img=64'
            ]
        },
        {
            'email': 'isabella.taylor@dartmouth.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'Dartmouth College',
            'name': 'Isabella Taylor',
            'age': 20,
            'bio': 'Environmental science major. Passionate about sustainability. Want to make eco-friendly living easier and more rewarding for everyone.',
            'project_idea': 'Carbon footprint tracker with gamification - earn rewards for sustainable choices. Partner with eco-brands for discounts and prizes.',
            'equity_offering': 14,
            'payment_available': False,
            'timeline': '4-6 months',
            'images': [
                'https://i.pravatar.cc/400?img=36',
                'https://i.pravatar.cc/400?img=37',
                'https://i.pravatar.cc/400?img=46'
            ]
        },
        {
            'email': 'logan.martinez@rice.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'Rice University',
            'name': 'Logan Martinez',
            'age': 22,
            'bio': 'Sports management major with D1 athletics background. Know the pain points of student athletes. Want to build tools to help them succeed.',
            'project_idea': 'NIL management platform for college athletes - help them find brand deals, manage contracts, and build their personal brand. Huge market!',
            'equity_offering': 18,
            'payment_available': True,
            'timeline': '5-8 months',
            'images': [
                'https://i.pravatar.cc/400?img=28',
                'https://i.pravatar.cc/400?img=50',
                'https://i.pravatar.cc/400?img=65'
            ]
        },
        {
            'email': 'amelia.garcia@uchicago.edu',
            'password': 'password123',
            'user_type': 'non-technical',
            'country': 'USA',
            'school': 'University of Chicago',
            'name': 'Amelia Garcia',
            'age': 21,
            'bio': 'Education major who tutored 50+ students. Identified a better way to match tutors with students based on learning styles, not just subjects.',
            'project_idea': 'Smart tutoring marketplace - AI matches students with perfect tutors based on personality and learning style. Better outcomes for everyone.',
            'equity_offering': 16,
            'payment_available': True,
            'timeline': '4-7 months',
            'images': [
                'https://i.pravatar.cc/400?img=40',
                'https://i.pravatar.cc/400?img=49',
                'https://i.pravatar.cc/400?img=67'
            ]
        }
    ]

    # Insert technical users
    for user_data in technical_users:
        # Insert user
        cursor.execute('''
            INSERT INTO users (email, password_hash, user_type, country, school)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            user_data['email'],
            hash_password(user_data['password']),
            user_data['user_type'],
            user_data['country'],
            user_data['school']
        ))
        user_id = cursor.lastrowid

        # Insert profile
        cursor.execute('''
            INSERT INTO profiles (
                user_id, name, age, bio, skills, portfolio_link, github_url,
                project_idea, equity_offering, payment_available, timeline, profile_picture_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            user_id,
            user_data['name'],
            user_data['age'],
            user_data['bio'],
            user_data['skills'],
            user_data['portfolio_link'],
            user_data['github_url'],
            None,  # project_idea
            None,  # equity_offering
            None,  # payment_available
            None,  # timeline
            user_data['images'][0]  # First image as profile picture
        ))

        # Insert profile images
        for i, image_url in enumerate(user_data['images']):
            cursor.execute('''
                INSERT INTO profile_images (user_id, image_url, order_number)
                VALUES (?, ?, ?)
            ''', (user_id, image_url, i))

    # Insert non-technical users
    for user_data in non_technical_users:
        # Insert user
        cursor.execute('''
            INSERT INTO users (email, password_hash, user_type, country, school)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            user_data['email'],
            hash_password(user_data['password']),
            user_data['user_type'],
            user_data['country'],
            user_data['school']
        ))
        user_id = cursor.lastrowid

        # Insert profile
        cursor.execute('''
            INSERT INTO profiles (
                user_id, name, age, bio, skills, portfolio_link, github_url,
                project_idea, equity_offering, payment_available, timeline, profile_picture_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            user_id,
            user_data['name'],
            user_data['age'],
            user_data['bio'],
            None,  # skills
            None,  # portfolio_link
            None,  # github_url
            user_data['project_idea'],
            user_data['equity_offering'],
            user_data['payment_available'],
            user_data['timeline'],
            user_data['images'][0]  # First image as profile picture
        ))

        # Insert profile images
        for i, image_url in enumerate(user_data['images']):
            cursor.execute('''
                INSERT INTO profile_images (user_id, image_url, order_number)
                VALUES (?, ?, ?)
            ''', (user_id, image_url, i))

    conn.commit()
    conn.close()
    print(f"Successfully seeded database with {len(technical_users)} technical users and {len(non_technical_users)} non-technical users!")

if __name__ == '__main__':
    seed_database()
