# Pakistani Sign Language (PSL) AI Platform

A production-ready, real-time AI-powered communication and education platform for Pakistani Sign Language users.

## 🎯 Project Vision

Build a real-world accessibility platform that enables deaf and mute users in Pakistan to communicate effectively using AI-powered sign language recognition, converting PSL gestures to text and speech in real-time.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (React Native)                │
│  - Camera capture                                            │
│  - Real-time video streaming                                 │
│  - UI/UX for accessibility                                   │
│  - Text-to-Speech output                                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ WebSocket + REST API
                   │
┌──────────────────▼──────────────────────────────────────────┐
│              Backend API Server (Node.js/Express)            │
│  - Authentication & Authorization                            │
│  - User management                                           │
│  - Conversation history                                      │
│  - Request routing                                           │
│  - WebSocket management                                      │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ HTTP/WebSocket
                   │
┌──────────────────▼──────────────────────────────────────────┐
│           AI/ML Server (Python FastAPI)                      │
│  - MediaPipe hand detection                                  │
│  - Landmark extraction                                       │
│  - CNN+LSTM model inference                                  │
│  - Real-time prediction                                      │
│  - Model training pipeline                                   │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                    Data Layer                                │
│  - MongoDB Atlas (user data, history)                        │
│  - AWS S3 / Cloudinary (media storage)                       │
│  - Model storage (trained models)                            │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
sign-language-ai-platform/
├── ai-server/                    # Python FastAPI AI/ML server
│   ├── app/
│   │   ├── api/                  # API endpoints
│   │   ├── core/                 # Core configurations
│   │   ├── models/               # ML model definitions
│   │   ├── services/             # Business logic
│   │   ├── utils/                # Utility functions
│   │   └── main.py               # FastAPI application
│   ├── datasets/                 # Dataset management
│   ├── training/                 # Training pipelines
│   ├── tests/                    # Unit tests
│   ├── environment.yml           # Conda environment
│   ├── requirements.txt          # Python dependencies
│   └── Dockerfile                # Docker configuration
│
├── backend/                      # Node.js Express API server
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── models/               # Database models
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Middleware functions
│   │   ├── services/             # Business logic
│   │   ├── utils/                # Utility functions
│   │   ├── config/               # Configuration
│   │   └── server.js             # Express application
│   ├── tests/                    # Unit tests
│   ├── package.json              # Node dependencies
│   └── Dockerfile                # Docker configuration
│
├── mobile-app/                   # React Native mobile app
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── screens/              # App screens
│   │   ├── navigation/           # Navigation setup
│   │   ├── services/             # API services
│   │   ├── utils/                # Utility functions
│   │   ├── hooks/                # Custom hooks
│   │   ├── context/              # Context providers
│   │   └── App.tsx               # Main app component
│   ├── assets/                   # Images, fonts, etc.
│   ├── package.json              # Dependencies
│   └── app.json                  # Expo configuration
│
├── docker-compose.yml            # Multi-container setup
├── .github/                      # CI/CD workflows
├── docs/                         # Documentation
└── README.md                     # This file
```

## 🚀 Features

### Core Features
- ✅ Real-time PSL gesture recognition from camera
- ✅ Sign-to-text conversion
- ✅ Sign-to-speech conversion (Urdu + English)
- ✅ Live video processing pipeline
- ✅ Two-way conversation mode
- ✅ Emergency communication mode
- ✅ PSL learning module
- ✅ AI feedback for learning improvement

### Technical Features
- ✅ Multi-hand tracking support
- ✅ Temporal sequence processing
- ✅ GPU acceleration support
- ✅ WebSocket streaming for real-time inference
- ✅ Offline caching support
- ✅ Conversation history storage
- ✅ Dataset contribution system
- ✅ Model versioning and rollback
- ✅ Analytics dashboard

## 🛠️ Tech Stack

### Frontend
- **React Native** (Expo) - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation management
- **Expo Camera** - Camera access
- **Expo Speech** - Text-to-speech
- **AsyncStorage** - Offline caching

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Socket.io** - WebSocket support
- **Multer** - File uploads

### AI/ML
- **Python 3.10** - Programming language
- **FastAPI** - High-performance API framework
- **MediaPipe** - Hand detection and tracking
- **TensorFlow** - Deep learning framework
- **OpenCV** - Computer vision
- **NumPy** - Numerical computing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD
- **AWS/GCP** - Cloud deployment

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.10
- Miniconda
- Docker & Docker Compose
- MongoDB Atlas account
- AWS/Cloudinary account (for storage)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/sign-language-ai-platform.git
cd sign-language-ai-platform
```

### 2. Setup AI Server
```bash
cd ai-server

# Create conda environment
conda env create -f environment.yml
conda activate psl-ai

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configurations

# Run server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Setup Backend Server
```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configurations

# Run server
npm run dev
```

### 4. Setup Mobile App
```bash
cd mobile-app

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configurations

# Run app
npm start
```

### 5. Docker Setup (Recommended)
```bash
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

## 🎓 Initial PSL Gesture Set

The platform starts with 20 essential gestures:

1. Hello
2. Thank You
3. Yes
4. No
5. Help
6. Water
7. Food
8. Emergency
9. Doctor
10. Family
11. Hospital
12. Police
13. Pain
14. Home
15. School
16. Stop
17. Come
18. Go
19. Good
20. Bad

**Scalability**: System designed to support 1000+ gestures.

## 🎯 Performance Targets

- **Inference Latency**: <200ms
- **FPS**: 20-30 frames per second
- **Accuracy**: 85%+ (initial target)
- **Scalability**: 100,000+ concurrent users
- **Mobile Support**: Low-end Android devices

## 🔒 Security

- JWT-based authentication
- Role-based access control (RBAC)
- API rate limiting
- Input validation and sanitization
- Secure file uploads
- Environment variable protection
- HTTPS/WSS encryption

## 📊 API Documentation

### AI Server Endpoints
- `GET /health` - Health check
- `POST /predict` - Single frame prediction
- `WS /predict-stream` - Real-time streaming prediction
- `POST /extract-landmarks` - Extract hand landmarks
- `POST /train` - Trigger model training
- `GET /evaluate` - Model evaluation metrics
- `POST /upload-dataset` - Upload training data
- `GET /model-info` - Model metadata

### Backend Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `POST /conversations` - Save conversation
- `GET /conversations` - Get conversation history
- `POST /feedback` - Submit feedback
- `GET /analytics` - Get analytics data

## 🧪 Testing

```bash
# AI Server tests
cd ai-server
pytest tests/ -v

# Backend tests
cd backend
npm test

# Mobile app tests
cd mobile-app
npm test
```

## 🚀 Deployment

### Production Deployment
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to cloud
docker-compose -f docker-compose.prod.yml up -d
```

### CI/CD Pipeline
GitHub Actions automatically:
- Runs tests on push
- Builds Docker images
- Deploys to staging/production
- Runs security scans

## 📈 Monitoring

- Application logs
- Performance metrics
- Error tracking
- User analytics
- Model performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Target Users

- Deaf and mute users
- PSL instructors and teachers
- Students learning sign language
- Healthcare professionals
- Emergency response teams
- NGOs and accessibility organizations
- Families of deaf users
- Government accessibility programs

## 🌟 Acknowledgments

- Pakistani Sign Language research community
- MediaPipe team for hand tracking
- Open-source contributors
- Accessibility advocates in Pakistan

## 📞 Support

For support, email support@psl-platform.com or join our Slack channel.

## 🗺️ Roadmap

- [x] Phase 1: Core infrastructure setup
- [ ] Phase 2: Basic gesture recognition (20 gestures)
- [ ] Phase 3: Expanded gesture library (100 gestures)
- [ ] Phase 4: Conversation mode
- [ ] Phase 5: Learning module
- [ ] Phase 6: Emergency features
- [ ] Phase 7: Scale to 1000+ gestures
- [ ] Phase 8: National deployment

---

**Built with ❤️ for the Pakistani deaf community**