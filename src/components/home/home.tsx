import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import styles from './home.module.css';
import { clearLastAddedUCF } from '../../store/uncontrolled-form-slice.ts';
import { clearLastAddedRHF } from '../../store/react-hook-form-slice.ts';
import FormSection from '../form-section/form-section.tsx';
import { useClearLastAdded } from '../../hook/useClearLastAdded.ts';

export default function Home() {
  const { usersUCF, lastAddedIdUCF } = useSelector(
    (state: RootState) => state.uncontrolledForm
  );
  const { usersRHF, lastAddedIdRHF } = useSelector(
    (state: RootState) => state.reactHookForm
  );
  useClearLastAdded(lastAddedIdUCF, clearLastAddedUCF);
  useClearLastAdded(lastAddedIdRHF, clearLastAddedRHF);

  return (
    <div className={styles.home}>
      <FormSection
        title="Uncontrolled Form"
        users={usersUCF}
        lastAddedId={lastAddedIdUCF}
      />
      <FormSection
        title="React Hook Form"
        users={usersRHF}
        lastAddedId={lastAddedIdRHF}
      />
    </div>
  );
}
