import { Invoice } from '../types/invoice.types';
import { StatusBadge } from './StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Mail, Phone, MapPin } from 'lucide-react';

export function InvoiceSummaryCard({ invoice }: { invoice: Invoice }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 max-w-5xl">
      <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">{invoice.invoiceNumber}</h2>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={invoice.status} />
            <span className="text-sm text-gray-500">Issued: {formatDate(invoice.issueDate)}</span>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Amount Due</p>
          <p className="text-4xl font-extrabold text-indigo-700 mt-1">{formatCurrency(invoice.totalAmount)}</p>
          <p className="text-sm text-red-500 mt-1 font-medium">Due: {formatDate(invoice.dueDate)}</p>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Billed To</h3>
            <p className="text-xl font-bold text-gray-900">{invoice.customer?.name}</p>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              {invoice.customer?.email && (
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" /> {invoice.customer.email}</div>
              )}
              {invoice.customer?.phone && (
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" /> {invoice.customer.phone}</div>
              )}
              {invoice.customer?.address && (
                <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-gray-400 mt-0.5" /> <span>{invoice.customer.address}</span></div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Invoice Details</h3>
            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <span className="text-gray-500 font-medium">Invoice ID:</span>
                <span className="font-semibold text-gray-900 truncate">{invoice.id}</span>
                <span className="text-gray-500 font-medium">Integrity Hash:</span>
                <span className="font-mono text-xs text-gray-400 truncate bg-gray-100 px-1 py-0.5 rounded" title={invoice.integrityHash}>
                  {invoice.integrityHash?.substring(0, 16)}...
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-3 text-left text-sm font-bold text-gray-900 uppercase">Description</th>
                <th className="py-3 text-center text-sm font-bold text-gray-900 uppercase">Qty</th>
                <th className="py-3 text-right text-sm font-bold text-gray-900 uppercase">Unit Price</th>
                <th className="py-3 text-right text-sm font-bold text-gray-900 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoice.items.map((item, idx) => (
                <tr key={item.id || idx} className="text-sm text-gray-700">
                  <td className="py-4 pr-4 font-medium">{item.description}</td>
                  <td className="py-4 px-4 text-center">{item.quantity}</td>
                  <td className="py-4 px-4 text-right">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-4 pl-4 text-right font-semibold text-gray-900">{formatCurrency(item.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-1/2">
            {/* {invoice.notes && (
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Notes</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl italic">
                  {invoice.notes}
                </p>
              </div>
            )} */}
          </div>
          <div className="w-full md:w-1/3 space-y-3 text-sm border-t border-gray-100 md:border-none pt-4 md:pt-0">
            <div className="flex justify-between text-gray-600">
              <span className="font-medium">Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="font-medium">Tax ({invoice.taxRate * 100}%)</span>
              <span>{formatCurrency(invoice.taxAmount)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-black text-gray-900">
              <span>Grand Total</span>
              <span>{formatCurrency(invoice.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
