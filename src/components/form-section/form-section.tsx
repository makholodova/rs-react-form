import Card from '../card/card';
import styles from './form-section.module.css';
import type { User } from '../../types';

type FormSectionProps = {
  title: string;
  users: User[];
  lastAddedId: string | null;
};

export default function FormSection({
  title,
  users,
  lastAddedId,
}: FormSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardsList}>
        {users.map((user) => (
          <Card isNewUser={user.id === lastAddedId} key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
