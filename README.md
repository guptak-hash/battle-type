# TypeFast - Competitive Typing Speed Game

![TypeFast Logo](frontend/battle-type/public/vite.svg)

A modern, feature-rich typing speed test application built with React, Node.js, and MongoDB. Challenge yourself, compete with friends, and improve your typing skills with real-time feedback and performance tracking.

## 🌟 Features

- **Real-time WPM Tracking**: Instant feedback on typing speed and accuracy
- **Interactive UI**: Modern interface with animated cursor and typing feedback
- **User Authentication**: Secure login/signup system
- **Global Leaderboard**: Compete with other users worldwide
- **Performance Analytics**: Track your progress over time
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- React Router v6
- Three.js (for 3D animations)
- TailwindCSS
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

## 📁 Project Structure

### Frontend Structure
```
frontend/battle-type/
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/           # React Context providers
│   ├── pages/             # Route components
│   ├── services/          # API service calls
│   ├── styles/            # CSS and style configurations
│   └── utilities/         # Helper functions
```

### Backend Structure
```
backend/
├── config/               # Database configuration
├── controllers/         # Request handlers
├── middlewares/        # Custom middlewares
├── models/            # MongoDB schemas
└── routes/           # API route definitions
```

## 🔐 API Routes

### Authentication Routes
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile

### Score Routes
- `GET /api/score` - Get all scores (leaderboard)
- `GET /api/score/:id` - Get specific score
- `GET /api/score/user/:userId` - Get user's scores
- `POST /api/score` - Submit new score
- `PUT /api/score/:id` - Update score
- `DELETE /api/score/:id` - Delete score

## 🎮 Game Features

### Typing Test
- Real-time WPM calculation
- Accuracy tracking
- Error highlighting
- Word-by-word progression
- Animated cursor following typing position

### User Dashboard
- Personal best scores
- Progress tracking
- Recent typing tests
- Performance analytics
- Global rank

## 💻 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/battle-type.git
cd battle-type
\`\`\`

2. Install backend dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

3. Install frontend dependencies:
\`\`\`bash
cd ../frontend/battle-type
npm install
\`\`\`

4. Set up environment variables:
Create `.env` files in both backend and frontend directories with necessary configurations.

Backend `.env`:
\`\`\`
MONGO_URL=your_mongodb_url
JWT_SECRET_KEY=your_jwt_secret
PORT=8000
\`\`\`

5. Start the development servers:

Backend:
\`\`\`bash
cd backend
npm run dev
\`\`\`

Frontend:
\`\`\`bash
cd frontend/battle-type
npm run dev
\`\`\`

## 🔧 Configuration

### Backend Configuration
- Database: MongoDB connection string in `.env`
- JWT: Secret key for token generation
- Port: Server port configuration

### Frontend Configuration
- API URL: Backend server URL in `src/config.js`
- Authentication: JWT token storage and management
- Game Settings: Word count, time limits, etc.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work and maintenance

## 🙏 Acknowledgments

- Three.js for 3D animations
- React Three Fiber for 3D rendering in React
- TailwindCSS for styling
- MongoDB Atlas for database hosting
