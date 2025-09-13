// CookieSettingsTab Component
export const CookieSettingsTab: React.FC = () => {
  const cookieTypes = [
    {
      title: "Essential Cookies",
      description: "Required for the website to function properly",
      enabled: true,
      required: true
    },
    {
      title: "Performance Cookies", 
      description: "Help us improve website performance and user experience",
      enabled: true,
      required: false
    },
    {
      title: "Functional Cookies",
      description: "Enable personalized features and functionality",
      enabled: false,
      required: false
    }
  ];

  return (
    <div>
      <div className="space-y-6">
        {cookieTypes.map((cookie, index) => (
          <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">{cookie.title}</h4>
              <p className="text-sm text-gray-600">{cookie.description}</p>
            </div>
            <div className="flex items-center">
              {cookie.required ? (
                <span className="text-sm text-gray-500">Required</span>
              ) : (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={cookie.enabled}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                </label>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
