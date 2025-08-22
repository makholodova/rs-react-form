import { type InputHTMLAttributes, forwardRef } from 'react';
import styles from './input-field.module.css';

type InputFieldProps = {
  id: string;
  labelText: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, labelText, errorMessage, ...rest }, ref) => {
    return (
      <div className={styles.field}>
        <label htmlFor={id}>{labelText}</label>
        <input id={id} ref={ref} {...rest} className={styles.baseInput} />
        <div className={styles.error}>{errorMessage}</div>
      </div>
    );
  }
);
InputField.displayName = 'InputField';
export default InputField;
