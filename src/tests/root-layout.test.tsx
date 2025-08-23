import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/root-layout/root-layout';
import * as reactRouterDom from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof reactRouterDom>('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="mocked-outlet" />,
  };
});

vi.mock('../components/header/header', () => ({
  default: () => <div data-testid="mocked-header" />,
}));

vi.mock('../components/modal/modal-root.tsx', () => ({
  default: () => <div data-testid="mocked-modal" />,
}));

describe('Layout', () => {
  it('renders Header, Outlet и ModalRoot', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mocked-header')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-outlet')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-modal')).toBeInTheDocument();
  });
});
