import type { ButtonHTMLAttributes, RefObject, ReactNode } from 'react';

export interface InputFieldProps {
  id: string;
  name: string;
  labelText?: string;
  placeholder?: string;
  inputType?: 'text' | 'number' | 'password' | 'email';
  refInput?: RefObject<HTMLInputElement | null>;
  autoComplete?: string;
  errorMessage?: string;
}

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
