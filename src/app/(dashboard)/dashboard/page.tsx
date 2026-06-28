'use client';

import { DashboardHeader } from '@/modules/dashboard/components/DashboardHeader';
import { DashboardGrid } from '@/modules/dashboard/components/DashboardGrid';
import { SummaryCard } from '@/modules/dashboard/components/SummaryCard';
import { EmptyState } from '@/modules/dashboard/components/EmptyState';
import { LoadingSkeleton } from '@/modules/dashboard/components/LoadingSkeleton';
import { useDashboard } from '@/modules/dashboard/hooks/useDashboard';
import { Users, FileText, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const { data: summary, isLoading, error } = useDashboard();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <DashboardHeader />

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <EmptyState message="Failed to load dashboard data. Please try again later." />
      ) : !summary ? (
        <EmptyState message="No dashboard data available." />
      ) : (
        <DashboardGrid>
          <SummaryCard 
            title="Total Customers" 
            value={summary.totalCustomers} 
            icon={<Users className="h-5 w-5" />} 
          />
          <SummaryCard 
            title="Total Invoices" 
            value={summary.totalInvoices} 
            icon={<FileText className="h-5 w-5" />} 
          />
          <SummaryCard 
            title="Total Revenue" 
            value={`$${summary.totalRevenue.toLocaleString()}`} 
            icon={<DollarSign className="h-5 w-5 text-green-600" />} 
          />
          <SummaryCard 
            title="Paid Invoices" 
            value={summary.paidInvoices} 
            icon={<CheckCircle className="h-5 w-5 text-green-500" />} 
          />
          <SummaryCard 
            title="Pending Invoices" 
            value={summary.pendingInvoices} 
            icon={<Clock className="h-5 w-5 text-yellow-500" />} 
          />
          <SummaryCard 
            title="Overdue Invoices" 
            value={summary.overdueInvoices} 
            icon={<AlertCircle className="h-5 w-5 text-red-500" />} 
          />
        </DashboardGrid>
      )}
    </div>
  );
}
