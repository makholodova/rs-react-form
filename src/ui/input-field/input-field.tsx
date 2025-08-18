import { type FC } from 'react';

import styles from './input-field.module.css';
import type { InputFieldProps } from '../../types/ui.ts';

const InputFaild: FC<InputFieldProps> = ({
  id,
  name,
  label,
  type,
  validators = [],
  placeholder,
  showError = true,
  autoComplete,
  value,
  onChange,
  className,
}) => {
  const errorMessage =
    validators.map((v) => v(value)).find((msg) => !!msg) ?? '';

  return (
    <label className={`${styles.field} ${className ?? ''}`}>
      <span>{label}</span>
      <span className={styles.inputWrapper}>
        <input
          placeholder={placeholder}
          name={name}
          id={id}
          className={styles.baseInput}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </span>
      {showError && (
        <span className={styles.errorText}>`Ошибка ${errorMessage}`</span>
      )}
    </label>
  );
};

export default InputFaild;
