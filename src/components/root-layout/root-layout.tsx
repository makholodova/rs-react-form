import { Outlet } from 'react-router-dom';
import styles from './root-layout.module.css';
import Header from '../header/header';
import ModalRoot from '../modal/modal-root.tsx';

export default function Layout() {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <ModalRoot />
    </div>
  );
}
