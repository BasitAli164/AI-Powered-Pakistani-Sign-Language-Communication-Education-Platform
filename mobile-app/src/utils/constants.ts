/**
 * Application Constants
 * Centralized constants used throughout the application
 */

// ============================================
// App Information
// ============================================

export const APP_INFO = {
  NAME: 'PSL Communication Platform',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-Powered Pakistani Sign Language Communication & Education Platform',
  SUPPORT_EMAIL: 'support@pslplatform.org',
  WEBSITE: 'https://pslplatform.org',
};

// ============================================
// Storage Keys
// ============================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@psl_auth_token',
  REFRESH_TOKEN: '@psl_refresh_token',
  USER_DATA: '@psl_user_data',
  USER_SETTINGS: '@psl_user_settings',
  OFFLINE_DATA: '@psl_offline_data',
  CONVERSATIONS: '@psl_conversations',
  LESSONS_PROGRESS: '@psl_lessons_progress',
  EMERGENCY_CONTACTS: '@psl_emergency_contacts',
  THEME: '@psl_theme',
  LANGUAGE: '@psl_language',
  ONBOARDING_COMPLETED: '@psl_onboarding_completed',
};

// ============================================
// Languages
// ============================================

export const LANGUAGES = {
  ENGLISH: 'en',
  URDU: 'ur',
  PSL: 'psl',
  ASL: 'asl',
};

export const LANGUAGE_NAMES = {
  en: 'English',
  ur: 'اردو',
  psl: 'Pakistani Sign Language',
  asl: 'American Sign Language',
};

// ============================================
// User Types
// ============================================

export const USER_TYPES = {
  DEAF: 'deaf',
  HARD_OF_HEARING: 'hard_of_hearing',
  SPEECH_IMPAIRED: 'speech_impaired',
  HEARING: 'hearing',
  FAMILY: 'family',
  TEACHER: 'teacher',
  HEALTHCARE: 'healthcare',
  VOLUNTEER: 'volunteer',
};

export const USER_TYPE_LABELS = {
  deaf: 'Deaf',
  hard_of_hearing: 'Hard of Hearing',
  speech_impaired: 'Speech Impaired',
  hearing: 'Hearing',
  family: 'Family Member',
  teacher: 'Teacher/Educator',
  healthcare: 'Healthcare Professional',
  volunteer: 'Volunteer',
};

// ============================================
// Hearing Levels
// ============================================

export const HEARING_LEVELS = {
  PROFOUND: 'profound',
  SEVERE: 'severe',
  MODERATE: 'moderate',
  MILD: 'mild',
  NORMAL: 'normal',
};

export const HEARING_LEVEL_LABELS = {
  profound: 'Profound (90+ dB)',
  severe: 'Severe (70-90 dB)',
  moderate: 'Moderate (40-70 dB)',
  mild: 'Mild (20-40 dB)',
  normal: 'Normal (0-20 dB)',
};

// ============================================
// Sound Types
// ============================================

export const SOUND_TYPES = {
  DOORBELL: 'doorbell',
  FIRE_ALARM: 'fire_alarm',
  CAR_HORN: 'car_horn',
  BABY_CRYING: 'baby_crying',
  PHONE_RINGING: 'phone_ringing',
  KNOCK: 'knock',
  AMBULANCE: 'ambulance',
};

export const SOUND_TYPE_LABELS = {
  doorbell: '🔔 Doorbell',
  fire_alarm: '🚨 Fire Alarm',
  car_horn: '🚗 Car Horn',
  baby_crying: '👶 Baby Crying',
  phone_ringing: '📱 Phone Ringing',
  knock: '🚪 Door Knock',
  ambulance: '🚑 Ambulance Siren',
};

// ============================================
// Alert Types
// ============================================

export const ALERT_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  EMERGENCY: 'emergency',
};

// ============================================
// Lesson Categories
// ============================================

export const LESSON_CATEGORIES = {
  ALPHABET: 'alphabet',
  NUMBERS: 'numbers',
  PHRASES: 'phrases',
  GRAMMAR: 'grammar',
  VOCABULARY: 'vocabulary',
};

export const LESSON_CATEGORY_LABELS = {
  alphabet: '🔤 Alphabet',
  numbers: '🔢 Numbers',
  phrases: '💬 Common Phrases',
  grammar: '📚 Grammar',
  vocabulary: '📖 Vocabulary',
};

// ============================================
// Difficulty Levels
// ============================================

export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

export const DIFFICULTY_LABELS = {
  beginner: '🟢 Beginner',
  intermediate: '🟡 Intermediate',
  advanced: '🔴 Advanced',
};

// ============================================
// Communication Types
// ============================================

export const COMMUNICATION_TYPES = {
  SPEECH_TO_TEXT: 'speech_to_text',
  SIGN_TO_TEXT: 'sign_to_text',
  TEXT_TO_SIGN: 'text_to_sign',
  TRANSLATION: 'translation',
};

// ============================================
// Emergency Status
// ============================================

export const EMERGENCY_STATUS = {
  ACTIVE: 'active',
  RESOLVED: 'resolved',
  CANCELLED: 'cancelled',
};

// ============================================
// Validation Rules
// ============================================

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_LENGTH: 11, // Pakistan phone format
  OTP_LENGTH: 6,
  MIN_AGE: 5,
  MAX_AGE: 120,
};

// ============================================
// Regex Patterns
// ============================================

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^03[0-9]{9}$/, // Pakistan mobile format
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  NAME: /^[a-zA-Z\s]+$/,
  OTP: /^[0-9]{6}$/,
};

// ============================================
// API Settings
// ============================================

export const API_SETTINGS = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// ============================================
// Camera Settings
// ============================================

export const CAMERA_SETTINGS = {
  ASPECT_RATIO: [4, 3] as [number, number],
  QUALITY: 0.8,
  MAX_DURATION: 300, // 5 minutes
  FPS: 30,
};

// ============================================
// Audio Settings
// ============================================

export const AUDIO_SETTINGS = {
  SAMPLE_RATE: 16000,
  CHANNELS: 1,
  BIT_DEPTH: 16,
  MAX_DURATION: 600, // 10 minutes
};

// ============================================
// AI Model Settings
// ============================================

export const AI_MODEL_SETTINGS = {
  SIGN_RECOGNITION: {
    CONFIDENCE_THRESHOLD: 0.7,
    MAX_HANDS: 2,
    MIN_DETECTION_CONFIDENCE: 0.5,
    MIN_TRACKING_CONFIDENCE: 0.5,
  },
  SPEECH_RECOGNITION: {
    CONFIDENCE_THRESHOLD: 0.6,
    LANGUAGE: 'ur-PK', // Urdu Pakistan
  },
  SOUND_DETECTION: {
    CONFIDENCE_THRESHOLD: 0.75,
    BUFFER_SIZE: 1024,
  },
};

// ============================================
// Notification Settings
// ============================================

export const NOTIFICATION_SETTINGS = {
  VIBRATION_PATTERN: [0, 500, 200, 500], // milliseconds
  FLASHLIGHT_DURATION: 2000, // 2 seconds
  SOUND_ALERT_DURATION: 3000, // 3 seconds
};

// ============================================
// Pagination
// ============================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// ============================================
// File Upload
// ============================================

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10 MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/mov'],
  ALLOWED_AUDIO_TYPES: ['audio/mp3', 'audio/wav', 'audio/m4a'],
};

// ============================================
// Theme Colors
// ============================================

export const COLORS = {
  PRIMARY: '#2563EB', // Blue
  SECONDARY: '#10B981', // Green
  ACCENT: '#F59E0B', // Amber
  ERROR: '#EF4444', // Red
  WARNING: '#F59E0B', // Amber
  SUCCESS: '#10B981', // Green
  INFO: '#3B82F6', // Blue
  
  // Grayscale
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_800: '#1F2937',
  GRAY_900: '#111827',
  
  // Accessibility
  HIGH_CONTRAST_BG: '#000000',
  HIGH_CONTRAST_TEXT: '#FFFFFF',
};

// ============================================
// Font Sizes
// ============================================

export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  BASE: 16,
  LG: 18,
  XL: 20,
  '2XL': 24,
  '3XL': 30,
  '4XL': 36,
};

// ============================================
// Spacing
// ============================================

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  '2XL': 48,
  '3XL': 64,
};

// ============================================
// Border Radius
// ============================================

export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  FULL: 9999,
};

// ============================================
// Error Messages
// ============================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  CAMERA_PERMISSION: 'Camera permission is required for sign recognition.',
  MICROPHONE_PERMISSION: 'Microphone permission is required for speech recognition.',
  LOCATION_PERMISSION: 'Location permission is required for emergency services.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
};

// ============================================
// Success Messages
// ============================================

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  CONVERSATION_SAVED: 'Conversation saved successfully!',
  EMERGENCY_SENT: 'Emergency alert sent successfully!',
};

// Made with Bob
