export default function getPasswordErrors(password: string): string[] {
  const errors: string[] = [];

  if (!/[0-9]/.test(password)) {
    errors.push('at least one number');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('at least one lowercase letter');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('at least one special character');
  }
  if (password.length < 8) {
    errors.push('minimum 8 characters');
  }

  return errors;
}
