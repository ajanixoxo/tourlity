"use client"
import { useState } from 'react';
import Button from '@/components/root/button';
import BaseModal from '../modals/base-modal';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'select' | 'radio' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export type UserType = 'guest' | 'host' | 'facilitator' | 'translator';

export interface FormData {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  language?: string;
  age?: string;
  travelStyle?: string;
  accessibilityNeeds?: 'yes' | 'no';
  personalizedExperience?: 'yes' | 'no';
  password?: string;
  confirmPassword?: string;
  businessName?: string;
  location?: string;
  certification?: File;
  specialization?: string;
  experience?: string;
  languages?: string;
  [key: string]: string | File | undefined; // For extensibility
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  onSubmit: (data: FormData) => void;
}

const userTypeFields: Record<UserType, FormField[]> = {
  guest: [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g, Steph Asoegwu', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., crownzdesigns@gmail.com', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g., +1 555-555-5555', required: true },
    { name: 'country', label: 'Country of Residence', type: 'select', required: true, options: [
      { value: 'US', label: 'USA' },
      { value: 'NG', label: 'Nigeria' },
      { value: 'UK', label: 'United Kingdom' },
    ]},
    { name: 'language', label: 'Preferred Language', type: 'select', required: true, options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
    ]},
    { name: 'age', label: 'Age', type: 'text', placeholder: 'e.g., 21', required: true },
    { name: 'travelStyle', label: 'Travel Style', type: 'select', required: true, options: [
      { value: 'solo', label: 'Solo' },
      { value: 'couple', label: 'Couple' },
      { value: 'family', label: 'Family' },
      { value: 'group', label: 'Group' },
    ]},
    { name: 'accessibilityNeeds', label: 'Accessibility Needs', type: 'radio', required: true, options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ]},
    { name: 'personalizedExperience', label: 'Receive Personalized Experience', type: 'radio', required: true, options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ]},
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true },
  ],
  host: [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g, John Doe', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., john@example.com', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g., +1 555-555-5555', required: true },
    { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Your business name', required: true },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'City, Country', required: true },
    { name: 'certification', label: 'Certification', type: 'file', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true },
  ],
  facilitator: [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g, Jane Smith', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., jane@example.com', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g., +1 555-555-5555', required: true },
    { name: 'specialization', label: 'Specialization', type: 'text', placeholder: 'Your area of expertise', required: true },
    { name: 'experience', label: 'Years of Experience', type: 'text', placeholder: 'e.g., 5', required: true },
    { name: 'certification', label: 'Certification', type: 'file', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true },
  ],
  translator: [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g, Maria Garcia', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., maria@example.com', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g., +1 555-555-5555', required: true },
    { name: 'languages', label: 'Languages', type: 'text', placeholder: 'Languages you speak', required: true },
    { name: 'certification', label: 'Language Certification', type: 'file', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true },
  ],
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  isOpen, 
  onClose, 
  userType, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const fields = userTypeFields[userType] || ["Guest", "Host", "Facilitator", "Translator"];

  const handleChange = (name: string, value: string | File) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: FormField) => {
    const commonClasses = "w-full p-3 stroke-color rounded-[14px] focus:outline-none bg-white text-[14px] placeholder-[#A0A0A0] focus:border-transparent";
    
    switch (field.type) {
      case 'select':
        return (
          <select
            className={`${commonClasses}  text-gray-400`}
            value={formData[field.name] as string || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
          >
            <option className='text-gray-400' value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option  key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="flex gap-4">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="text-[#A0A0A0] focus:ring-[#FF6B6B]"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        );
      
      case 'file':
        return (
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleChange(field.name, e.target.files?.[0] || '')}
            className={commonClasses}
            required={field.required}
          />
        );
      
      default:
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] as string || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClasses}
            required={field.required}
          />
        );
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showOnMobile={false}>
      <div className="p-6 lg:p-8">
        <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
        <p className="text-gray-600 mb-6">Join us and start your journey today.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className={field.type === 'radio' ? 'lg:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <Button type="submit" variant="primary" className="w-full">
              Sign Up
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              By continuing, you agree to our Terms of Use and confirm you have read our Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};
export default RegistrationForm;