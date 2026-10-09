import { createContext, useEffect, useState, type ReactNode } from 'react';
import { authService } from '../services/authService';
import type { AuthState, AuthUser } from '../types';

export const AuthContext = createContext<AuthState | null>(null);

const initialState: AuthState = {
  user: null,
  profile: null,
  role: null,
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const session = await authService.getSession();
        if (!isMounted) return;

        if (!session?.user) {
          setState({ ...initialState, isLoading: false });
          return;
        }

        const user: AuthUser = { id: session.user.id, email: session.user.email ?? null };
        const profile = await authService.getProfile(user.id);

        if (!isMounted) return;
        setState({
          user,
          profile,
          role: profile?.role ?? null,
          isLoading: false,
          isAuthenticated: true,
          isAdmin: profile?.role === 'ADMIN',
        });
      } catch {
        if (isMounted) setState({ ...initialState, isLoading: false });
      }
    }

    void loadSession();

    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setState({ ...initialState, isLoading: false });
        return;
      }
      const user: AuthUser = { id: session.user.id, email: session.user.email ?? null };
      const profile = await authService.getProfile(user.id);
      setState({
        user,
        profile,
        role: profile?.role ?? null,
        isLoading: false,
        isAuthenticated: true,
        isAdmin: profile?.role === 'ADMIN',
      });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
