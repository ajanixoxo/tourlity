"use client"
import { useState } from 'react';
import Button from '@/components/root/button';
import BaseModal from '../modals/base-modal';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from 'lucide-react';

// Reusable File Upload Component
interface FileUploadProps {
  label: string;
  accept?: string;
  required?: boolean;
  value?: File | null;
  onChange: (file: File | null) => void;
  placeholder?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = ".pdf,.jpg,.jpeg,.png",
  required = false,
  value,
  onChange,
  // placeholder = "Click to upload or drag and drop"
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onChange(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}

      </label>
      <div
        className={`relative stroke-color rounded-[14px] p-6 text-center bg-white transition-colors ${dragOver ? 'border-[#FF6B6B] bg-red-50' : ''
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          required={required}
        />
        <div className="flex flex-col items-center">
          {label == 'Upload Hotel Image' ? (
            <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3.5" y="3.5" width="40" height="40" rx="20" fill="#F2F4F7" />
              <rect x="3.5" y="3.5" width="40" height="40" rx="20" stroke="#F9FAFB" strokeWidth="6" />
              <g clip-path="url(#clip0_4328_24690)">
                <path d="M26.8326 26.8332L23.4992 23.4999M23.4992 23.4999L20.1659 26.8332M23.4992 23.4999V30.9999M30.4909 28.8249C31.3037 28.3818 31.9458 27.6806 32.3158 26.8321C32.6858 25.9835 32.7627 25.0359 32.5344 24.1388C32.3061 23.2417 31.7855 22.4462 31.0548 21.8778C30.3241 21.3094 29.425 21.0005 28.4992 20.9999H27.4492C27.197 20.0243 26.7269 19.1185 26.0742 18.3507C25.4215 17.5829 24.6033 16.9731 23.681 16.5671C22.7587 16.161 21.7564 15.9694 20.7493 16.0065C19.7423 16.0436 18.7568 16.3085 17.8669 16.7813C16.977 17.2541 16.2058 17.9225 15.6114 18.7362C15.017 19.55 14.6148 20.4879 14.4351 21.4794C14.2553 22.4709 14.3027 23.4903 14.5736 24.461C14.8445 25.4316 15.3319 26.3281 15.9992 27.0832" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_4328_24690">
                  <rect width="20" height="20" fill="white" transform="translate(13.5 13.5)" />
                </clipPath>
              </defs>
            </svg>) : (
            <svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.765625" width="40" height="40" rx="20" stroke="#E0E0E0" strokeOpacity="0.7" />
              <g clip-path="url(#clip0_4328_10633)">
                <path d="M23.8326 24.0989L20.4992 20.7655M20.4992 20.7655L17.1659 24.0989M20.4992 20.7655V28.2655M27.4909 26.0905C28.3037 25.6474 28.9458 24.9463 29.3158 24.0977C29.6858 23.2492 29.7627 22.3016 29.5344 21.4044C29.3061 20.5073 28.7855 19.7118 28.0548 19.1434C27.3241 18.575 26.425 18.2661 25.4992 18.2655H24.4492C24.197 17.2899 23.7269 16.3841 23.0742 15.6164C22.4215 14.8486 21.6033 14.2387 20.681 13.8327C19.7587 13.4267 18.7564 13.235 17.7493 13.2721C16.7423 13.3092 15.7568 13.5741 14.8669 14.0469C13.977 14.5197 13.2058 15.1881 12.6114 16.0018C12.017 16.8156 11.6148 17.7535 11.4351 18.745C11.2553 19.7366 11.3027 20.756 11.5736 21.7266C11.8445 22.6972 12.3319 23.5938 12.9992 24.3489" stroke="#A0A0A0" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_4328_10633">
                  <rect width="20" height="20" fill="white" transform="translate(10.5 10.7656)" />
                </clipPath>
              </defs>
            </svg>


          )}


          <p className="text-sm text-gray-600 mb-1">
            <span className="text-[#FF6B6B] font-medium cursor-pointer">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
        </div>
        {value && (
          <div className="mt-3 p-2 bg-gray-50 rounded flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <span className="text-sm text-gray-700">{value.name}</span>
            </div>
            <span className="text-xs text-green-600">100% uploaded</span>
          </div>
        )}
      </div>
    </div>
  );
};

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'select' | 'radio' | 'file' | 'textarea' | 'multiselect' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  accept?: string;
  rows?: number;
  maxLength?: number;
}

export type UserType = 'guest' | 'host' | 'facilitator' | 'translator';

export interface RegistrationFormData  {
  // Guest fields
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  language?: string;
  age?: string;
  travelStyle?: string;
  accessibilityNeeds?: 'yes' | 'no';
  personalizedExperience?: 'yes' | 'no';
  disability?: 'yes' | 'no';
  disabilityType?: string;
  password?: string;
  confirmPassword?: string;

  // Host fields
  businessName?: string;
  contactPersonName?: string;
  priceRange?: string;
  experienceTitle?: string;
  typeOfExperience?: string;
  hotelImages?: File[];
  certifications?: File;

  // Facilitator fields
  shortBio?: string;
  areasCountries?: string;
  typesOfExperiences?: string[];
  yearsOfExperience?: string;
  availability?: string;

  // Translator fields
  otherLanguages?: string[];
  translationStyle?: string;
  yearsOfTranslationExperience?: string;
  languageCertifications?: File;

  [key: string]: string | File | File[] | string[] | undefined;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  onSubmit: (data: RegistrationFormData | FormData) => void;
}

// Short SVG icons
const icons = {
  user: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.38505 10.8207C3.44187 11.3823 0.96891 12.5291 2.47511 13.9641C3.21087 14.665 4.03033 15.1663 5.06058 15.1663H10.9394C11.9697 15.1663 12.7891 14.665 13.5249 13.9641C15.0311 12.5291 12.5581 11.3823 11.615 10.8207C9.40321 9.50377 6.59679 9.50377 4.38505 10.8207Z" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 4.83301C11 6.48986 9.65685 7.83301 8 7.83301C6.34315 7.83301 5 6.48986 5 4.83301C5 3.17615 6.34315 1.83301 8 1.83301C9.65685 1.83301 11 3.17615 11 4.83301Z" stroke="#A0A0A0" />
  </svg>,


  email: <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.83203 4.5L6.44071 7.11131C8.13976 8.07401 8.85763 8.07401 10.5567 7.11131L15.1654 4.5" stroke="#A0A0A0" strokeLinejoin="round" />
    <path d="M1.84254 9.48342C1.88613 11.5271 1.90792 12.549 2.662 13.3059C3.41609 14.0629 4.46559 14.0892 6.56458 14.142C7.85824 14.1745 9.13916 14.1745 10.4328 14.142C12.5318 14.0892 13.5813 14.0629 14.3354 13.3059C15.0895 12.549 15.1113 11.5271 15.1549 9.48342C15.1689 8.8263 15.1689 8.17306 15.1549 7.51594C15.1113 5.47225 15.0895 4.4504 14.3354 3.69345C13.5813 2.9365 12.5318 2.91013 10.4328 2.85739C9.13916 2.82488 7.85824 2.82488 6.56458 2.85738C4.46558 2.91012 3.41609 2.93648 2.662 3.69344C1.90791 4.45039 1.88612 5.47224 1.84254 7.51593C1.82853 8.17305 1.82853 8.8263 1.84254 9.48342Z" stroke="#A0A0A0" strokeLinejoin="round" />

  </svg>,

  phone: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.51711 8.46125C1.8851 7.35921 1.57993 6.45933 1.39592 5.54715C1.12378 4.19806 1.74657 2.88021 2.77829 2.03932C3.21433 1.68393 3.71419 1.80535 3.97203 2.26794L4.55415 3.31228C5.01556 4.14005 5.24626 4.55394 5.2005 4.99274C5.15474 5.43153 4.84361 5.78892 4.22135 6.50368L2.51711 8.46125ZM2.51711 8.46125C3.79637 10.6919 5.80392 12.7005 8.03713 13.9813M8.03713 13.9813C9.13916 14.6133 10.039 14.9184 10.9512 15.1024C12.3003 15.3746 13.6182 14.7518 14.459 13.7201C14.8144 13.284 14.693 12.7842 14.2304 12.5263L13.1861 11.9442C12.3583 11.4828 11.9444 11.2521 11.5056 11.2979C11.0668 11.3436 10.7095 11.6548 9.99469 12.277L8.03713 13.9813Z" stroke="#A0A0A0" strokeLinejoin="round" />
  </svg>,

  location: <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.83203 7.16699L5.16536 3.16699M5.16536 3.16699L8.77484 6.77647C8.96753 6.96915 9.06387 7.0655 9.18639 7.11625C9.3089 7.16699 9.44515 7.16699 9.71765 7.16699L15.1654 7.16699L12.6316 4.1265C12.2384 3.65467 12.0418 3.41875 11.7731 3.29287C11.5043 3.16699 11.1972 3.16699 10.583 3.16699L5.16536 3.16699Z" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.83333 5.83398L7.83333 13.834H2.5L2.5 6.40541" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.83203 13.8333L14.4987 13.8333L14.4987 6.5" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.16797 5.50033L3.16797 3.16699" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.172 8.5L5.16602 8.5" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.16797 13.8337L5.16797 11.167" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.4987 9.83398L11.832 9.83398" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,


  language: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66797 6.08653H7.66797M11.3346 6.08653H9.66797M7.66797 6.08653H9.66797M7.66797 6.08653V5.16699M9.66797 6.08653C9.31631 7.34407 8.57991 8.53281 7.7394 9.5775M5.59654 11.8337C6.276 11.2089 7.0434 10.4426 7.7394 9.5775M7.7394 9.5775C7.31083 9.07504 6.71083 8.26208 6.5394 7.89426M7.7394 9.5775L9.02511 10.9141" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.66797 8.50033C1.66797 5.51476 1.66797 4.02198 2.59546 3.09449C3.52296 2.16699 5.01574 2.16699 8.0013 2.16699C10.9869 2.16699 12.4796 2.16699 13.4071 3.09449C14.3346 4.02198 14.3346 5.51476 14.3346 8.50033C14.3346 11.4859 14.3346 12.9787 13.4071 13.9062C12.4796 14.8337 10.9869 14.8337 8.0013 14.8337C5.01574 14.8337 3.52296 14.8337 2.59546 13.9062C1.66797 12.9787 1.66797 11.4859 1.66797 8.50033Z" stroke="#A0A0A0" />
  </svg>,

  calendar: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1.83301V3.16634M4 1.83301V3.16634" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.99571 9.16699H8.00169M7.99571 11.8337H8.00169M10.6594 9.16699H10.6654M5.33203 9.16699H5.33801M5.33203 11.8337H5.33801" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.33203 5.83301H13.6654" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.66797 8.66216C1.66797 5.75729 1.66797 4.30486 2.50271 3.40243C3.33746 2.5 4.68096 2.5 7.36797 2.5H8.63464C11.3216 2.5 12.6651 2.5 13.4999 3.40243C14.3346 4.30486 14.3346 5.75729 14.3346 8.66216V9.0045C14.3346 11.9094 14.3346 13.3618 13.4999 14.2642C12.6651 15.1667 11.3216 15.1667 8.63464 15.1667H7.36797C4.68096 15.1667 3.33746 15.1667 2.50271 14.2642C1.66797 13.3618 1.66797 11.9094 1.66797 9.0045V8.66216Z" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 5.83301H14" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

  ,


  travel: <svg width={13} height={15} viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.44475 7.44521L3.65906 6.09738C4.03065 5.87156 4.21644 5.75865 4.3447 5.60378C4.89975 4.93355 4.41096 3.94364 4.49372 3.16425C4.5794 2.35748 5.34876 1.25406 6.12426 0.911973C6.36294 0.806686 6.63674 0.806686 6.87542 0.911973C7.65092 1.25406 8.42028 2.35748 8.50595 3.16425C8.58872 3.94364 8.09992 4.93355 8.65498 5.60378C8.78323 5.75865 8.96903 5.87156 9.34061 6.09738L11.5551 7.44514C12.2329 7.85762 12.4998 8.29785 12.4998 9.126C12.4998 9.57671 12.3004 9.69754 11.8982 9.60553L8.01499 8.71709L7.84063 10.243C7.77741 10.7962 7.7458 11.0728 7.83721 11.3262C8.0513 11.9197 8.77821 12.4057 9.22216 12.8374C9.4675 13.076 9.73527 13.7619 9.4555 14.0739C9.28278 14.2665 9.00221 14.1101 8.80912 14.035L6.95001 13.312C6.7277 13.2255 6.61655 13.1823 6.49984 13.1823C6.38312 13.1823 6.27196 13.2255 6.04967 13.312L4.19056 14.035C3.99746 14.1101 3.71689 14.2665 3.54417 14.0739C3.2644 13.7619 3.53217 13.076 3.77752 12.8374C4.22147 12.4057 4.94837 11.9197 5.16246 11.3262C5.25388 11.0728 5.22227 10.7962 5.15905 10.243L4.98468 8.71709L1.10173 9.60547C0.699349 9.69753 0.499881 9.57666 0.500004 9.12573C0.500229 8.29774 0.767136 7.85767 1.44475 7.44521Z" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,


  accessibility: <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 3.33301C10.5 4.43758 9.32786 5.66634 8.5 5.66634C7.67214 5.66634 6.5 4.43758 6.5 3.33301C6.5 2.22844 7.39543 1.33301 8.5 1.33301C9.60457 1.33301 10.5 2.22844 10.5 3.33301Z" stroke="#A0A0A0" />
    <path d="M11.1943 6C12.2096 6.89021 12.8675 8.39791 12.2767 9.80344C12.1494 10.1063 11.8574 10.3026 11.5342 10.3026C11.2057 10.3026 10.666 10.1973 10.5611 10.625L9.8296 13.6082C9.67707 14.2303 9.12888 14.6667 8.49999 14.6667C7.8711 14.6667 7.32292 14.2303 7.17039 13.6082L6.43888 10.625C6.33402 10.1973 5.79433 10.3026 5.46575 10.3026C5.1426 10.3026 4.85055 10.1063 4.72325 9.80344C4.13244 8.39791 4.79039 6.89021 5.80571 6" stroke="#A0A0A0" strokeLinecap="round" />
  </svg>,


  lock: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.32985 10.5L9.33464 10.5M6.66797 10.5L6.67275 10.5" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.33203 10.4997C3.33203 7.92235 5.42137 5.83301 7.9987 5.83301C10.576 5.83301 12.6654 7.92235 12.6654 10.4997C12.6654 13.077 10.576 15.1663 7.9987 15.1663C5.42137 15.1663 3.33203 13.077 3.33203 10.4997Z" stroke="#A0A0A0" />
    <path d="M11 6.83301V4.83301C11 3.17615 9.65685 1.83301 8 1.83301C6.34315 1.83301 5 3.17615 5 4.83301V6.83301" stroke="#A0A0A0" strokeLinecap="round" />
  </svg>,


  business: <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" stroke="currentColor" strokeWidth="1.5" /></svg>,

  price: <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.1654 8.49967C10.1654 9.42015 9.41917 10.1663 8.4987 10.1663C7.57822 10.1663 6.83203 9.42015 6.83203 8.49967C6.83203 7.5792 7.57822 6.83301 8.4987 6.83301C9.41917 6.83301 10.1654 7.5792 10.1654 8.49967Z" stroke="#A0A0A0" />
    <path d="M13.1654 7.92769C12.9486 7.8963 12.726 7.87238 12.4987 7.85648M4.4987 9.14355C4.27135 9.12765 4.04877 9.10373 3.83203 9.07235" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.4987 13.4997C7.61034 13.9146 6.44341 14.1663 5.16536 14.1663C4.45475 14.1663 3.77849 14.0885 3.16536 13.9481C2.16508 13.719 1.83203 13.1173 1.83203 12.0904V4.90899C1.83203 4.25244 2.52539 3.80149 3.16536 3.94808C3.77849 4.08851 4.45475 4.16634 5.16536 4.16634C6.44341 4.16634 7.61034 3.91458 8.4987 3.49967C9.38706 3.08477 10.554 2.83301 11.832 2.83301C12.5426 2.83301 13.2189 2.91084 13.832 3.05127C14.8865 3.2928 15.1654 3.91325 15.1654 4.90899V12.0904C15.1654 12.7469 14.472 13.1979 13.832 13.0513C13.2189 12.9108 12.5426 12.833 11.832 12.833C10.554 12.833 9.38706 13.0848 8.4987 13.4997Z" stroke="#A0A0A0" />
  </svg>

  ,

  star: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.72101 6.25003C1.67388 5.85685 1.65031 5.66026 1.68345 5.49933C1.77804 5.0401 2.18204 4.66773 2.72044 4.54352C2.90912 4.5 3.14597 4.5 3.61968 4.5H12.3829C12.8566 4.5 13.0935 4.5 13.2822 4.54352C13.8206 4.66773 14.2246 5.0401 14.3192 5.49933C14.3523 5.66026 14.3287 5.85685 14.2816 6.25003C14.1736 7.15113 13.6673 7.64403 12.7021 7.92821L9.92133 8.74687C8.9707 9.02673 8.49539 9.16667 8.0013 9.16667C7.50721 9.16667 7.0319 9.02673 6.08127 8.74687L3.30051 7.92821C2.33526 7.64403 1.82904 7.15113 1.72101 6.25003Z" stroke="#A0A0A0" />
    <path d="M2.30855 7.5L2.17772 9.01714C1.94321 11.7367 1.82595 13.0965 2.57823 13.9649C3.33051 14.8333 4.62567 14.8333 7.21601 14.8333H8.78399C11.3743 14.8333 12.6695 14.8333 13.4218 13.9649C14.1741 13.0965 14.0568 11.7367 13.8223 9.01714L13.6914 7.5" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.3346 4.16699L10.2831 3.99038C10.0265 3.11036 9.89811 2.67035 9.59258 2.41867C9.28704 2.16699 8.88121 2.16699 8.06953 2.16699H7.93307C7.1214 2.16699 6.71556 2.16699 6.41003 2.41867C6.10449 2.67035 5.97615 3.11036 5.71948 3.99038L5.66797 4.16699" stroke="#A0A0A0" />
  </svg>

  ,

  globe: <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.587 2L6.85641 2C4.88196 2 3.89473 2 3.28135 2.58579C2.66797 3.17157 2.66797 4.11438 2.66797 6L2.73876 10L10.587 10C12.069 10 12.81 10 13.1245 9.61702C13.2115 9.51105 13.2752 9.3894 13.3117 9.25935C13.4439 8.78933 12.9993 8.22319 12.1101 7.09091C11.7402 6.6199 11.5552 6.3844 11.5223 6.11673C11.5127 6.03918 11.5127 5.96082 11.5223 5.88327C11.5552 5.6156 11.7402 5.3801 12.1101 4.90909C12.9993 3.77681 13.4439 3.21067 13.3117 2.74065C13.2752 2.6106 13.2115 2.48895 13.1245 2.38298C12.81 2 12.069 2 10.587 2Z" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.66797 14L2.66797 5.33333" stroke="#A0A0A0" strokeLinecap="round" />
  </svg>,

  experience: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.72101 6.25003C1.67388 5.85685 1.65031 5.66026 1.68345 5.49933C1.77804 5.0401 2.18204 4.66773 2.72044 4.54352C2.90912 4.5 3.14597 4.5 3.61968 4.5H12.3829C12.8566 4.5 13.0935 4.5 13.2822 4.54352C13.8206 4.66773 14.2246 5.0401 14.3192 5.49933C14.3523 5.66026 14.3287 5.85685 14.2816 6.25003C14.1736 7.15113 13.6673 7.64403 12.7021 7.92821L9.92133 8.74687C8.9707 9.02673 8.49539 9.16667 8.0013 9.16667C7.50721 9.16667 7.0319 9.02673 6.08127 8.74687L3.30051 7.92821C2.33526 7.64403 1.82904 7.15113 1.72101 6.25003Z" stroke="#A0A0A0" />
    <path d="M2.30855 7.5L2.17772 9.01714C1.94321 11.7367 1.82595 13.0965 2.57823 13.9649C3.33051 14.8333 4.62567 14.8333 7.21601 14.8333H8.78399C11.3743 14.8333 12.6695 14.8333 13.4218 13.9649C14.1741 13.0965 14.0568 11.7367 13.8223 9.01714L13.6914 7.5" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.3346 4.16699L10.2831 3.99038C10.0265 3.11036 9.89811 2.67035 9.59258 2.41867C9.28704 2.16699 8.88121 2.16699 8.06953 2.16699H7.93307C7.1214 2.16699 6.71556 2.16699 6.41003 2.41867C6.10449 2.67035 5.97615 3.11036 5.71948 3.99038L5.66797 4.16699" stroke="#A0A0A0" />
  </svg>,
  age: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2.5H3C2.73478 2.5 2.48043 2.60536 2.29289 2.79289C2.10536 2.98043 2 3.23478 2 3.5V13.5C2 13.7652 2.10536 14.0196 2.29289 14.2071C2.48043 14.3946 2.73478 14.5 3 14.5H13C13.2652 14.5 13.5196 14.3946 13.7071 14.2071C13.8946 14.0196 14 13.7652 14 13.5V3.5C14 3.23478 13.8946 2.98043 13.7071 2.79289C13.5196 2.60536 13.2652 2.5 13 2.5ZM13 13.5H3V3.5H13V13.5ZM8.75 5.5V11.5C8.75 11.6326 8.69732 11.7598 8.60355 11.8536C8.50979 11.9473 8.38261 12 8.25 12C8.11739 12 7.99021 11.9473 7.89645 11.8536C7.80268 11.7598 7.75 11.6326 7.75 11.5V6.4375L7.0275 6.91937C6.97284 6.95582 6.91153 6.98114 6.84708 6.99388C6.78264 7.00663 6.71631 7.00656 6.65189 6.99368C6.58747 6.9808 6.52622 6.95535 6.47163 6.91879C6.41704 6.88224 6.37019 6.83529 6.33375 6.78062C6.29731 6.72596 6.27199 6.66466 6.25924 6.60021C6.24649 6.53576 6.24656 6.46943 6.25944 6.40501C6.27233 6.34059 6.29778 6.27934 6.33433 6.22475C6.37089 6.17017 6.41784 6.12332 6.4725 6.08687L7.9725 5.08687C8.0476 5.03677 8.13486 5.00793 8.22503 5.00342C8.31519 4.99891 8.4049 5.01889 8.48462 5.06126C8.56434 5.10362 8.63111 5.16677 8.67783 5.24402C8.72456 5.32127 8.7495 5.40972 8.75 5.5Z" fill="#A0A0A0" />
  </svg>




};

const userTypeFields: Record<UserType, FormField[]> = {
  guest: [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g, Steph Asoegwu', required: true, icon: icons.user },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., crownzdesigns@gmail.com', required: true, icon: icons.email },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g., +1 555-555-5555', required: true, icon: icons.phone },
    {
      name: 'country', label: 'Country of Residence', type: 'select', required: true, options: [
        { value: 'US', label: 'USA' },
        { value: 'NG', label: 'Nigeria' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'CA', label: 'Canada' },
        { value: 'AU', label: 'Australia' },
      ], icon: icons.location
    },
    {
      name: 'language', label: 'Preferred Language', type: 'select', required: true, options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
        { value: 'it', label: 'Italian' },
      ], icon: icons.language
    },
    { name: 'age', label: 'Age', type: 'text', placeholder: 'e.g., 21', required: true, icon: icons.age },
    {
      name: 'personalizedExperience', label: 'Receive Personalized Experience', type: 'radio', required: true, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]
    },
    {
      name: 'travelStyle', label: 'Travel Style', type: 'select', required: true, options: [
        { value: 'solo', label: 'Solo' },
        { value: 'couple', label: 'Couple' },
        { value: 'family', label: 'Family' },
        { value: 'group', label: 'Group' },
      ], icon: icons.travel
    },
    {
      name: 'disability', label: 'Disability', type: 'radio', required: true, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]
    },
    {
      name: 'disabilityType', label: 'Disability Type', type: 'select', required: false, options: [
        { value: 'none', label: 'None' },
        { value: 'deaf', label: 'Deaf' },
        { value: 'blind', label: 'Blind' },
        { value: 'mobility', label: 'Mobility' },
        { value: 'cognitive', label: 'Cognitive' },
        { value: 'others', label: 'Others' },
      ], icon: icons.accessibility
    },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true, icon: icons.lock },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true, icon: icons.lock },
  ],

  host: [
    { name: 'businessName', label: 'Company Name', type: 'text', placeholder: 'e.g, Blueberry Smith', required: true, icon: icons.user },
    { name: 'contactPersonName', label: 'Contact Person Name', type: 'text', placeholder: 'e.g., John Smith', required: true, icon: icons.user },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g., +1 555-555-5555', required: true, icon: icons.phone },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., crownzdesigns@gmail.com', required: true, icon: icons.email },
    {
      name: 'language', label: 'Preferred Language', type: 'select', required: true, options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
      ], icon: icons.language
    },
    {
      name: 'priceRange', label: 'Price Range per Person', type: 'select', required: true, options: [
        { value: '50-100', label: '$50-$100' },
        { value: '100-200', label: '$100-$200' },
        { value: '200-300', label: '$200-$300' },
        { value: '300+', label: '$300+' },
      ], icon: icons.price
    },
    { name: 'age', label: 'Age', type: 'text', placeholder: 'e.g., 21', required: true, icon: icons.calendar },
    {
      name: 'country', label: 'Country of Residence', type: 'select', required: true, options: [
        { value: 'US', label: 'USA' },
        { value: 'NG', label: 'Nigeria' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'CA', label: 'Canada' },
      ], icon: icons.location
    },
    { name: 'shortBio', label: 'Short Bio', type: 'textarea', placeholder: 'e.g., "Tell travelers who you are and what drives your experience"', required: true, rows: 4, maxLength: 500 },
    {
      name: 'experienceTitle', label: 'Experience Title', type: 'select', required: true, options: [
        { value: 'pottery-workshop', label: 'Pottery Workshop' },
        { value: 'samba-dance-tour', label: 'Samba Dance Tour' },
        { value: 'cooking-class', label: 'Cooking Class' },
        { value: 'art-tour', label: 'Art Tour' },
      ], icon: icons.star
    },
    {
      name: 'typeOfExperience', label: 'Type of Experience', type: 'select', required: true, options: [
        { value: 'food', label: 'Food' },
        { value: 'nature', label: 'Nature' },
        { value: 'culture', label: 'Culture' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'wellness', label: 'Wellness' },
      ], icon: icons.experience
    },
    { name: 'availability', label: 'Availability', type: 'text', placeholder: 'Select from Calendar', required: true, icon: icons.calendar },
    { name: 'hotelImages', label: 'Upload Hotel Image', type: 'file', required: true, accept: '.jpg,.jpeg,.png,.gif' },
    { name: 'certifications', label: 'Do You Have Certifications or Licenses? (Yes/No — upload field if Yes)', type: 'file', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true, icon: icons.lock },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true, icon: icons.lock },
  ],

  facilitator: [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g, Jane Smith', required: true, icon: icons.user },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., jane@example.com', required: true, icon: icons.email },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g., +1 555-555-5555', required: true, icon: icons.phone },
    {
      name: 'country', label: 'Country of Residence', type: 'select', required: true, options: [
        { value: 'US', label: 'USA' },
        { value: 'NG', label: 'Nigeria' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'CA', label: 'Canada' },
      ], icon: icons.location
    },
    {
      name: 'language', label: 'Preferred Language', type: 'select', required: true, options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
      ], icon: icons.language
    },
    { name: 'shortBio', label: 'Short Bio', type: 'textarea', placeholder: 'e.g., "Tell us a bit about your experience and approach to facilitation"', required: true, rows: 4, maxLength: 500 },
    {
      name: 'areasCountries', label: 'Areas/Countries You can Facilitate', type: 'select', required: true, options: [
        { value: 'dubai-usa-france', label: 'Dubai, USA, France' },
        { value: 'europe', label: 'Europe' },
        { value: 'asia', label: 'Asia' },
        { value: 'americas', label: 'Americas' },
      ], icon: icons.globe
    },
    {
      name: 'typesOfExperiences',
      label: 'Types of Experiences You Prefer Facilitating',
      type: 'checkbox', // Change from 'multiselect' to 'checkbox'
      required: true,
      options: [
        { value: 'events', label: 'Events' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'cultural', label: 'Cultural' },
        { value: 'tour', label: 'Tour' },
        { value: 'food', label: 'Food' },
      ]
    },
    { name: 'yearsOfExperience', label: 'Years of Experience as a Facilitator', type: 'text', placeholder: 'e.g., 5 years', required: true, icon: icons.calendar },
    { name: 'availability', label: 'Availability', type: 'text', placeholder: 'Select from Calendar', required: true, icon: icons.calendar },
    { name: 'certifications', label: 'Upload Any Relevant Certifications or IDs', type: 'file', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true, icon: icons.lock },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true, icon: icons.lock },
  ],

  translator: [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g, Maria Garcia', required: true, icon: icons.user },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., maria@example.com', required: true, icon: icons.email },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g., +1 555-555-5555', required: true, icon: icons.phone },
    {
      name: 'country', label: 'Country of Residence', type: 'select', required: true, options: [
        { value: 'US', label: 'USA' },
        { value: 'NG', label: 'Nigeria' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'CA', label: 'Canada' },
      ], icon: icons.location
    },
    {
      name: 'language', label: 'Preferred Language', type: 'select', required: true, options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
      ], icon: icons.language
    },
    { name: 'shortBio', label: 'Short Bio', type: 'textarea', placeholder: 'e.g., "Tell us why you\'re passionate about bridging cultures through language"', required: true, rows: 4, maxLength: 500 },
    {
      name: 'otherLanguages', label: 'Other Language you Speak Fluently', type: 'multiselect', required: true, options: [
        { value: 'french', label: 'French' },
        { value: 'spanish', label: 'Spanish' },
        { value: 'yoruba', label: 'Yoruba' },
        { value: 'mandarin', label: 'Mandarin' },
        { value: 'arabic', label: 'Arabic' },
        { value: 'portuguese', label: 'Portuguese' },
      ]
    },
    {
      name: 'translationStyle', label: 'Translation Style', type: 'select', required: true, options: [
        { value: 'simultaneous', label: 'Simultaneous' },
        { value: 'consecutive', label: 'Consecutive' },
        { value: 'text-based', label: 'Text-based' },
      ], icon: icons.language
    },
    { name: 'yearsOfTranslationExperience', label: 'Years of Translation Experience', type: 'text', placeholder: 'e.g., 5 years', required: true, icon: icons.calendar },
    { name: 'availability', label: 'Availability', type: 'text', placeholder: 'Select from Calendar', required: true, icon: icons.calendar },
    { name: 'languageCertifications', label: 'Upload Language Certifications', type: 'file', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', required: true, icon: icons.lock },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true, icon: icons.lock },
  ],
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isOpen,
  onClose,
  userType,
  onSubmit
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({});
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fields = userTypeFields[userType] || [];

  const handleChange = (name: string, value: string | File | File[] | string[] | undefined) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name: string, value: string, isExperience = false) => {
    const currentSelected = isExperience ? selectedExperiences : selectedLanguages;
    const setter = isExperience ? setSelectedExperiences : setSelectedLanguages;

    if (currentSelected.includes(value)) {
      const newSelected = currentSelected.filter(item => item !== value);
      setter(newSelected);
      handleChange(name, newSelected);
    } else {
      const newSelected = [...currentSelected, value];
      setter(newSelected);
      handleChange(name, newSelected);
    }
  };

  const removeSelection = (name: string, value: string, isExperience = false) => {
    const currentSelected = isExperience ? selectedExperiences : selectedLanguages;
    const setter = isExperience ? setSelectedExperiences : setSelectedLanguages;
    const newSelected = currentSelected.filter(item => item !== value);
    setter(newSelected);
    handleChange(name, newSelected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (userType === 'guest') {
        // Use JSON for guests
        await onSubmit({ ...formData, role: userType.toUpperCase() });
      } else {
        // Use RegistrationFormData  for roles with file uploads
        const formDataToSend = new FormData ();

        // Add all form fields
        Object.entries(formData).forEach(([key, value]) => {
          if (value instanceof File) {
            formDataToSend.append(key, value);
          } else if (Array.isArray(value)) {
            value.forEach(item => formDataToSend.append(key, item));
          } else if (value !== undefined && value !== null) {
            formDataToSend.append(key, value.toString());
          }
        });

        formDataToSend.append('role', userType.toUpperCase());

        // Call onSubmit prop instead of registerUserWithFiles directly
        await onSubmit(formDataToSend);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
// console.log(handleSubmit)
  const handleOAuthLogin = (provider: string) => {
    console.log(`OAuth login with ${provider}`);
    // Implement OAuth login logic here
  };

  const renderField = (field: FormField) => {
    const commonClasses = "w-full p-3 stroke-color rounded-[14px] focus:outline-none bg-white text-[14px] placeholder-[#A0A0A0] focus:border-transparent border border-gray-300";

    switch (field.type) {
      case 'textarea':
        return (
          <div className="relative">
            <textarea
              placeholder={field.placeholder}
              value={formData[field.name] as string || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`${commonClasses} resize-none`}
              rows={field.rows || 3}
              maxLength={field.maxLength}
              required={field.required}
            />
            {field.maxLength && (
              <div className="text-xs text-gray-400 mt-1">
                {((formData[field.name] as string) || '').length}/{field.maxLength} characters
              </div>
            )}
          </div>
        );
      case 'select':
        return (
          <div className="relative ">
            {field.icon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                {field.icon}
              </div>
            )}
            <Select
              value={formData[field.name] as string || ''}
              onValueChange={(value) => handleChange(field.name, value)}

            >
              <SelectTrigger className={`!bg-white !py-5.5 ${commonClasses} ${field.icon ? 'pl-10' : 'pl-3'}`}>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'multiselect':
        const isExperience = field.name === 'typesOfExperiences';
        const currentSelected = isExperience ? selectedExperiences : selectedLanguages;

        return (
          <div>
            <Select onValueChange={(value) => handleMultiSelectChange(field.name, value, isExperience)}>
              <SelectTrigger className={`!bg-white !py-5.5 ${commonClasses} ${field.icon ? 'pl-10' : 'pl-3'}`}>
                <SelectValue placeholder={`e.g., "French, Spanish, Yoruba"`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Display selected languages below */}
            {currentSelected.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {currentSelected.map(item => {
                  const optionLabel = field.options?.find(opt => opt.value === item)?.label || item;
                  return (
                    <div key={item} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                      <span className="text-gray-700">{optionLabel}</span>
                      <button
                        type="button"
                        onClick={() => removeSelection(field.name, item, isExperience)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
                {currentSelected.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isExperience) {
                        setSelectedExperiences([]);
                        handleChange(field.name, []);
                      } else {
                        setSelectedLanguages([]);
                        handleChange(field.name, []);
                      }
                    }}
                    className="text-[#FF6B6B] text-sm hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-3">
            {field.options?.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.name}-${option.value}`}
                  checked={(formData[field.name] as string[] || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = formData[field.name] as string[] || [];
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter(v => v !== option.value);
                    handleChange(field.name, newValues);
                  }}
                  className="focus:bg-primary-color custom-checkbox"
                />
                <Label
                  htmlFor={`${field.name}-${option.value}`}
                  className="text-sm text-gray-700"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="flex gap-4">
            <RadioGroup
              value={formData[field.name] as string || ''}
              onValueChange={(value) => handleChange(field.name, value)}
              className="flex gap-4"
            >
              {field.options?.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${field.name}-${option.value}`}
                    className="custom-radio"
                  />
                  <Label
                    htmlFor={`${field.name}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'file':
        return (
          <FileUpload
            label=""
            accept={field.accept || ".pdf,.jpg,.jpeg,.png"}
            required={field.required}
            value={formData[field.name] as File || null}
            onChange={(file) => handleChange(field.name, file || undefined)}
            placeholder={`Upload ${field.label}`}
          />
        );

      default:
        return (
          <div className="relative">
            {field.icon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {field.icon}
              </div>
            )}
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] as string || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`${commonClasses} ${field.icon ? 'pl-10' : 'pl-3'}`}
              required={field.required}
            />
          </div>
        );
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showOnMobile={false}>
      <div className="p-6 lg:p-10 h-full">
        <div className='flex gap-2 items-between'>
          <button className='cursor-pointer' onClick={onClose}><ArrowLeft className='secondary-text-color' /></button>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
            <p className="text-gray-600 mb-6">Join us and start your journey today.</p>
          </div>
        </div>



        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] lg:max-h-[60vh] overflow-y-auto">
          {fields.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Invalid user type selected. Please go back and select a valid category.</p>
              <Button type="button" variant="primary" onClick={onClose} className="mt-4">
                Go Back
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.name} className={
                    field.type === 'textarea' ||
                      field.type === 'file' ||
                      field.name === 'experienceTitle' ||
                      field.name === 'typesOfExperiences' ||
                      field.name === 'availability' ||
                      field.name === 'language' ||
                      field.name === 'areasCountries' ||
                      field.name === 'yearsOfExperience' ||
                      field.name === 'otherLanguages' ||
                      field.name === 'translationStyle' ||
                      field.name === 'yearsOfTranslationExperience'
                      ? 'lg:col-span-2' : ''
                  }>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {/* {field.required && <span className="text-red-500 ml-1">*</span>} */}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4 relative">
                <div className='flex justify-center items-center'>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="relative bg-white !px-15"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-[#FF6B6B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Signing Up...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our{' '}
                  <a href="/terms" className="text-[#FF6B6B] hover:underline">Terms of Use</a>{' '}
                  and confirm you have read our{' '}
                  <a href="/privacy" className="text-[#FF6B6B] hover:underline">Privacy Policy</a>.
                </p>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#FAF9F6] text-gray-500">or</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 lg:px-20 mb-3">
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('google')}
                    className="flex items-center justify-center py-4 border border-gray-300 rounded-[8px] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('apple')}
                    className="flex items-center justify-center py-4 border border-gray-300 rounded-[8px] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('facebook')}
                    className="flex items-center justify-center py-4 border border-gray-300 rounded-[8px] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </BaseModal>
  );
};

export default RegistrationForm;































































