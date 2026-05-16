/**
 * API Configuration
 * Centralized configuration for all API endpoints and settings
 */

// Get environment variables (in production, use react-native-dotenv or expo-constants)
const API_URL = process.env.API_URL || 'http://localhost:5000/api';
const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:5000';
const AI_API_URL = process.env.AI_API_URL || 'http://localhost:8000';

export const API_CONFIG = {
  // Base URLs
  BASE_URL: API_URL,
  SOCKET_URL: SOCKET_URL,
  AI_BASE_URL: AI_API_URL,

  // Timeouts
  TIMEOUT: 30000, // 30 seconds
  SOCKET_TIMEOUT: 10000, // 10 seconds

  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh',
      VERIFY_OTP: '/auth/verify-otp',
      RESEND_OTP: '/auth/resend-otp',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },

    // User
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile',
      CHANGE_PASSWORD: '/user/change-password',
      DELETE_ACCOUNT: '/user/delete',
      SETTINGS: '/user/settings',
    },

    // Communication
    COMMUNICATION: {
      CONVERSATIONS: '/communication/conversations',
      SAVE_CONVERSATION: '/communication/save',
      GET_CONVERSATION: '/communication/:id',
      DELETE_CONVERSATION: '/communication/:id',
    },

    // Education
    EDUCATION: {
      LESSONS: '/education/lessons',
      PROGRESS: '/education/progress',
      QUIZ: '/education/quiz',
      NOTES: '/education/notes',
    },

    // Healthcare
    HEALTHCARE: {
      RECORDS: '/healthcare/records',
      SYMPTOMS: '/healthcare/symptoms',
      MEDICATIONS: '/healthcare/medications',
      APPOINTMENTS: '/healthcare/appointments',
    },

    // Emergency
    EMERGENCY: {
      CONTACTS: '/emergency/contacts',
      SEND_SOS: '/emergency/sos',
      HISTORY: '/emergency/history',
    },

    // Community
    COMMUNITY: {
      POSTS: '/community/posts',
      EVENTS: '/community/events',
      FORUMS: '/community/forums',
      VOLUNTEERS: '/community/volunteers',
    },

    // AI Services
    AI: {
      SIGN_RECOGNITION: '/ai/sign-recognition',
      SPEECH_TO_TEXT: '/ai/speech-to-text',
      TEXT_TO_SIGN: '/ai/text-to-sign',
      SOUND_DETECTION: '/ai/sound-detection',
      TRANSLATION: '/ai/translation',
    },
  },

  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export default API_CONFIG;

// Made with Bob
