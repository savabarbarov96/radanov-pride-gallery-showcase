import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { useLogin, useLogout, useValidateSession } from '@/services/convexCatService';

interface ConvexAuthContextType {
  isAuthenticated: boolean;
  sessionId: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const ConvexAuthContext = createContext<ConvexAuthContextType | undefined>(undefined);

export const ConvexAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem('admin_session_id')
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const sessionValidation = useValidateSession(sessionId || undefined);

  // Check session validity on mount and when sessionId changes
  useEffect(() => {
    if (sessionId && sessionValidation) {
      setIsAuthenticated(sessionValidation.isValid);
      if (!sessionValidation.isValid) {
        // Clear invalid session
        localStorage.removeItem('admin_session_id');
        setSessionId(null);
      }
    } else if (sessionId === null) {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, [sessionValidation, sessionId]);

  const login = async (password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await loginMutation({
        password,
        sessionDuration: 24 * 60 * 60 * 1000 // 24 hours
      });

      if (result.success) {
        setSessionId(result.sessionId);
        setIsAuthenticated(true);
        localStorage.setItem('admin_session_id', result.sessionId);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      if (sessionId) {
        await logoutMutation({ sessionId });
      }
      
      setIsAuthenticated(false);
      setSessionId(null);
      localStorage.removeItem('admin_session_id');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConvexAuthContext.Provider value={{ 
      isAuthenticated, 
      sessionId, 
      login, 
      logout, 
      isLoading,
      error 
    }}>
      {children}
    </ConvexAuthContext.Provider>
  );
};

export const useConvexAuth = () => {
  const context = useContext(ConvexAuthContext);
  if (context === undefined) {
    throw new Error('useConvexAuth must be used within a ConvexAuthProvider');
  }
  return context;
}; 