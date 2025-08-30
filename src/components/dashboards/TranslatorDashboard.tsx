import { TranslatorOnly } from '@/components/auth/ProtectedRoute';

export default function TranslatorDashboard() {
  return (
    <TranslatorOnly>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Translator Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your translation jobs and schedule.
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome, Translator! 🌍
            </h2>
            <p className="text-gray-600 mb-4">
              You&apos;re ready to bridge language barriers. Here&apos;s what you can do:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">🌍</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Translation Jobs</h3>
                <p className="text-sm text-gray-600">Handle translation requests and assignments</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">📅</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Manage Schedule</h3>
                <p className="text-sm text-gray-600">Organize your availability and bookings</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">💰</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Track Earnings</h3>
                <p className="text-sm text-gray-600">Monitor your translation income</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🌍</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          {/* ...other stat cards... */}
        </div>
      </div>
    </TranslatorOnly>
  );
}
