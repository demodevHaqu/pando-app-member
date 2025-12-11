'use client';

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Search, X, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  /** @deprecated Use 'hint' instead */
  helperText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'glow' | 'glass';
  showClear?: boolean;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  helperText,
  icon,
  variant = 'default',
  showClear,
  onClear,
  className,
  type,
  disabled,
  ...props
}, ref) => {
  // Support both 'hint' and 'helperText' props for backwards compatibility
  const resolvedHint = hint || helperText;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const baseInputClasses = "w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none py-3";

  const containerVariants = {
    default: "bg-cyber-mid border border-white/10",
    glow: "bg-cyber-mid border border-electric-blue/30",
    glass: "glass"
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-2">
          {label}
        </label>
      )}

      <motion.div
        animate={{
          borderColor: error
            ? 'rgba(255, 0, 110, 0.5)'
            : isFocused
              ? 'rgba(0, 217, 255, 0.5)'
              : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isFocused && !error
            ? '0 0 20px rgba(0, 217, 255, 0.2)'
            : error
              ? '0 0 20px rgba(255, 0, 110, 0.2)'
              : 'none'
        }}
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300",
          containerVariants[variant],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <div className="flex items-center px-4">
          {icon && (
            <span className={cn(
              "mr-3 transition-colors",
              isFocused ? "text-electric-blue" : "text-white/40"
            )}>
              {icon}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(baseInputClasses, isPassword || showClear ? "pr-10" : "")}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-white/40 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {showClear && props.value && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Focus glow effect */}
        {isFocused && variant === 'glow' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 -z-10 rounded-xl bg-electric-blue/10 blur-xl"
          />
        )}
      </motion.div>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-power-pink text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {resolvedHint && !error && (
        <p className="mt-2 text-sm text-white/50">{resolvedHint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

// Search Input variant
interface SearchInputProps extends Omit<InputProps, 'icon' | 'type'> {
  onSearch?: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  onSearch,
  onChange,
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <Input
      ref={ref}
      type="search"
      icon={<Search size={18} />}
      onChange={handleChange}
      {...props}
    />
  );
});

SearchInput.displayName = 'SearchInput';

// OTP Input
interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  error
}) => {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > 1) return;

    const newOTP = value.split('');
    newOTP[index] = newValue;
    onChange(newOTP.join(''));

    // Auto focus next input
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    onChange(pastedData);
  };

  return (
    <div>
      <div className="flex gap-2 justify-center">
        {Array.from({ length }).map((_, index) => (
          <motion.input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            whileFocus={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.5)' }}
            className={cn(
              "w-12 h-14 text-center text-xl font-bold rounded-xl",
              "bg-cyber-mid border border-white/10",
              "text-white focus:outline-none focus:border-electric-blue",
              "transition-all duration-300",
              error && "border-power-pink"
            )}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-power-pink text-center">{error}</p>
      )}
    </div>
  );
};
