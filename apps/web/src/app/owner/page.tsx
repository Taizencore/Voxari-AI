export default function OwnerDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500 uppercase font-semibold">MRR</p>
          <p className="text-2xl font-bold">$12,450</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500 uppercase font-semibold">Active Tenants</p>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500 uppercase font-semibold">Calls Handled</p>
          <p className="text-2xl font-bold">1,205</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500 uppercase font-semibold">Incident Rate</p>
          <p className="text-2xl font-bold">0.8%</p>
        </div>
      </div>
    </div>
  );
}
