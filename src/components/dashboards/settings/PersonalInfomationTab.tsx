/* eslint-disable @next/next/no-img-element */
// components/PersonalInformationTab.tsx - Fixed version
"use client"
import React, { useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { User, UserRole } from '@/types/admin';
import TranslatorPreferences from './TranslatorPrefernce';
import { useDashboardStore } from '@/lib/stores/dashboard-store';
import { toast } from 'react-toastify';

interface PersonalInformationTabProps {
  user: User;
  // Remove onUpdateUser prop - handle updates internally
}

export const PersonalInformationTab: React.FC<PersonalInformationTabProps> = ({ user }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    updateUserProfile,
    uploadAvatar,
    profileLoading,
    profileError,
    avatarUploading,
    avatarError,
    clearProfileError,
    clearAvatarError,
    currentUser,
    fetchCurrentUserProfile // Add this to refresh user data after updates
  } = useDashboardStore();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone || '',
    email: user.email,
    location: user.hostProfile?.location || user.facilitatorProfile?.location || user.translatorProfile?.location || '',
    languages: user.hostProfile?.languages || user.facilitatorProfile?.languages || user.translatorProfile?.sourceLanguages || [],
    hourlyRate: '20', // This would come from user data
    bio: user.hostProfile?.bio || user.facilitatorProfile?.bio || user.translatorProfile?.bio || '',
    specialties: user.hostProfile?.specialties || user.facilitatorProfile?.specialties || [],
  });

  // Update form data when user changes
  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
      email: user.email,
      location: user.hostProfile?.location || user.facilitatorProfile?.location || user.translatorProfile?.location || '',
      languages: user.hostProfile?.languages || user.facilitatorProfile?.languages || user.translatorProfile?.sourceLanguages || [],
      hourlyRate: '20',
      bio: user.hostProfile?.bio || user.facilitatorProfile?.bio || user.translatorProfile?.bio || '',
      specialties: user.hostProfile?.specialties || user.facilitatorProfile?.specialties || [],
    });
  }, [user]);

  // Clear errors when component mounts
  useEffect(() => {
    clearProfileError();
    clearAvatarError();
  }, [clearProfileError, clearAvatarError]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.warning('File size must be less than 5MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.warning('Only JPEG, PNG, and WebP files are allowed');
        return;
      }

      // Preview image locally
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      try {
        // Upload to server
        await uploadAvatar(file);
        
        // Refresh user data to get updated avatar
        if (fetchCurrentUserProfile) {
          await fetchCurrentUserProfile();
        }
        
        toast.success('Profile picture updated successfully!');
      } catch (error) {
        // Reset preview on error
        setSelectedImage(null);
        console.error('Avatar upload failed:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    clearProfileError();

    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        profileData: {
          location: formData.location,
          languages: formData.languages,
          bio: formData.bio,
          specialties: formData.specialties,
        }
      };

      await updateUserProfile(updateData);
      
      // Refresh user data to get the latest updates
      if (fetchCurrentUserProfile) {
        await fetchCurrentUserProfile();
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display current avatar (priority: selectedImage > currentUser.avatar > user.avatar > default)
  const displayAvatar = selectedImage || currentUser?.avatar || user.avatar || "/images/user.jpg";
  console.log("user avatar", displayAvatar)

  return (
    <div>
      {/* Error Display */}
      {(profileError || avatarError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            {profileError || avatarError}
          </p>
        </div>
      )}

      {/* Profile Picture and Basic Info */}
      <div className="flex items-center mb-8">
        <div className="relative cursor-pointer">
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            disabled={avatarUploading}
          />

          {/* Profile Picture */}
          <div className="relative">
            <img
              src={displayAvatar}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover stroke-color p-1"
              onClick={() => !avatarUploading && fileInputRef.current?.click()}
            />
            
            {/* Loading overlay */}
            {avatarUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Camera Icon */}
          <div
            onClick={() => !avatarUploading && fileInputRef.current?.click()}
            className={`absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer shadow ${
              avatarUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Camera className="text-primary-color w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Basic Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <div className="relative">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 input focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Stephanie"
              disabled={profileLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 input focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Asoegwu"
              disabled={profileLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 input focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="+1 555-555-5555"
              disabled={profileLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 input focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
              placeholder="crownzdesigns@gmail.com"
              disabled={true} // Email shouldn't be editable here
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residence</label>
          <div className="relative">
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 input focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
              disabled={profileLoading}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Nigeria">Nigeria</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {user.role === UserRole.TRANSLATOR ? 'Preferred Languages' : 'Preferred Language'}
          </label>
          <div className="relative">
            <select
              name="languages"
              className="w-full pl-10 pr-4 py-3 input rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
              disabled={profileLoading}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bio field for all roles */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 input focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Tell us about yourself..."
            disabled={profileLoading}
          />
        </div>

        {(user.role === UserRole.HOST || user.role === UserRole.FACILITATOR) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
            <div className="relative">
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 input rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="20"
                disabled={profileLoading}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Role-specific sections */}
      {user.role === UserRole.FACILITATOR && (
        <FacilitationPreferences user={user} />
      )}

      {user.role === UserRole.TRANSLATOR && (
        <TranslatorPreferences user={user} />
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSubmitting || profileLoading}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting || profileLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            'Save details'
          )}
        </button>
      </div>
    </div>
  );
};

// FacilitationPreferences Component (unchanged)
const FacilitationPreferences: React.FC<{ user: User }> = ({ }) => (
  <div className="mb-8">
    <h3 className="text-lg font-medium text-gray-900 mb-6">Facilitation Preferences</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tour Categories</label>
        <div className="relative">
          <select className="w-full pl-4 pr-10 py-3 input rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none">
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
          <select className="w-full pl-4 pr-10 py-3 input rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none">
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
            className="w-full pl-4 pr-4 py-3 input rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
            className={`p-2 hover:bg-gray-100 rounded ${date === 1 || date === 15 ? 'bg-red-500 text-white' : 'text-gray-700'
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