import type { User } from '../../types';
import styles from './card.module.css';

export default function Card({ user }: { user: User }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        alt={`${user.name}-photo`}
        src={user.image}
      />
      <p className={styles.field}>
        Name: <span>{user.name}</span>
      </p>
      <p className={styles.field}>
        Age: <span>{user.age}</span>
      </p>
      <p className={styles.field}>
        E-mail: <span>{user.email}</span>
      </p>
      <p className={styles.field}>
        Password: <span>{user.password}</span>
      </p>
      <p className={styles.field}>
        Password(confirm): <span>{user.confirmPassword}</span>
      </p>
      <p className={styles.field}>
        Gender: <span>{user.gender}</span>
      </p>
      <p className={styles.field}>
        Country: <span>{user.country}</span>
      </p>
    </div>
  );
}
