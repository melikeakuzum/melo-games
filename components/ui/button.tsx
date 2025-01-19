import React from 'react'

export const Button = ({ 
  children, 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button 
      className={`px-4 py-2 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 