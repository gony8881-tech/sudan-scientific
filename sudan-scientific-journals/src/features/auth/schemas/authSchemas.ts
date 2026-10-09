import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('بريد إلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 أحرف'),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'الاسم الكامل مطلوب'),
    email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('بريد إلكتروني غير صالح'),
    password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 أحرف'),
    confirmPassword: z.string().min(6, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('بريد إلكتروني غير صالح'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 أحرف'),
    confirmPassword: z.string().min(6, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
