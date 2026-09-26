import { forwardRef } from 'react';
import { cn } from './Button';

export const Input = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#E5E1DD]/80 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-lg border border-[#407E8C]/60 bg-[#083A4F]/50 px-3 py-2 text-sm text-[#E5E1DD] placeholder:text-[#E5E1DD]/30 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[#A58D66]/50 focus:border-[#A58D66]/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
