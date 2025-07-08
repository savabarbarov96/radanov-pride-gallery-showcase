import { useState, useEffect } from 'react';
import { catService, CatData } from '@/services/catService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CatGallery from './CatGallery';

interface CatManagerProps {
  onCatSelect: (cat: CatData) => void;
  selectedCat: CatData | null;
  onAddToCanvas?: (cat: CatData) => void;
  onDropCatToCanvas?: (cat: CatData, position: { x: number; y: number }) => void;
}

const CatManager = ({ onCatSelect, selectedCat, onAddToCanvas, onDropCatToCanvas }: CatManagerProps) => {
  const [cats, setCats] = useState<CatData[]>([]);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [editingCat, setEditingCat] = useState<CatData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    description: '',
    age: '',
    color: '',
    price: '',
    gender: 'male' as 'male' | 'female',
    birthDate: '',
    registrationNumber: '',
    freeText: '',
    status: 'Достъпен',
    isDisplayed: true,
    image: '',
    gallery: [] as string[]
  });

  useEffect(() => {
    setCats(catService.getAllCats());
    const unsubscribe = catService.subscribe(() => {
      setCats(catService.getAllCats());
    });
    return unsubscribe;
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      subtitle: '',
      description: '',
      age: '',
      color: '',
      price: '',
      gender: 'male',
      birthDate: '',
      registrationNumber: '',
      freeText: '',
      status: 'Достъпен',
      isDisplayed: true,
      image: '',
      gallery: []
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCat) {
      catService.updateCat(editingCat.id, formData);
      setEditingCat(null);
    } else {
      catService.addCat(formData);
      setIsAddingCat(false);
    }
    
    resetForm();
  };

  const handleEdit = (cat: CatData) => {
    setEditingCat(cat);
    setFormData({
      name: cat.name,
      subtitle: cat.subtitle,
      description: cat.description,
      age: cat.age,
      color: cat.color,
      price: cat.price,
      gender: cat.gender,
      birthDate: cat.birthDate,
      registrationNumber: cat.registrationNumber || '',
      freeText: cat.freeText || '',
      status: cat.status,
      isDisplayed: cat.isDisplayed,
      image: cat.image,
      gallery: cat.gallery
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Сигурни ли сте, че искате да изтриете тази котка?')) {
      catService.deleteCat(id);
    }
  };

  const handleToggleDisplay = (id: string) => {
    catService.toggleCatDisplay(id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setFormData(prev => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const showForm = isAddingCat || editingCat;

  if (showForm) {
    return (
      <div className="h-full flex flex-col">
        {/* Form Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="font-playfair text-xl font-semibold">
            {editingCat ? 'Редактиране на котка' : 'Добавяне на нова котка'}
          </h2>
          <Button
            onClick={() => {
              setIsAddingCat(false);
              setEditingCat(null);
              resetForm();
            }}
            variant="outline"
          >
            ← Назад
          </Button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Име</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Например: OLIVER"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Подзаглавие</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="Например: GINGER MAGIC"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Описание на котката..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Възраст</Label>
                    <Input
                      id="age"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="Например: 2 години"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Цвят</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="Например: Brown tabby"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="Например: 2500 лв"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Пол</Label>
                    <Select value={formData.gender} onValueChange={(value: 'male' | 'female') => setFormData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Мъжки</SelectItem>
                        <SelectItem value="female">Женски</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Снимка</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {formData.image && (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="freeText">Допълнителна информация</Label>
                  <Textarea
                    id="freeText"
                    value={formData.freeText}
                    onChange={(e) => setFormData(prev => ({ ...prev, freeText: e.target.value }))}
                    placeholder="Свободен текст..."
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isDisplayed"
                    checked={formData.isDisplayed}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isDisplayed: checked }))}
                  />
                  <Label htmlFor="isDisplayed">Показване на сайта</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                    {editingCat ? 'Запази' : 'Добави'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingCat(false);
                      setEditingCat(null);
                      resetForm();
                    }}
                  >
                    Отказ
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <CatGallery
      onCatSelect={onCatSelect}
      selectedCat={selectedCat}
      onAddCat={() => setIsAddingCat(true)}
      onEditCat={handleEdit}
      onAddToCanvas={onAddToCanvas}
      onDropCatToCanvas={onDropCatToCanvas}
    />
  );
};

export default CatManager;