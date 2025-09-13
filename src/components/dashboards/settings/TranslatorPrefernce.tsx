// TranslatorPreferences Component  
import { SettingsUser } from '@/types/settings';
const TranslatorPreferences: React.FC<{ user: SettingsUser }> = ({  }) => (
  <div className="mb-8">
    <h3 className="text-lg font-medium text-gray-900 mb-6">Language Pairs</h3>
    
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium">English → Spanish</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Proficiency:</span>
            <div className="flex space-x-1">
              {[1,2,3,4].map(star => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Certified</span>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium">French → English</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Proficiency:</span>
            <div className="flex space-x-1">
              {[1,2,3,4].map(star => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <button className="ml-2 text-red-500 text-sm">Upload Certificate</button>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <button className="text-red-500 hover:text-red-700 text-sm font-medium">
      + Add Language Pair
    </button>
  </div>
);

export default TranslatorPreferences