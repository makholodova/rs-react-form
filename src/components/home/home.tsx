import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import Card from '../card/card.tsx';
import styles from './home.module.css';
import { useEffect } from 'react';
import { clearLastAdded } from '../../store/uncontrolled-form-slice.ts';

export default function Home() {
  const dispatch = useDispatch();
  const { users, lastAddedId } = useSelector(
    (state: RootState) => state.uncontrolledForm
  );

  useEffect(() => {
    if (!lastAddedId) return;
    const time = setTimeout(() => dispatch(clearLastAdded()), 5000);
    return () => clearTimeout(time);
  }, [lastAddedId, dispatch]);

  return (
    <div className={styles.home}>
      <section className={styles.section}>
        <h2 className={styles.title}>Uncontrolled Form</h2>
        <div className={styles.cardsList}>
          {users.map((user) => {
            const isNew = user.id === lastAddedId;
            return <Card isNewUser={isNew} key={user.email} user={user} />;
          })}
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>React Hook Form</h2>
        <div className={styles.cardList}>Здесь будут данные</div>
      </section>
    </div>
  );
}
