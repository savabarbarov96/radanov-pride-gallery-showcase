import { useState } from 'react';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CatGalleryItem from './CatGalleryItem';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'displayed' | 'hidden'>('all');


  const filteredCats = cats.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cat.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || cat.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'displayed' && cat.isDisplayed) ||
                         (statusFilter === 'hidden' && !cat.isDisplayed);
    
    return matchesSearch && matchesGender && matchesStatus;
  });


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
            const catUniqueId = ('id' in cat ? (cat as any).id : undefined) ?? cat._id;

            const selectedUniqueId = selectedCat
              ? (('id' in selectedCat ? (selectedCat as any).id : undefined) ?? selectedCat._id)
              : undefined;

            const isSelected = selectedUniqueId !== undefined && selectedUniqueId === catUniqueId;

            return (
              <CatGalleryItem
                key={catUniqueId}
                cat={cat}
                isSelected={isSelected}
                onSelect={onCatSelect}
                onEdit={onEditCat}
                onAddToCanvas={onAddToCanvas}
                onDropToCanvas={onDropCatToCanvas}
                showDragHint={!!onDropCatToCanvas}
              />
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