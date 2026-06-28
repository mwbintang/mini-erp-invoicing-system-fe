'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AuthService } from '@/services/auth.service';
import { ROUTES } from '@/config/routes';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await AuthService.login(data);
      router.push(ROUTES.DASHBOARD.HOME);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
        <p className="text-sm text-gray-500">Enter your credentials to access the ERP</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register('email')}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
