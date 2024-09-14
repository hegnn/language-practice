import { useStorageState } from '@/hooks/useStorageState';
import { useContext, createContext, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
  login: (session: string) => void;
  logout: () => void;
  register: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  login: () => null,
  logout: () => null,
  register: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        login: (session: string) => {
          // Perform sign-in logic here
          setSession(session);
        },
        register: () => {},
        logout: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
