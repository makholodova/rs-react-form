import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/header/header';
import { describe, it, expect, vi } from 'vitest';
import { openModal } from '../store/modal-slice';

const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await import('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe('Header', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders title and buttons', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('REACT FORM')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
  });

  it('dispatches openModal when clicking on "React Hook Form"', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('React Hook Form'));
    expect(mockDispatch).toHaveBeenCalledWith(openModal('react-hook-form'));
  });

  it('dispatches openModal when clicking on "Uncontrolled Form"', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Uncontrolled Form'));
    expect(mockDispatch).toHaveBeenCalledWith(openModal('uncontrolled-form'));
  });
});
