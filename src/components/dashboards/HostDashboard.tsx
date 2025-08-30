import { HostOnly } from '@/components/auth/ProtectedRoute';

export default function HostDashboard() {
  return (
    <HostOnly>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Host Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your experiences, bookings, and earnings.
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome, Host! 🏠
            </h2>
            <p className="text-gray-600 mb-4">
              You&apos;re all set up to start hosting amazing experiences. Here&apos;s what you can do:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Create Experiences</h3>
                <p className="text-sm text-gray-600">Share your unique experiences with travelers</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">📅</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Manage Bookings</h3>
                <p className="text-sm text-gray-600">Handle reservations and guest communications</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">💰</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Track Earnings</h3>
                <p className="text-sm text-gray-600">Monitor your income and payment history</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Experiences</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          {/* ...other stat cards... */}
        </div>
      </div>
    </HostOnly>
  );
}
