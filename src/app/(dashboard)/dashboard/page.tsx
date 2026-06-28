'use client';

import { useAuthStore } from '@/store/auth.store';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleLogout = async () => {
    await AuthService.logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-green-700 font-medium">
              You are successfully logged in!
            </p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h3 className="font-semibold text-gray-800">User Profile:</h3>
            {user ? (
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>ID:</strong> {user.id}</li>
                <li><strong>Email:</strong> {user.email}</li>
                {user.firstName && <li><strong>Name:</strong> {user.firstName} {user.lastName}</li>}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Loading user profile...</p>
            )}
          </div>

          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
