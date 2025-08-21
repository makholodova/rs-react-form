import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import Card from '../card/card.tsx';
import styles from './home.module.css';

export default function Home() {
  const uncontrolledForm = useSelector(
    (state: RootState) => state.uncontrolledForm
  );

  return (
    <div className={styles.home}>
      <section className={styles.section}>
        <h2 className={styles.title}>Uncontrolled Form</h2>
        <div className={styles.cardsList}>
          {uncontrolledForm.users.map((user) => (
            <Card key={user.email} user={user} />
          ))}
        </div>
      </section>
    </div>
  );
}
