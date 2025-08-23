import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal-slice.ts';
import type { RootState } from '../../store/store.ts';
import UncontrolledForm from '../../form/uncontrolled-form/uncontrolled-form.tsx';
import ReactHookForm from '../../form/react-hook-form/react-hook-form.tsx';
import Modal from './modal.tsx';

export default function ModalRoot() {
  const { isOpen, contentType } = useSelector(
    (state: RootState) => state.modal
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closeModal());
  };

  const body = (() => {
    switch (contentType) {
      case 'uncontrolled-form':
        return <UncontrolledForm />;
      case 'react-hook-form':
        return <ReactHookForm />;
      default:
        return null;
    }
  })();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {body}
    </Modal>
  );
}
