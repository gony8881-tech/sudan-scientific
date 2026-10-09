import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '../types';

export function useLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (input: RegisterInput) => authService.register(input),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (input: ForgotPasswordInput) => authService.forgotPassword(input),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: ResetPasswordInput) => authService.resetPassword(input),
  });
}
