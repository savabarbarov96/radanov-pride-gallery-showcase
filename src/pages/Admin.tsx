import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import AdminLogin from './AdminLogin';
import CatManager from '@/components/admin/CatManager';
import PedigreeCanvas from '@/components/admin/PedigreeCanvas';
import { CatData } from '@/services/convexCatService';

const Admin = () => {
  const { isAuthenticated, isLoading, logout } = useAdminAuth();
  const [selectedCat, setSelectedCat] = useState<CatData | null>(null);
  const [canvasInstance, setCanvasInstance] = useState<{ addCatToCanvas: (cat: CatData, position?: { x: number; y: number }) => void } | null>(null);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Зареждане...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="font-playfair text-2xl font-semibold text-black">
            Pedigree Admin Dashboard
          </h1>
          <Button
            onClick={logout}
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
          >
            Изход
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Cat Manager */}
        <div className="w-2/5 bg-white border-r">
          <CatManager
            onCatSelect={setSelectedCat}
            selectedCat={selectedCat}
            onAddToCanvas={(cat) => {
              setSelectedCat(cat);
            }}
            onDropCatToCanvas={(cat, position) => {
              canvasInstance?.addCatToCanvas(cat, position);
            }}
          />
        </div>

        {/* Right Panel - Pedigree Canvas */}
        <div className="flex-1 bg-background">
          <PedigreeCanvas 
            selectedCat={selectedCat} 
            onCanvasReady={setCanvasInstance}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;