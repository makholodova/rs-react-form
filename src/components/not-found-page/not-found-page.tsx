import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';

export default function NotFoundPage() {
  return (
    <div data-testid="not-found-page" className={styles.container}>
      <h2 className={styles.title}>404 — Page Not Found</h2>
      <Link className={styles.link} to="/">
        Go Home
      </Link>
    </div>
  );
}
