import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-5 py-2 border-2 cursor-pointer rounded-[14px] font-medium transition-colors duration-200';
  
  const variantStyles = {
    primary: 'bg-primary-color hover:bg-[#CA3F33] text-white border-hover-color',
    secondary: 'border-2 border-stroke text-muted-ash bg-transparent hover:text-[#F26457] hover:border-[#F26457] hover:text-primary-color'
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

