import { type FC } from 'react';

import styles from './header.module.css';
import { Link } from 'react-router-dom';
import BaseButton from '../../ui/base-button/base-button.tsx';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modalSlice.ts';

const Header: FC = () => {
  const dispatch = useDispatch();

  const openReactHookForm = () => {
    dispatch(openModal('react-hook-form'));
  };
  const openUncontrolled = () => {
    dispatch(openModal('uncontrolled-form'));
  };
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <Link to="/">React-form</Link>
        <nav className={styles.headerNav}>
          <BaseButton
            onClick={openReactHookForm}
            className={styles.headerNavLink}
          >
            React Hook Form
          </BaseButton>
          <BaseButton
            onClick={openUncontrolled}
            className={styles.headerNavlink}
          >
            Uncontrolled Form
          </BaseButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
