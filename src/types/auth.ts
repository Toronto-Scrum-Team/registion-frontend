export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Session {
  session_id: string;
  user_id: string;
  expires_at: string;
  device_info: string | null;
  created_at: string;
  last_accessed_at: string | null;
}

export interface SessionListResponse {
  sessions: Session[];
  total: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  sessions: Session[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface LogoutResponse {
  message: string;
  success: boolean;
}

export interface SessionTerminateRequest {
  session_id: string;
}

export interface SessionTerminateResponse {
  message: string;
  success: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshSessions: () => Promise<void>;
  terminateSession: (sessionId: string) => Promise<void>;
  terminateAllSessions: () => Promise<void>;
}

export interface DeviceInfo {
  user_agent?: string;
  ip_address?: string;
  timestamp?: string;
}