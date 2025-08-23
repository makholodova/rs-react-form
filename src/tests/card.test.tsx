import Card from '../../src/components/card/card';
import { render, screen } from '@testing-library/react';
import type { User } from '../types';
import styles from '../../src/components/card/card.module.css';

const mockUser: User = {
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
};

describe('Card', () => {
  it('renders user data', () => {
    render(<Card isNewUser={false} user={mockUser} />);
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  it('applies the cardNew class when isNewUser is true', () => {
    const { container } = render(<Card isNewUser user={mockUser} />);
    expect(container.firstChild).toHaveClass(styles.cardNew);
  });
});
