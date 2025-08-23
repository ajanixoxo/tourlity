/* eslint-disable @next/next/no-img-element */
"use client"
import Button from '@/components/root/button';
import BaseModal from './base-modal';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  buttonText: string;
  onButtonClick: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  image, 
  buttonText, 
  onButtonClick 
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 text-center">
        <img src={image} alt="Success" className="w-24 h-24 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-[#FF6B6B] mb-6">{title}</h2>
        <Button 
          variant="primary" 
          onClick={onButtonClick}
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </BaseModal>
  );
};

export default SuccessModal;