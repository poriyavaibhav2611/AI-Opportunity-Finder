import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#A58D66]/50 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#A58D66] text-[#083A4F] hover:bg-[#C1A77E] shadow-[0_0_15px_rgba(165,141,102,0.3)] hover:shadow-[0_0_25px_rgba(165,141,102,0.5)]',
    secondary: 'bg-[#407E8C]/20 text-[#E5E1DD] hover:bg-[#407E8C]/40 border border-[#407E8C]/60',
    ghost: 'text-[#E5E1DD]/70 hover:text-white hover:bg-[#407E8C]/20',
    outline: 'border border-[#407E8C]/60 text-[#E5E1DD]/80 hover:bg-[#407E8C]/20 hover:text-white'
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-sm',
    lg: 'h-12 px-8 text-base',
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
});
Button.displayName = 'Button';
