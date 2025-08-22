import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import Card from '../card/card.tsx';
import styles from './home.module.css';
import { useEffect } from 'react';
import { clearLastAddedUCF } from '../../store/uncontrolled-form-slice.ts';
import { clearLastAddedRHF } from '../../store/react-hook-form-slice.ts';

export default function Home() {
  const dispatch = useDispatch();
  const { usersUCF, lastAddedIdUCF } = useSelector(
    (state: RootState) => state.uncontrolledForm
  );

  const { usersRHF, lastAddedIdRHF } = useSelector(
    (state: RootState) => state.reactHookForm
  );

  useEffect(() => {
    if (!lastAddedIdUCF) return;
    const t = setTimeout(() => dispatch(clearLastAddedUCF()), 5000);
    return () => clearTimeout(t);
  }, [lastAddedIdUCF, dispatch]);

  useEffect(() => {
    if (!lastAddedIdRHF) return;
    const t = setTimeout(() => dispatch(clearLastAddedRHF()), 5000);
    return () => clearTimeout(t);
  }, [lastAddedIdRHF, dispatch]);

  return (
    <div className={styles.home}>
      <section className={styles.section}>
        <h2 className={styles.title}>Uncontrolled Form</h2>
        <div className={styles.cardsList}>
          {usersUCF.map((user) => {
            const isNew = user.id === lastAddedIdUCF;
            return <Card isNewUser={isNew} key={user.email} user={user} />;
          })}
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>React Hook Form</h2>
        <div className={styles.cardsList}>
          {usersRHF.map((user) => {
            const isNew = user.id === lastAddedIdRHF;
            return <Card isNewUser={isNew} key={user.email} user={user} />;
          })}
        </div>
      </section>
    </div>
  );
}
