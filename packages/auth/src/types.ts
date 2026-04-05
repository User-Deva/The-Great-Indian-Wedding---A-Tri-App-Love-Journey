export interface AuthUser {
  id: string;
  email: string;
  coupleId?: string;
  role: 'user' | 'family_member' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}
