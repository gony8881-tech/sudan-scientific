import type { AppRole, ProfileRow } from './database';

export interface AuthUser {
  id: string;
  email: string | null;
}

export type AuthProfile = ProfileRow;

export interface AuthState {
  user: AuthUser | null;
  profile: AuthProfile | null;
  role: AppRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  confirmPassword: string;
}
