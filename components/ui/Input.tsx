'use client';

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
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

  const getContainerBackground = () => {
    switch (variant) {
      case 'glass':
        return 'rgba(255, 255, 255, 0.05)';
      case 'glow':
      case 'default':
      default:
        return '#1A1A24';
    }
  };

  const getContainerBorder = () => {
    if (error) return '1px solid rgba(255, 0, 110, 0.5)';
    if (isFocused) return '1px solid rgba(0, 217, 255, 0.5)';
    if (variant === 'glow') return '1px solid rgba(0, 217, 255, 0.3)';
    return '1px solid rgba(255, 255, 255, 0.1)';
  };

  const getBoxShadow = () => {
    if (isFocused && !error) return '0 0 20px rgba(0, 217, 255, 0.2)';
    if (error) return '0 0 20px rgba(255, 0, 110, 0.2)';
    return 'none';
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '8px',
        }}>
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
          boxShadow: getBoxShadow()
        }}
        style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'all 0.3s',
          background: getContainerBackground(),
          border: getContainerBorder(),
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'auto',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}>
          {icon && (
            <span style={{
              marginRight: '12px',
              transition: 'color 0.2s',
              color: isFocused ? '#00D9FF' : 'rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
            }}>
              {icon}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              width: '100%',
              background: 'transparent',
              color: 'white',
              padding: '12px 0',
              paddingRight: isPassword || showClear ? '40px' : '0',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
            }}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                color: 'rgba(255, 255, 255, 0.4)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'; }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {showClear && props.value && (
            <button
              type="button"
              onClick={onClear}
              style={{
                position: 'absolute',
                right: '16px',
                color: 'rgba(255, 255, 255, 0.4)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'; }}
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
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              borderRadius: '12px',
              background: 'rgba(0, 217, 255, 0.1)',
              filter: 'blur(20px)',
            }}
          />
        )}
      </motion.div>

      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '8px',
          color: '#FF006E',
          fontSize: '14px',
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {resolvedHint && !error && (
        <p style={{
          marginTop: '8px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          {resolvedHint}
        </p>
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
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
      }}>
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
            style={{
              width: '48px',
              height: '56px',
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              borderRadius: '12px',
              background: '#1A1A24',
              border: error ? '1px solid #FF006E' : '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              outline: 'none',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
      {error && (
        <p style={{
          marginTop: '8px',
          fontSize: '14px',
          color: '#FF006E',
          textAlign: 'center',
        }}>
          {error}
        </p>
      )}
    </div>
  );
};
