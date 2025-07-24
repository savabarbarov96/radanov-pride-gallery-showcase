import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, Plus, Grip } from 'lucide-react';
import EnhancedImageGallery from '@/components/ui/enhanced-image-gallery';

interface ImageManagerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
}

const ImageManager = ({ 
  images, 
  onImagesChange, 
  label = "Images",
  maxImages = 10 
}: ImageManagerProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (images.length >= maxImages) {
        alert(`Максимум ${maxImages} изображения са разрешени`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onImagesChange([...images, imageUrl]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const openGallery = (startIndex: number) => {
    setGalleryStartIndex(startIndex);
    setIsGalleryOpen(true);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">{label}</Label>
        <span className="text-sm text-muted-foreground">
          {images.length}/{maxImages}
        </span>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-border rounded-lg p-4">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
          disabled={images.length >= maxImages}
        />
        <Label
          htmlFor="image-upload"
          className={`flex flex-col items-center justify-center gap-2 cursor-pointer text-center ${
            images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/50'
          } p-4 rounded-lg transition-colors`}
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <div>
            <p className="font-medium">
              {images.length >= maxImages 
                ? 'Достигнат е максимумът изображения'
                : 'Кликнете за качване или плъзнете изображения тук'
              }
            </p>
            <p className="text-sm text-muted-foreground">
              PNG, JPG, GIF до 10MB всяко
            </p>
          </div>
        </Label>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group bg-muted rounded-lg overflow-hidden aspect-square"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => openGallery(index)}
              />
              
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openGallery(index)}
                    className="text-xs"
                  >
                    Преглед
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                    className="text-xs"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Drag Handle */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/60 text-white p-1 rounded cursor-move">
                  <Grip className="w-3 h-3" />
                </div>
              </div>

              {/* Image Index */}
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}

          {/* Add More Button */}
          {images.length < maxImages && (
            <Label
              htmlFor="image-upload"
              className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Plus className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Добави още</span>
            </Label>
          )}
        </div>
      )}

      {/* Quick Actions */}
      {images.length > 0 && (
        <div className="flex gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openGallery(0)}
          >
            Преглед на всички ({images.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onImagesChange([])}
            className="text-destructive hover:text-destructive"
          >
            Изчисти всички
          </Button>
        </div>
      )}

      {/* Enhanced Gallery Modal */}
      <EnhancedImageGallery
        images={images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={galleryStartIndex}
        title={`${label} Gallery`}
      />
    </div>
  );
};

export default ImageManager;