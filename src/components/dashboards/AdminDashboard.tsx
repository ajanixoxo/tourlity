import { AdminOnly } from '@/components/auth/ProtectedRoute';

export default function AdminDashboard() {
  return (
    <AdminOnly>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage users, experiences, and platform operations.
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome, Administrator! 👨‍💼
            </h2>
            <p className="text-gray-600 mb-4">
              You have full access to manage the Tourlity platform. Heres&apos;what you can do:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">👥</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Manage Users</h3>
                <p className="text-sm text-gray-600">Oversee user accounts and permissions</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Review Experiences</h3>
                <p className="text-sm text-gray-600">Approve and manage tour experiences</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">View Reports</h3>
                <p className="text-sm text-gray-600">Monitor platform analytics and performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          {/* ...other stat cards... */}
        </div>
      </div>
    </AdminOnly>
  );
}
