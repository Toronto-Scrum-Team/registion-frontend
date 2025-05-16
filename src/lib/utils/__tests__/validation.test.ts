import { validateEmail, validatePassword, validateName, validatePasswordConfirmation } from '../validation';

describe('validateEmail', () => {
  it('should return isValid=false for empty email', () => {
    const result = validateEmail('');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('required');
  });

  it('should return isValid=false for invalid email format', () => {
    const result = validateEmail('invalid-email');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('valid email');
  });

  it('should return isValid=true for valid email', () => {
    const result = validateEmail('test@example.com');
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });
});

describe('validatePassword', () => {
  it('should return isValid=false for empty password', () => {
    const result = validatePassword('');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('required');
  });

  it('should return isValid=false for password less than 8 characters', () => {
    const result = validatePassword('Abc123!');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('8 characters');
  });

  it('should return isValid=false for password without uppercase letter', () => {
    const result = validatePassword('abcdef123!');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('uppercase');
  });

  it('should return isValid=true for valid password', () => {
    const result = validatePassword('StrongP@ss123');
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });
});

describe('validateName', () => {
  it('should return isValid=false for empty name', () => {
    const result = validateName('', 'First name');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('First name is required');
  });

  it('should return isValid=true for valid name', () => {
    const result = validateName('John', 'First name');
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });
});

describe('validatePasswordConfirmation', () => {
  it('should return isValid=false for empty confirmation', () => {
    const result = validatePasswordConfirmation('password', '');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('confirm');
  });

  it('should return isValid=false for mismatched passwords', () => {
    const result = validatePasswordConfirmation('password1', 'password2');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('do not match');
  });

  it('should return isValid=true for matching passwords', () => {
    const result = validatePasswordConfirmation('password', 'password');
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });
});
