import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../routes/router.tsx';

vi.mock('../components/root-layout/root-layout', async () => {
  const { Outlet } = await import('react-router-dom');
  return {
    default: () => (
      <div data-testid="layout">
        <Outlet />
      </div>
    ),
  };
});

vi.mock('../components/home/home.tsx', () => ({
  default: () => <div data-testid="home" />,
}));
vi.mock('../components/not-found-page/not-found-page', () => ({
  default: () => <div data-testid="not-found" />,
}));

describe('routesConfig', () => {
  it('renders Layout and Home on "/"', () => {
    const router = createMemoryRouter(routesConfig, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('renders NotFoundPage', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/unknown'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
