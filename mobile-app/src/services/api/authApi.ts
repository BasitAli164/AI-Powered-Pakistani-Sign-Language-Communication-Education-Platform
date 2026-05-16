/**
 * Authentication API Service
 * API calls for authentication operations
 */

import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api.config';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  OTPVerification,
  ApiResponse,
  User,
} from '@/types';

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  return response.data!;
};

/**
 * Register new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    API_CONFIG.ENDPOINTS.AUTH.REGISTER,
    data
  );
  return response.data!;
};

/**
 * Verify OTP
 */
export const verifyOTP = async (data: OTPVerification): Promise<ApiResponse<{ verified: boolean }>> => {
  return await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP, data);
};

/**
 * Resend OTP
 */
export const resendOTP = async (phone: string): Promise<ApiResponse<{ sent: boolean }>> => {
  return await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.RESEND_OTP, { phone });
};

/**
 * Logout user
 */
export const logout = async (): Promise<ApiResponse> => {
  return await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
};

/**
 * Forgot password
 */
export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  return await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
};

/**
 * Reset password
 */
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ApiResponse> => {
  return await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, {
    token,
    newPassword,
  });
};

/**
 * Refresh access token
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
    { refreshToken }
  );
  return response.data!;
};

export default {
  login,
  register,
  verifyOTP,
  resendOTP,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
};

// Made with Bob
