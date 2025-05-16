import { authService } from '../auth';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('authService', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  describe('login', () => {
    it('should reject with error for invalid email', async () => {
      await expect(authService.login({ 
        email: 'invalid-email', 
        password: 'Password123!' 
      })).rejects.toThrow('Invalid email format');
    });

    it('should reject with error for empty password', async () => {
      await expect(authService.login({ 
        email: 'test@example.com', 
        password: '' 
      })).rejects.toThrow('Password is required');
    });

    it('should resolve with user data for valid credentials', async () => {
      const credentials = { 
        email: 'test@example.com', 
        password: 'Password123!' 
      };
      
      const user = await authService.login(credentials);
      
      expect(user).toEqual({
        id: expect.any(String),
        email: credentials.email,
        name: expect.any(String),
        createdAt: expect.any(String)
      });
    });
  });

  describe('register', () => {
    it('should reject with error for invalid email', async () => {
      await expect(authService.register({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      })).rejects.toThrow('Invalid email format');
    });

    it('should reject with error for password mismatch', async () => {
      await expect(authService.register({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'DifferentPassword123!'
      })).rejects.toThrow('Passwords do not match');
    });

    it('should resolve with user data for valid registration data', async () => {
      const credentials = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      };
      
      const user = await authService.register(credentials);
      
      expect(user).toEqual({
        id: expect.any(String),
        email: credentials.email,
        name: expect.stringContaining(credentials.firstName),
        createdAt: expect.any(String)
      });
    });
  });

  describe('getCurrentUser', () => {
    it('should return null if no user in localStorage', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const user = await authService.getCurrentUser();
      
      expect(user).toBeNull();
      expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
    });

    it('should return user if valid user in localStorage', async () => {
      const mockUser = { 
        id: '1', 
        email: 'test@example.com', 
        name: 'Test User', 
        createdAt: '2023-01-01' 
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
      
      const user = await authService.getCurrentUser();
      
      expect(user).toEqual(mockUser);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
    });
  });
});
