// FacilitationPreferences Component
import { SettingsUser } from '@/types/settings';
export const FacilitationPreferences: React.FC<{ user: SettingsUser }> = ({  }) => (
  <div className="mb-8">
    <h3 className="text-lg font-medium text-gray-900 mb-6">Facilitation Preferences</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tour Categories</label>
        <div className="relative">
          <select className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none">
            <option>Cultural, Food and wine, Adventure</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
        <div className="relative">
          <select className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none">
            <option>West coast, Pacific Northwest</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Translator Coordination</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input type="radio" name="translatorCoord" value="auto" className="text-red-500" defaultChecked />
            <span className="ml-2 text-sm text-gray-700">Auto-match</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="translatorCoord" value="manual" className="text-red-500" />
            <span className="ml-2 text-sm text-gray-700">Manual select</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tour Capacity</label>
        <div className="relative">
          <input
            type="number"
            defaultValue="25"
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>

    {/* Payout Settings */}
    <div className="mb-6">
      <h4 className="text-md font-medium text-gray-900 mb-4">Payout Settings</h4>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Direct Deposit</p>
              <p className="text-sm text-gray-500">Account ending in •••• 4789</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Default</span>
            <button className="text-sm text-red-500">Edit</button>
            <button className="text-sm text-red-500">Remove</button>
          </div>
        </div>
        <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
          Add Payment Method
        </button>
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="font-medium text-gray-900 mb-1">Payment Schedule</p>
        <p className="text-lg font-semibold text-gray-900">Weekly on Friday</p>
        <p className="text-sm text-gray-500">Payments are processed after report submission</p>
      </div>
    </div>

    {/* Availability Calendar */}
    <div>
      <h4 className="text-md font-medium text-gray-900 mb-4">Availability</h4>
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h5 className="text-lg font-medium">July 2025</h5>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 font-medium text-gray-500">{day}</div>
        ))}
        {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
          <button
            key={date}
            className={`p-2 hover:bg-gray-100 rounded ${
              date === 1 || date === 15 ? 'bg-red-500 text-white' : 'text-gray-700'
            }`}
          >
            {date}
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 border-l-4 border-red-500 bg-red-50">
        <p className="font-medium text-red-900">Pause Available</p>
        <p className="text-sm text-red-700">Temporarily stop receiving new assignments</p>
      </div>
    </div>
  </div>
);