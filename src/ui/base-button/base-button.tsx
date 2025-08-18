import { type FC } from 'react';
import type { BaseButtonProps } from '../../types/ui.ts';
import styles from './base-button.module.css';

const BaseButton: FC<BaseButtonProps> = ({
  type = 'button',
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`${styles.baseButton} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default BaseButton;
