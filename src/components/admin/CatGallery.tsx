import { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDragFromGallery } from '@/hooks/useDragFromGallery';

interface CatGalleryProps {
  onCatSelect: (cat: any) => void;
  selectedCat: any | null;
  onAddCat: () => void;
  onEditCat: (cat: any) => void;
  onAddToCanvas?: (cat: any) => void;
  onDropCatToCanvas?: (cat: any, position: { x: number; y: number }) => void;
}

const CatGallery = ({ onCatSelect, selectedCat, onAddCat, onEditCat, onAddToCanvas, onDropCatToCanvas }: CatGalleryProps) => {
  const cats = useQuery(api.cats.getAllCats) || [];
  const toggleCatDisplay = useMutation(api.cats.toggleCatDisplay);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'displayed' | 'hidden'>('all');

  const { startDrag, isDragging } = useDragFromGallery({
    onDrop: (cat, position) => {
      onDropCatToCanvas?.(cat, position);
    }
  });


  const filteredCats = cats.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cat.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || cat.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'displayed' && cat.isDisplayed) ||
                         (statusFilter === 'hidden' && !cat.isDisplayed);
    
    return matchesSearch && matchesGender && matchesStatus;
  });

  const getParentInfo = (cat: any) => {
    // TODO: Implement with Convex queries for parents and children
    return { 
      parents: { mother: null, father: null }, 
      children: [] 
    };
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <h2 className="font-playfair text-xl font-semibold">Cat Gallery</h2>
        <Button
          onClick={onAddCat}
          className="bg-black text-white hover:bg-gray-800"
        >
          + Добави котка
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b bg-gray-50 space-y-3">
        <Input
          placeholder="🔍 Търси по име..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        
        <div className="flex gap-2">
          <Select value={genderFilter} onValueChange={(value: 'all' | 'male' | 'female') => setGenderFilter(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всички</SelectItem>
              <SelectItem value="male">♂ Мъжки</SelectItem>
              <SelectItem value="female">♀ Женски</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(value: 'all' | 'displayed' | 'hidden') => setStatusFilter(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всички</SelectItem>
              <SelectItem value="displayed">Показани</SelectItem>
              <SelectItem value="hidden">Скрити</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3">
          {filteredCats.map((cat) => {
            const { parents, children } = getParentInfo(cat);
            const isSelected = selectedCat?._id === cat._id;
            
            return (
              <Card
                key={cat._id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
                } ${onDropCatToCanvas ? 'hover:ring-1 hover:ring-green-400' : ''} ${
                  isDragging ? 'opacity-50' : ''
                }`}
                onClick={() => onCatSelect(cat)}
                onDoubleClick={() => onAddToCanvas?.(cat)}
                onMouseDown={(e) => {
                  if (onDropCatToCanvas && e.button === 0) {
                    startDrag(cat, e.nativeEvent);
                  }
                }}
                title={onDropCatToCanvas ? 'Влачете за добавяне на canvas или двойно кликнете' : ''}
              >
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    {/* Cat Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={cat.image || '/placeholder.jpg'}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Cat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate">{cat.name}</h3>
                        <Badge variant={cat.gender === 'male' ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
                          {cat.gender === 'male' ? '♂' : '♀'}
                        </Badge>
                        {cat.isDisplayed && (
                          <Badge variant="outline" className="text-xs text-green-600 flex-shrink-0">
                            Показан
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-1 truncate">{cat.subtitle}</p>
                      <p className="text-xs text-gray-500 mb-2 truncate">{cat.age} • {cat.color}</p>
                      
                      {/* Pedigree Info */}
                      <div className="text-xs text-gray-500 mb-2">
                        {parents.mother || parents.father ? (
                          <p className="truncate">
                            📊 {parents.mother?.name || '?'} × {parents.father?.name || '?'}
                          </p>
                        ) : (
                          <p>📊 Няма родители</p>
                        )}
                        {children.length > 0 && (
                          <p>👶 {children.length} деца</p>
                        )}
                        {onDropCatToCanvas && (
                          <p className="text-blue-600 font-medium">👆 Влачете или двойно кликни</p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 text-xs"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await toggleCatDisplay({ id: cat._id });
                        }}
                        title={cat.isDisplayed ? 'Скрий' : 'Покажи'}
                      >
                        {cat.isDisplayed ? '👁️' : '🚫'}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditCat(cat);
                        }}
                        title="Редактирай"
                      >
                        ✏️
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCats.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">🐱 Няма котки</p>
            <p className="text-sm">
              {cats.length === 0 
                ? 'Добавете първата котка'
                : 'Променете филтрите за да видите котки'
              }
            </p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Общо котки: {cats.length}</span>
          <span>Показани: {cats.filter(c => c.isDisplayed).length}</span>
          <span>Филтрирани: {filteredCats.length}</span>
        </div>
      </div>
    </div>
  );
};

export default CatGallery;