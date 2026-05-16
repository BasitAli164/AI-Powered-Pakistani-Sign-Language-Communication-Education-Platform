
/**
 * Helper Utility Functions
 * Reusable utility functions used throughout the application
 */

import { REGEX_PATTERNS, VALIDATION } from './constants';

// ============================================
// Validation Helpers
// ============================================

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  return REGEX_PATTERNS.EMAIL.test(email);
};

/**
 * Validate phone number (Pakistan format)
 */
export const isValidPhone = (phone: string): boolean => {
  return REGEX_PATTERNS.PHONE.test(phone);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  return (
    password.length >= VALIDATION.PASSWORD_MIN_LENGTH &&
    password.length <= VALIDATION.PASSWORD_MAX_LENGTH &&
    REGEX_PATTERNS.PASSWORD.test(password)
  );
};

/**
 * Validate name
 */
export const isValidName = (name: string): boolean => {
  return (
    name.length >= VALIDATION.NAME_MIN_LENGTH &&
    name.length <= VALIDATION.NAME_MAX_LENGTH &&
    REGEX_PATTERNS.NAME.test(name)
  );
};

/**
 * Validate OTP
 */
export const isValidOTP = (otp: string): boolean => {
  return REGEX_PATTERNS.OTP.test(otp);
};

/**
 * Validate age
 */
export const isValidAge = (dateOfBirth: string): boolean => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= VALIDATION.MIN_AGE && age <= VALIDATION.MAX_AGE;
};

// ============================================
// Formatting Helpers
// ============================================

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  if (phone.length === 11) {
    return `${phone.slice(0, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`;
  }
  return phone;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format time to readable string
 */
export const formatTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

/**
 * Format duration in seconds to readable string
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

/**
 * Format file size to readable string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convert to title case
 */
export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ');
};

// ============================================
// Time Helpers
// ============================================

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    return formatDate(date);
  }
};

/**
 * Check if date is today
 */
export const isToday = (date: string | Date): boolean => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    today.getDate() === checkDate.getDate() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getFullYear() === checkDate.getFullYear()
  );
};

/**
 * Check if date is yesterday
 */
export const isYesterday = (date: string | Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const checkDate = new Date(date);
  return (
    yesterday.getDate() === checkDate.getDate() &&
    yesterday.getMonth() === checkDate.getMonth() &&
    yesterday.getFullYear() === checkDate.getFullYear()
  );
};

// ============================================
// Array Helpers
// ============================================

/**
 * Chunk array into smaller arrays
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Remove duplicates from array
 */
export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

/**
 * Shuffle array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ============================================
// Object Helpers
// ============================================

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 */
export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Remove null/undefined values from object
 */
export const removeNullValues = (obj: any): any => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null)
  );
};

// ============================================
// String Helpers
// ============================================

/**
 * Generate random string
 */
export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate UUID
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Slugify string
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ============================================
// Number Helpers
// ============================================

/**
 * Clamp number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Round to decimal places
 */
export const roundToDecimal = (value: number, decimals: number): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Generate random number between min and max
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ============================================
