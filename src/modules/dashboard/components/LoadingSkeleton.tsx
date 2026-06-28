import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { DashboardGrid } from './DashboardGrid';

export function LoadingSkeleton() {
  return (
    <DashboardGrid>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 w-24 rounded bg-gray-200"></div>
            <div className="h-4 w-4 rounded-full bg-gray-200"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 rounded bg-gray-200 mb-2"></div>
            <div className="h-3 w-32 rounded bg-gray-200"></div>
          </CardContent>
        </Card>
      ))}
    </DashboardGrid>
  );
}
