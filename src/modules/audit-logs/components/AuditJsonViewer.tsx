'use client';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AuditJsonViewerProps {
  data: Record<string, any> | null;
  title: string;
}

export function AuditJsonViewer({ data, title }: AuditJsonViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-500 text-sm">
        No data available for {title}.
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-medium text-sm text-gray-700">{title}</span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </div>
      {isExpanded && (
        <div className="p-4 bg-gray-900 overflow-x-auto text-sm text-gray-300">
          <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
        </div>
      )}
    </div>
  );
}
