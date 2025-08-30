import { GuestOnly } from '@/components/auth/ProtectedRoute';

export default function GuestDashboard() {
  return (
    <GuestOnly>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of saved experiences, active bookings, and upcoming tours.
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome to Your Dashboard! 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              You&apos;ve successfully signed up and logged in. This is your personalized dashboard where you can:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">📚</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Browse Tours</h3>
                <p className="text-sm text-gray-600">Discover amazing experiences around the world</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">💳</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Book Experiences</h3>
                <p className="text-sm text-gray-600">Reserve your spot on exciting adventures</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">⭐</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Track Bookings</h3>
                <p className="text-sm text-gray-600">Manage your upcoming trips and past experiences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          {/* ...other stat cards... */}
        </div>
      </div>
    </GuestOnly>
  );
}
