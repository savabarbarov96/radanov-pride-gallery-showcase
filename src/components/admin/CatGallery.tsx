import { useState } from 'react';
import { CatData, useBulkUpdateCategory } from '@/services/convexCatService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useDragFromGallery } from '@/hooks/useDragFromGallery';
import { Id } from '../../../convex/_generated/dataModel';

interface CatGalleryProps {
  onCatSelect: (cat: CatData) => void;
  selectedCat: CatData | null;
  onAddCat: () => void;
  onEditCat: (cat: CatData) => void;
  onAddToCanvas?: (cat: CatData) => void;
  onDropCatToCanvas?: (cat: CatData, position: { x: number; y: number }) => void;
  onDeleteCat: (id: Id<"cats">) => void;
  onToggleDisplay: (id: Id<"cats">) => void;
  cats: CatData[];
}

const CatGallery = ({ 
  onCatSelect, 
  selectedCat, 
  onAddCat, 
  onEditCat, 
  onAddToCanvas, 
  onDropCatToCanvas,
  onDeleteCat,
  onToggleDisplay,
  cats
}: CatGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'displayed' | 'hidden'>('all');
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [bulkMode, setBulkMode] = useState(false);
  
  const bulkUpdateCategory = useBulkUpdateCategory();

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

  const handleBulkCategoryUpdate = async (category: 'kitten' | 'adult' | 'all') => {
    if (selectedCats.size === 0) return;
    
    try {
      await bulkUpdateCategory({
        catIds: Array.from(selectedCats) as Id<"cats">[],
        category
      });
      setSelectedCats(new Set());
      setBulkMode(false);
    } catch (error) {
      console.error('Error updating categories:', error);
      alert('Грешка при обновяването на категориите');
    }
  };

  const toggleCatSelection = (catId: string) => {
    const newSelection = new Set(selectedCats);
    if (newSelection.has(catId)) {
      newSelection.delete(catId);
    } else {
      newSelection.add(catId);
    }
    setSelectedCats(newSelection);
  };

  const selectAllFiltered = () => {
    const allFilteredIds = new Set(filteredCats.map(cat => cat._id));
    setSelectedCats(allFilteredIds);
  };

  const clearSelection = () => {
    setSelectedCats(new Set());
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <h2 className="font-playfair text-xl font-semibold">Галерия с котки</h2>
          {bulkMode && (
            <Badge variant="secondary" className="text-xs">
              {selectedCats.size} избрани
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setBulkMode(!bulkMode);
              setSelectedCats(new Set());
            }}
            variant={bulkMode ? "secondary" : "outline"}
            size="sm"
          >
            {bulkMode ? "Изход от групово" : "Групово избиране"}
          </Button>
          <Button
            onClick={onAddCat}
            className="bg-black text-white hover:bg-gray-800"
          >
            + Добави котка
          </Button>
        </div>
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

        {/* Bulk Actions */}
        {bulkMode && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Button onClick={selectAllFiltered} size="sm" variant="outline">
              Избери всички ({filteredCats.length})
            </Button>
            <Button onClick={clearSelection} size="sm" variant="outline">
              Изчисти избора
            </Button>
            {selectedCats.size > 0 && (
              <>
                <div className="w-px h-6 bg-gray-300 mx-2" />
                <span className="text-sm font-medium">Задай категория:</span>
                <Button onClick={() => handleBulkCategoryUpdate('kitten')} size="sm" variant="default">
                  Коте
                </Button>
                <Button onClick={() => handleBulkCategoryUpdate('adult')} size="sm" variant="default">
                  Възрастна
                </Button>
                <Button onClick={() => handleBulkCategoryUpdate('all')} size="sm" variant="default">
                  Всички
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3">
          {filteredCats.map((cat) => {
            const isSelected = selectedCat?._id === cat._id;
            
            return (
              <Card
                key={cat._id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
                } ${onDropCatToCanvas ? 'hover:ring-1 hover:ring-green-400' : ''} ${
                  isDragging ? 'opacity-50' : ''
                } ${bulkMode && selectedCats.has(cat._id) ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}
                onClick={() => bulkMode ? toggleCatSelection(cat._id) : onCatSelect(cat)}
                onDoubleClick={() => !bulkMode && onAddToCanvas?.(cat)}
                onMouseDown={(e) => {
                  if (onDropCatToCanvas && e.button === 0 && !bulkMode) {
                    startDrag(cat, e.nativeEvent);
                  }
                }}
                title={bulkMode ? 'Кликнете за избиране' : (onDropCatToCanvas ? 'Влачете за добавяне на canvas или двойно кликнете' : '')}
              >
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    {/* Bulk Selection Checkbox */}
                    {bulkMode && (
                      <div className="flex items-center">
                        <Checkbox
                          checked={selectedCats.has(cat._id)}
                          onCheckedChange={() => toggleCatSelection(cat._id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}

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
                        {cat.category && (
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            {cat.category === 'kitten' ? '🐱 Коте' : cat.category === 'adult' ? '🐈 Възрастна' : '📂 Всички'}
                          </Badge>
                        )}
                        {cat.isDisplayed && (
                          <Badge variant="outline" className="text-xs text-green-600 flex-shrink-0">
                            Показан
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-1 truncate">{cat.subtitle}</p>
                      <p className="text-xs text-gray-500 mb-2 truncate">{cat.age} • {cat.color}</p>
                      
                      {/* Status Info */}
                      <div className="text-xs text-gray-500 mb-2">
                        <p>📊 Статус: {cat.status}</p>
                        {cat.registrationNumber && (
                          <p>🔖 Рег. №: {cat.registrationNumber}</p>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleDisplay(cat._id);
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
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 text-xs text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCat(cat._id);
                        }}
                        title="Изтрий"
                      >
                        🗑️
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