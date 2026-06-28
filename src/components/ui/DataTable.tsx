import * as React from 'react';
import { cn } from '@/lib/utils';

interface DataTableProps<T> {
  data: T[];
  columns: { key: keyof T | string; label: string; render?: (item: T) => React.ReactNode }[];
  className?: string;
}

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-auto', className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
            {columns.map((col, index) => (
              <th
                key={String(col.key) + index}
                className="h-12 px-4 text-left align-middle font-medium text-gray-500"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr
                key={i}
                className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100"
              >
                {columns.map((col, j) => (
                  <td key={String(col.key) + j} className="p-4 align-middle">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
