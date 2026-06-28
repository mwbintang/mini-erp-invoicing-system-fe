'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Hexagon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthService } from '@/modules/auth/services/auth.service';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await AuthService.logout();
    router.push('/login');
  };

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-100/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="flex h-20 shrink-0 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Hexagon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">NexaERP</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-6 gap-2">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-indigo-50/80 text-indigo-700 shadow-sm shadow-indigo-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-transform duration-200 group-hover:scale-110',
                  isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                )}
              />
              {item.name}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 border border-gray-100">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-white hover:text-red-600 hover:shadow-sm"
          >
            <LogOut className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:scale-110 group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
