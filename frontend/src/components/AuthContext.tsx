import { createContext, useContext, useEffect, useState } from 'react';
import { verify } from '../services/users';
import { CurrentUser } from '../lib/users';

interface Context {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setCurrentUser: (value: CurrentUser) => void;
}

const AuthContext = createContext<Context>({
  currentUser: null,
  isLoading: true,
  setIsLoading: () => {},
  setCurrentUser: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await verify();

        if (user) {
          setCurrentUser(user);
          setIsLoading(false);
        }
      } catch (error) {
        setCurrentUser(null);
        setIsLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth should be within a AuthProvider');
  }
  return context;
}
export default AuthContext;
