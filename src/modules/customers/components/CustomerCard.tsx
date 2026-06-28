import { Customer } from '../types/customer.types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

export function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 max-w-2xl">
      <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
      <div className="px-8 pb-8">
        <div className="relative -mt-16 mb-6">
          <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-md">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-4xl font-bold text-indigo-700">
              {customer.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900">{customer.name}</h2>
        <p className="mt-1 text-sm text-gray-500">Customer ID: {customer.id}</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <Mail className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Email Address</p>
              <p className="truncate text-sm font-semibold text-gray-900">{customer.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <Phone className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Phone Number</p>
              <p className="truncate text-sm font-semibold text-gray-900">{customer.phone || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <MapPin className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Address</p>
              <p className="truncate text-sm font-semibold text-gray-900">{customer.address || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Joined Date</p>
              <p className="truncate text-sm font-semibold text-gray-900">
                {new Date(customer.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
