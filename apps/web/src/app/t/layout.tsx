import Link from 'next/link';
import { LayoutDashboard, PhoneCall, Calendar, Settings } from 'lucide-react';

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-indigo-600">Tenant Console</h1>
        </div>
        <nav className="mt-6">
          <Link href="/t" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/t/calls" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <PhoneCall className="w-5 h-5 mr-3" />
            Calls
          </Link>
          <Link href="/t/appointments" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <Calendar className="w-5 h-5 mr-3" />
            Appointments
          </Link>
          <Link href="/t/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
