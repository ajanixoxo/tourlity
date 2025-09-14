"use client"
import React, { useState } from 'react';


import { PersonalInformationTab } from '@/components/dashboards/settings/PersonalInfomationTab';
import { AccountSecurityTab } from '@/components/dashboards/settings/AccountSecurityTab';
import { NotificationPreferencesTab } from '@/components/dashboards/settings/NotificationPrefernce';
import { CookieSettingsTab } from '@/components/dashboards/settings/Cookie';
import { DataPrivacyTab } from '@/components/dashboards/settings/DataPrivacy';
import { useAuthStore } from '@/lib/stores/auth-store';
import Button from '@/components/root/button';


const SettingsPage: React.FC = ({  }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const { user: authUser, isAuthenticated, isLoading } = useAuthStore();

  const user = authUser;
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-600">Loading settings...</div>
      </div>
    );
  }
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-600">Please log in to access settings.</div>
      </div>
    );
  }
  const tabs = [
    { id: 'personal', label: 'Personal information' },
    { id: 'security', label: 'Account security' },
    { id: 'notifications', label: 'Notification preferences' },
    { id: 'cookies', label: 'Cookies settings' },
    { id: 'privacy', label: 'Data and privacy' },
  ];



  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInformationTab user={user} />;
      case 'security':
        return <AccountSecurityTab user={user} />;
      case 'notifications':
        return <NotificationPreferencesTab user={user} />;
      case 'cookies':
        return <CookieSettingsTab />;
      case 'privacy':
        return <DataPrivacyTab />;
      default:
        return <PersonalInformationTab user={user}  />;
    }
  };

  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className="md:max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your profile, notification preferences, and security.</p>
        </div>

        {/* Tab Navigation */}
        <div className=" space-x-2 mb-8  p-1 rounded-xl w-full overflow-x-auto sm:grid sm:grid-cols-5 flex whitespace-nowrap">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={`${activeTab === tab.id ? "primary": "secondary"}`}
              className={`px-2 text-xs py-2`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage