/**
 * TypeScript Type Definitions
 * Central type definitions for the entire application
 */

// ============================================
// User Types
// ============================================

export type UserType = 
  | 'deaf' 
  | 'hard_of_hearing' 
  | 'speech_impaired' 
  | 'hearing' 
  | 'family' 
  | 'teacher' 
  | 'healthcare' 
  | 'volunteer';

export type HearingLevel = 
  | 'profound' 
  | 'severe' 
  | 'moderate' 
  | 'mild' 
  | 'normal';

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth: string;
  gender: Gender;
  userType: UserType;
  hearingLevel?: HearingLevel;
  preferredLanguage: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  accessibility: {
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
    vibrationEnabled: boolean;
    flashlightAlerts: boolean;
    captionSpeed: number;
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
    emergency: boolean;
  };
  privacy: {
    shareLocation: boolean;
    showOnlineStatus: boolean;
    allowCommunityPosts: boolean;
  };
  language: {
    app: 'en' | 'ur';
    signLanguage: 'PSL' | 'ASL';
  };
}

// ============================================
// Authentication Types
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: Gender;
  userType: UserType;
  hearingLevel?: HearingLevel;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

export interface OTPVerification {
  phone: string;
  otp: string;
}

// ============================================
// Communication Types
// ============================================

export interface Conversation {
  _id: string;
  userId: string;
  title: string;
  type: 'speech_to_text' | 'sign_to_text' | 'translation';
  messages: Message[];
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  type: 'text' | 'sign' | 'audio' | 'translation';
  content: string;
  originalLanguage?: string;
  translatedLanguage?: string;
  confidence?: number;
  timestamp: string;
  speaker?: string;
}

export interface Caption {
  id: string;
  text: string;
  timestamp: number;
  confidence: number;
  language: string;
}

// ============================================
// AI Types
// ============================================

export interface SignRecognitionResult {
  gesture: string;
  confidence: number;
  timestamp: number;
  handLandmarks?: number[][];
  poseLandmarks?: number[][];
}

export interface SpeechRecognitionResult {
  text: string;
  confidence: number;
  language: string;
  timestamp: number;
}

export interface SoundDetectionResult {
  soundType: 'doorbell' | 'fire_alarm' | 'car_horn' | 'baby_crying' | 'phone_ringing' | 'knock' | 'ambulance';
  confidence: number;
  timestamp: number;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
}

// ============================================
// Education Types
// ============================================

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  category: 'alphabet' | 'numbers' | 'phrases' | 'grammar' | 'vocabulary';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: LessonContent[];
  duration: number;
  thumbnail?: string;
}

export interface LessonContent {
  type: 'video' | 'image' | 'text' | 'quiz' | 'practice';
  data: any;
  order: number;
}

export interface Progress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
  lastAccessed: string;
}

export interface Quiz {
  _id: string;
  lessonId: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'gesture_recognition';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

// ============================================
// Healthcare Types
// ============================================

export interface HealthRecord {
  _id: string;
  userId: string;
  type: 'symptom' | 'medication' | 'appointment' | 'emergency';
  title: string;
  description: string;
  date: string;
  attachments?: string[];
}

export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  notes?: string;
}

export interface Medication {
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  reminders: boolean;
}

// ============================================
// Emergency Types
// ============================================

export interface EmergencyContact {
  _id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface EmergencySOS {
  _id: string;
  userId: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  message: string;
  status: 'active' | 'resolved' | 'cancelled';
  createdAt: string;
}

// ============================================
// Community Types
// ============================================

export interface Post {
  _id: string;
  userId: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  attendees: number;
  image?: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Navigation Types
// ============================================

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  OTPVerification: { phone: string };
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Communication: undefined;
  Education: undefined;
  Community: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  SignRecognition: undefined;
  SpeechToText: undefined;
  SoundDetection: undefined;
  Emergency: undefined;
};

// ============================================
// Store Types
// ============================================

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  isOnline: boolean;
  isOfflineMode: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'ur';
}

// Made with Bob
