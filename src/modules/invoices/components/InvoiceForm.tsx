'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreateInvoiceDto, InvoiceStatus } from '../types/invoice.types';
import { useRouter } from 'next/navigation';
import { useCustomers } from '@/modules/customers/hooks/useCustomers';
import { Plus, Trash } from 'lucide-react';
import { useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description required'),
  quantity: z.number().min(0.01, 'Min quantity 0.01'),
  unitPrice: z.number().min(0, 'Min price 0'),
});

const invoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  issueDate: z.string().min(1, 'Issue Date is required'),
  dueDate: z.string().min(1, 'Due Date is required'),
  status: z.nativeEnum(InvoiceStatus).optional(),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
});

interface InvoiceFormProps {
  initialData?: CreateInvoiceDto;
  onSubmit: (data: CreateInvoiceDto) => Promise<any>;
  isLoading?: boolean;
}

export function InvoiceForm({ initialData, onSubmit, isLoading }: InvoiceFormProps) {
  const router = useRouter();
  const { data: customersData, isLoading: isLoadingCustomers } = useCustomers({ limit: 100 });

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<CreateInvoiceDto>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: initialData || {
      customerId: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchItems = watch('items');
  const subtotal = watchItems.reduce((acc, item) => acc + (item.quantity || 0) * (item.unitPrice || 0), 0);
  const taxRate = 0.11; // 11% Tax
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Header Info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Customer *</label>
          <select
            {...register('customerId')}
            disabled={isLoading || isLoadingCustomers}
            className="block w-full rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Select a customer</option>
            {customersData?.data.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
            ))}
          </select>
          {errors.customerId && <p className="text-xs text-red-500">{errors.customerId.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Issue Date *</label>
          <Input type="date" {...register('issueDate')} disabled={isLoading} />
          {errors.issueDate && <p className="text-xs text-red-500">{errors.issueDate.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Due Date *</label>
          <Input type="date" {...register('dueDate')} disabled={isLoading} />
          {errors.dueDate && <p className="text-xs text-red-500">{errors.dueDate.message}</p>}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Items Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Invoice Items</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Row
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-xl overflow-hidden">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 w-32">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 w-48">Unit Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 w-48">Total</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 w-16"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="p-2">
                    <Input {...register(`items.${index}.description`)} placeholder="Item description" className="w-full" />
                    {errors.items?.[index]?.description && <p className="text-xs text-red-500 mt-1">{errors.items[index]?.description?.message}</p>}
                  </td>
                  <td className="p-2">
                    <Input type="number" step="0.01" {...register(`items.${index}.quantity`, { valueAsNumber: true })} className="w-full" />
                    {errors.items?.[index]?.quantity && <p className="text-xs text-red-500 mt-1">{errors.items[index]?.quantity?.message}</p>}
                  </td>
                  <td className="p-2">
                    <Input type="number" step="0.01" {...register(`items.${index}.unitPrice`, { valueAsNumber: true })} className="w-full" />
                    {errors.items?.[index]?.unitPrice && <p className="text-xs text-red-500 mt-1">{errors.items[index]?.unitPrice?.message}</p>}
                  </td>
                  <td className="p-2 align-middle">
                    <div className="px-3 font-medium text-gray-900">
                      {formatCurrency((watchItems[index]?.quantity || 0) * (watchItems[index]?.unitPrice || 0))}
                    </div>
                  </td>
                  <td className="p-2 text-center align-middle">
                    <button type="button" onClick={() => remove(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {errors.items?.root && <p className="text-xs text-red-500 mt-2">{errors.items.root.message}</p>}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Calculations & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (11%)</span>
            <span className="font-medium text-gray-900">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between">
            <span className="text-lg font-bold text-gray-900">Grand Total</span>
            <span className="text-2xl font-black text-indigo-700">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 border-t border-gray-100 pt-6">
        <Button variant="outline" type="button" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
          {isLoading ? 'Saving...' : 'Save Invoice'}
        </Button>
      </div>
    </form>
  );
}
