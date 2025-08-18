import * as React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type Validator = (value: string) => string | null | undefined;

export interface InputFieldProps {
  id?: string;
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  validators?: Validator[];
  placeholder?: string;
  showError?: boolean;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
