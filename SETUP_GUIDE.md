# 🚀 Setup Guide - PSL Communication Platform

## Phase 1: Foundation Setup Complete! ✅

This guide will help you set up and run the PSL Communication Platform on your local machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)
- **Expo CLI** - Will be installed via npm

### Optional (for iOS development)
- **Xcode** (macOS only) - [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)

---

## 🛠️ Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/psl-communication-platform.git
cd psl-communication-platform
```

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configuration
# Use any text editor (notepad, VS Code, etc.)
```

**Important:** Update the following in your `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/psl-platform
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
```

### Step 3: Start MongoDB

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**macOS/Linux:**
```bash
# Start MongoDB
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**Alternative: Use MongoDB Atlas (Free Cloud Database)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `MONGODB_URI` in `.env`

### Step 4: Start Backend Server

```bash
# From backend directory
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 PSL Communication Platform API Server
   Port: 5000
   API Base: http://localhost:5000/api
```

### Step 5: Setup Mobile App

Open a **new terminal** window:

```bash
# Navigate to mobile app directory
cd mobile-app

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Update `.env` with your backend URL:
```env
API_URL=http://localhost:5000/api
SOCKET_URL=http://localhost:5000
```

### Step 6: Start Mobile App

```bash
# Start Expo development server
npm start
```

This will open Expo DevTools in your browser.

### Step 7: Run on Device/Emulator

**Option A: Run on Physical Device**
1. Install **Expo Go** app from Play Store (Android) or App Store (iOS)
2. Scan the QR code shown in terminal/browser
3. App will load on your device

**Option B: Run on Android Emulator**
1. Open Android Studio
2. Start an Android Virtual Device (AVD)
3. Press `a` in the Expo terminal to open on Android

**Option C: Run on iOS Simulator (macOS only)**
1. Press `i` in the Expo terminal to open on iOS

---

## 🧪 Testing the Setup

### Test Backend API

Open your browser or use Postman:

**Health Check:**
```
GET http://localhost:5000/health
```

**Register User:**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "phone": "03001234567",
  "password": "Test@123",
  "dateOfBirth": "2000-01-01",
  "gender": "male",
  "userType": "deaf"
}
```

### Test Mobile App

1. App should load successfully
2. You should see the splash screen
3. Navigate to login/register screens

---

## 📁 Project Structure

```
psl-communication-platform/
├── mobile-app/              # React Native Expo App
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # App screens
│   │   ├── navigation/      # Navigation setup
│   │   ├── services/        # API services
│   │   ├── store/           # State management (Zustand)
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── config/          # Configuration files
│   ├── assets/              # Images, fonts, etc.
│   └── package.json
│
├── backend/                 # Express.js Backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Middleware functions
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── config/          # Configuration
│   ├── server.js            # Entry point
│   └── package.json
│
└── docs/                    # Documentation
```

---

## 🔧 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed

**Solution:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Try using MongoDB Atlas (cloud database)

### Issue 2: Port Already in Use

**Solution:**
```bash
# Change PORT in backend/.env
PORT=5001
```

### Issue 3: Expo App Not Loading

**Solution:**
- Ensure your device and computer are on the same WiFi
- Try using tunnel mode: `expo start --tunnel`
- Check firewall settings

### Issue 4: TypeScript Errors in Mobile App

**Solution:**
```bash
# Install dependencies first
cd mobile-app
npm install

# TypeScript errors will resolve after packages are installed
```

### Issue 5: Cannot Find Module Errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Development Workflow

### Backend Development

```bash
cd backend
npm run dev    # Start with nodemon (auto-reload)
```

### Mobile App Development

```bash
cd mobile-app
npm start      # Start Expo dev server
npm run android # Run on Android
npm run ios    # Run on iOS (macOS only)
```

### Making Changes

1. **Backend Changes**: Server auto-reloads with nodemon
2. **Mobile Changes**: Expo hot-reloads automatically
3. **Database Changes**: Update models in `backend/src/models/`

---

## 🎯 Next Steps (Phase 2)

After Phase 1 is working, we'll implement:

1. **Speech-to-Text Integration**
   - Whisper.cpp integration
   - Real-time captions
   - Urdu language support

2. **Camera Integration**
   - Camera permissions
   - Video capture
   - Frame processing

3. **Basic Sign Recognition**
   - MediaPipe hand tracking
   - Gesture detection
   - Real-time inference

4. **UI Screens**
   - Complete authentication screens
   - Home dashboard
   - Communication interface

---

## 📚 Useful Commands

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run ESLint
```

### Mobile App
```bash
npm start        # Start Expo
npm run android  # Run on Android
npm run ios      # Run on iOS
npm test         # Run tests
npm run lint     # Run ESLint
```

---

## 🆘 Getting Help

If you encounter any issues:

1. Check this guide first
2. Review error messages carefully
3. Check the [GitHub Issues](https://github.com/yourusername/psl-communication-platform/issues)
4. Ask in the community Discord
5. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)

---

## ✅ Verification Checklist

Before moving to Phase 2, ensure:

- [ ] MongoDB is connected
- [ ] Backend server is running on port 5000
- [ ] Backend health check returns success
- [ ] Mobile app starts without errors
- [ ] Can register a new user via API
- [ ] Can login via API
- [ ] Mobile app loads on device/emulator
- [ ] No critical errors in console

---

## 🎉 Success!

If all checks pass, you're ready for **Phase 2: Core Communication Features**!

---

## 📞 Support

- **Email**: support@pslplatform.org
- **Discord**: [Join our community](https://discord.gg/pslplatform)
- **GitHub**: [Report issues](https://github.com/yourusername/psl-communication-platform/issues)

---

**Happy Coding! 🚀**