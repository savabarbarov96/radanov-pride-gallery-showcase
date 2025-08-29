import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFileUpload, validateImageFile, getFileInfo, UploadFileOptions } from '@/services/convexFileService';
import { Upload, X, Image, Loader2, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { compressImage, validateImageFile as validateImage, getOptimalFormat } from '@/lib/imageUtils';

interface ImageUploadProps {
  onUploadSuccess: (url: string, storageId: string) => void;
  onUploadError?: (error: string) => void;
  currentImageUrl?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  uploadOptions?: Partial<UploadFileOptions>;
  className?: string;
  previewSize?: 'small' | 'medium' | 'large';
  enableCompression?: boolean; // New prop to enable/disable compression
}

export const ImageUpload = ({
  onUploadSuccess,
  onUploadError,
  currentImageUrl,
  label = 'Изображение',
  placeholder = 'Изберете изображение или влачете тук',
  required = false,
  uploadOptions = {},
  className = '',
  previewSize = 'medium',
  enableCompression = true
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = useFileUpload();

  const getPreviewSizeClasses = () => {
    switch (previewSize) {
      case 'small': return 'w-16 h-16';
      case 'large': return 'w-48 h-48';
      default: return 'w-24 h-24';
    }
  };

  const handleFileSelect = useCallback(async (file: File) => {
    // Use our new validation function
    if (!validateImage(file)) {
      onUploadError?.('Невалиден файл или размерът е твърде голям (макс. 10MB)');
      toast({
        title: "Грешка при избора на файл",
        description: 'Моля изберете валиден image файл (JPEG, PNG, WebP) под 10MB',
        variant: "destructive"
      });
      return;
    }

    const originalSize = file.size;
    let processedFile = file;

    try {
      // Compress image if enabled and file is over 100KB
      if (enableCompression && file.size > 100 * 1024) {
        setIsCompressing(true);
        
        const optimalFormat = getOptimalFormat();
        processedFile = await compressImage(file, {
          maxWidth: 1920,
          maxHeight: 1080,
          quality: 0.8,
          format: optimalFormat
        });

        const compressionRatio = ((originalSize - processedFile.size) / originalSize * 100);
        
        toast({
          title: "Изображението е оптимизирано",
          description: `Размерът е намален с ${Math.round(compressionRatio)}% (${Math.round(originalSize/1024)}KB → ${Math.round(processedFile.size/1024)}KB)`,
          variant: "default"
        });
      }
    } catch (compressionError) {
      // If compression fails, use original file
      console.warn('Image compression failed, using original:', compressionError);
      processedFile = file;
    } finally {
      setIsCompressing(false);
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Create preview from processed file
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(processedFile);

    try {
      const result = await uploadFile(processedFile, {
        imageType: 'general',
        ...uploadOptions,
        onProgress: setUploadProgress
      });

      if (result.success && result.url && result.storageId) {
        onUploadSuccess(result.url, result.storageId);
        setPreviewUrl(result.url);
        toast({
          title: "Качването е успешно",
          description: `${processedFile.name} е качен успешно`,
          variant: "default"
        });
      } else {
        throw new Error(result.error || 'Неуспешно качване');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Грешка при качването';
      onUploadError?.(errorMessage);
      toast({
        title: "Грешка при качването",
        description: errorMessage,
        variant: "destructive"
      });
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [uploadFile, uploadOptions, onUploadSuccess, onUploadError, currentImageUrl, enableCompression]);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    } else {
      toast({
        title: "Невалиден файл",
        description: "Моля, изберете изображение",
        variant: "destructive"
      });
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      {/* Hidden file input */}
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        required={required}
      />

      {/* Upload area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 cursor-pointer
          ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading || isCompressing ? 'pointer-events-none opacity-60' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Preview */}
        {previewUrl && (
          <div className="flex items-start gap-4 mb-4">
            <div className={`${getPreviewSizeClasses()} bg-gray-100 rounded-lg overflow-hidden flex-shrink-0`}>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Избрано изображение
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearImage();
                  }}
                  disabled={isUploading}
                >
                  <X className="w-4 h-4 mr-1" />
                  Премахни
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Промени
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Upload UI */}
        <div className="text-center">
          {isCompressing ? (
            <div className="space-y-2">
              <Zap className="w-8 h-8 mx-auto animate-pulse text-orange-500" />
              <p className="text-sm text-gray-600">Оптимизиране на изображението...</p>
            </div>
          ) : isUploading ? (
            <div className="space-y-2">
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-500" />
              <p className="text-sm text-gray-600">Качване... {Math.round(uploadProgress)}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-center">
                {previewUrl ? (
                  <Upload className="w-8 h-8 text-gray-400" />
                ) : (
                  <Image className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {previewUrl ? 'Качете ново изображение' : placeholder}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, GIF или WebP (макс. 10MB)
                  {enableCompression && (
                    <span className="flex items-center justify-center mt-1 text-green-600">
                      <Zap className="w-3 h-3 mr-1" />
                      Автоматично оптимизиране
                    </span>
                  )}
                </p>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  openFileDialog();
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Избери файл
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};