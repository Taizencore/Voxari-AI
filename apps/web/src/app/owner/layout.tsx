import Link from 'next/link';
import { LayoutDashboard, Users, CreditCard, AlertCircle, Settings } from 'lucide-react';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-indigo-600">OwnerOS</h1>
        </div>
        <nav className="mt-6">
          <Link href="/owner" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Overview
          </Link>
          <Link href="/owner/prospects" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <Users className="w-5 h-5 mr-3" />
            Prospects
          </Link>
          <Link href="/owner/payments" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <CreditCard className="w-5 h-5 mr-3" />
            Payments
          </Link>
          <Link href="/owner/incidents" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <AlertCircle className="w-5 h-5 mr-3" />
            Incidents
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
