import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { useLogin, useValidateSession } from '@/services/convexCatService';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const loginMutation = useLogin();
  const sessionValidation = useValidateSession(sessionId || undefined);

  // Check for existing session on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('adminSessionId');
    const simpleAuth = localStorage.getItem('simpleAdminAuth');
    
    if (simpleAuth === 'authenticated') {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else if (savedSessionId) {
      setSessionId(savedSessionId);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Validate session when sessionId changes
  useEffect(() => {
    if (sessionValidation !== undefined) {
      if (sessionValidation && sessionValidation.isValid) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('adminSessionId');
        setSessionId(null);
      }
      setIsLoading(false);
    }
  }, [sessionValidation]);

  const login = async (password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simple fallback authentication
      if (password === 'Savata619') {
        localStorage.setItem('simpleAdminAuth', 'authenticated');
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      }

      // Try Convex authentication as well
      try {
        const result = await loginMutation({ password });
        
        if (result.success && result.sessionId) {
          localStorage.setItem('adminSessionId', result.sessionId);
          localStorage.setItem('simpleAdminAuth', 'authenticated');
          setSessionId(result.sessionId);
          setIsAuthenticated(true);
          return true;
        }
      } catch (convexError) {
        console.log('Convex auth failed, using simple auth:', convexError);
        // If convex fails but password is correct, still allow login with simple auth
        if (password === 'Savata619') {
          localStorage.setItem('simpleAdminAuth', 'authenticated');
          setIsAuthenticated(true);
          setIsLoading(false);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminSessionId');
    localStorage.removeItem('simpleAdminAuth');
    setSessionId(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};