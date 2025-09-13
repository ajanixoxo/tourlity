import { Trash } from "lucide-react";
export const DataPrivacyTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Download Data */}
        <div className="stroke-color rounded-lg p-2">
          <div className="flex items-start  box-color rounded-[14px] p-2">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Download My Data</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get a copy of all the data we have stored about you, including your profile, bookings, and preferences.
              </p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Request Data Download
              </button>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="border border-red-200 rounded-lg p-2">
          <div className="flex items-start box-color rounded-[14px] p-2">
            <div className="flex-shrink-0">
          <Trash className="text-primary-color"/>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Request Account Deletion</h3>
              <p className="text-sm text-gray-600 mb-4">
                Request to permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Request Account Deletion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};