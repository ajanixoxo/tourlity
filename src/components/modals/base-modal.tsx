"use client"
import React from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showOnMobile?: boolean; // If false, renders as full screen on mobile
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children, showOnMobile = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-xs bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`
        relative bg-[#FAF9F6] rounded-[14px] max-h-[100vh] overflow-y-auto
        ${showOnMobile 
          ? 'w-[90%] max-w-md mx-4' 
          : 'w-full h-full lg:w-[90%] lg:max-w-xl lg:mx-4 lg:h-auto lg:max-h-[100vh] lg:rounded-[14px]'
        }
      `}>
        {children}
      </div>
    </div>
  );
};

export default BaseModal;