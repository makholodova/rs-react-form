import { render, screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';
import type { User } from '../types';
import FormSection from '../components/form-section/form-section.tsx';

vi.mock('../card/card', () => ({
  default: ({ user, isNewUser }: { user: User; isNewUser: boolean }) => (
    <div data-testid="card">
      <span>{user.name}</span>
      {isNewUser && <span data-testid="new-user">New</span>}
    </div>
  ),
}));

const usersMock: User[] = [
  {
    id: '1_234_5',
    name: 'John',
    age: 25,
    email: 'john@example.com',
    password: '123456',
    confirmPassword: '123456',
    gender: 'male',
    country: 'USA',
    image: 'test.jpg',
    isTCAccepted: true,
  },
];

describe('FormSection', () => {
  it('renders title', () => {
    render(
      <FormSection title="Test Title" users={usersMock} lastAddedId={null} />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
