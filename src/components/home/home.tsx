import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import Card from '../card/card.tsx';
import styles from './home.module.css';

export default function Home() {
  const uncontrolledForm = useSelector(
    (state: RootState) => state.uncontrolledForm
  );

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <h2>Uncuncontrolled Form</h2>
        <div className={styles.cardList}>
          {uncontrolledForm.users.map((user) => (
            <Card key={user.email} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
