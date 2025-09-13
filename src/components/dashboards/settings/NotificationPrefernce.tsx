import { SettingsUser } from '@/types/settings';
import { Switch } from '@/components/ui/switch';

export const NotificationPreferencesTab: React.FC<{ user: SettingsUser }> = ({ }) => {
  const notifications = [
    {
      title: "Booking Confirmations",
      description: "Receive notifications when your booking is confirmed",
      enabled: true
    },
    {
      title: "Host Updates",
      description: "Get updates from your tour hosts",
      enabled: true
    },
    {
      title: "Tour Reminders",
      description: "Reminders about upcoming tours and activities",
      enabled: false
    },
    {
      title: "New Offers",
      description: "Special deals and promotions",
      enabled: true
    },
    {
      title: "Payment Confirmations",
      description: "Notifications about payments and refunds",
      enabled: true
    }
  ];

  return (
    <div>
      <div className="space-y-6">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
              <p className="text-sm text-gray-600">{notification.description}</p>
            </div>
            <Switch  />
          </div>
        ))}
      </div>
    </div>
  );
};
