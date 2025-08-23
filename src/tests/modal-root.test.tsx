import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { RootState } from '../store/store';
import type { ReactNode } from 'react';
import { closeModal } from '../store/modal-slice';

const mockDispatch = vi.fn();
const mockUseSelector = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: RootState) => unknown) =>
    mockUseSelector(selector),
}));

vi.mock('../components/modal/modal', () => ({
  default: ({
    children,
    onClose,
  }: {
    children: ReactNode;
    onClose: () => void;
  }) => (
    <div data-testid="modal">
      <button data-testid="close-btn" onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  ),
}));

vi.mock('../form/uncontrolled-form/uncontrolled-form', () => ({
  default: () => <div data-testid="uncontrolled-form" />,
}));
vi.mock('../form/react-hook-form/react-hook-form', () => ({
  default: () => <div data-testid="react-hook-form" />,
}));

describe('ModalRoot', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Modal с UncontrolledForm', async () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: true,
          contentType: 'uncontrolled-form',
        },
      } as RootState)
    );
    const { default: ModalRoot } = await import(
      '../components/modal/modal-root'
    );
    render(<ModalRoot />);
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
  });

  it('renders Modal с ReactHookForm', async () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: true,
          contentType: 'react-hook-form',
        },
      } as RootState)
    );
    const { default: ModalRoot } = await import(
      '../components/modal/modal-root'
    );
    render(<ModalRoot />);
    expect(screen.getByTestId('react-hook-form')).toBeInTheDocument();
  });

  it('nothing renders inside Modal when unknown contentType', async () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: true,
          contentType: 'unknown-type',
        },
      } as unknown as RootState)
    );
    const { default: ModalRoot } = await import(
      '../components/modal/modal-root'
    );
    render(<ModalRoot />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('react-hook-form')).not.toBeInTheDocument();
  });

  it('call dispatch(closeModal())  onClose', async () => {
    mockUseSelector.mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: true,
          contentType: 'uncontrolled-form',
        },
      } as RootState)
    );
    const { default: ModalRoot } = await import(
      '../components/modal/modal-root'
    );
    render(<ModalRoot />);
    fireEvent.click(screen.getByTestId('close-btn'));
    expect(mockDispatch).toHaveBeenCalledWith(closeModal());
  });
});
