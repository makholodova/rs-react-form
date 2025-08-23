import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/modal/modal';
import { describe, it, beforeEach, vi, expect } from 'vitest';

describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  it("doesn't render anything if isOpen = false", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders content when isOpen = true', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="content">Modal content</div>
      </Modal>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('call onClose when clicking on overlay', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    const overlay = dialog.parentElement;
    if (!overlay) {
      throw new Error('Overlay not found');
    }

    fireEvent.mouseDown(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('Does not call onClose when clicked inside a modalи', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    fireEvent.mouseDown(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('call onClose when clicking the button "×"', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('call onClose when clicking Escape', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
