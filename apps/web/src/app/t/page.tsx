export default function TenantDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clinic Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500 uppercase font-semibold">Bookings Today</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500 uppercase font-semibold">Missed Calls Recovered</p>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500 uppercase font-semibold">AI Handled %</p>
          <p className="text-2xl font-bold">94%</p>
        </div>
      </div>
    </div>
  );
}
