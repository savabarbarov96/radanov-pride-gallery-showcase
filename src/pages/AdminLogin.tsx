import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(password);
    if (!success) {
      setError('Неправилна парола');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-playfair text-2xl text-black">
            Admin Panel
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Въведете парола за достъп
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Парола"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                autoFocus
              />
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Влез
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;