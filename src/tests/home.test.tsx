import { render, screen } from '@testing-library/react';
import Home from '../components/home/home';
import { describe, it, expect, vi } from 'vitest';
import * as hook from '../hook/useClearLastAdded';
import type { RootState } from '../store/store.ts';

vi.mock('../hook/useClearLastAdded', () => ({
  useClearLastAdded: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: (selector: (state: RootState) => unknown) =>
    selector({
      uncontrolledForm: {
        usersUCF: [
          { id: '1', name: 'User1' },
          { id: '2', name: 'User2' },
        ],
        lastAddedIdUCF: '1',
      },
      reactHookForm: {
        usersRHF: [
          { id: '3', name: 'User3' },
          { id: '4', name: 'User4' },
        ],
        lastAddedIdRHF: '3',
      },
    } as RootState),
}));

describe('Home', () => {
  it('renders sections and call useClearLastAdded', () => {
    render(<Home />);

    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();

    expect(hook.useClearLastAdded).toHaveBeenCalledWith(
      '1',
      expect.any(Function)
    );
    expect(hook.useClearLastAdded).toHaveBeenCalledWith(
      '3',
      expect.any(Function)
    );
  });
});
