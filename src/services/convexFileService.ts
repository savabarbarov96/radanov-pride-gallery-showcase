import { useAction, useMutation } from "convex/react";
import { api } from "@/lib/convex";
import { Id } from "../../convex/_generated/dataModel";

export interface FileUploadResult {
  success: boolean;
  storageId?: Id<"_storage">;
  url?: string;
  error?: string;
}

export interface UploadFileOptions {
  associatedCatId?: Id<"cats">;
  imageType: 'profile' | 'gallery' | 'general';
  onProgress?: (progress: number) => void;
}

// Hook for uploading files to Convex storage
export const useFileUpload = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveUploadedFile = useMutation(api.files.saveUploadedFile);

  const uploadFile = async (
    file: File, 
    options: UploadFileOptions
  ): Promise<FileUploadResult> => {
    try {
      options.onProgress?.(0);

      // Step 1: Generate upload URL
      const postUrl = await generateUploadUrl();
      options.onProgress?.(25);

      // Step 2: Upload file to Convex storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.status} ${result.statusText}`);
      }

      options.onProgress?.(75);

      const { storageId } = await result.json();

      // Step 3: Save file metadata
      const metadata = await saveUploadedFile({
        storageId,
        filename: file.name,
        associatedCatId: options.associatedCatId,
        imageType: options.imageType,
      });

      options.onProgress?.(100);

      return {
        success: true,
        storageId,
        url: metadata.url,
      };

    } catch (error) {
      console.error('File upload failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  };

  return { uploadFile };
};

// Hook for uploading multiple files
export const useMultiFileUpload = () => {
  const { uploadFile } = useFileUpload();

  const uploadMultipleFiles = async (
    files: File[],
    options: UploadFileOptions,
    onProgress?: (fileIndex: number, progress: number, total: number) => void
  ): Promise<FileUploadResult[]> => {
    const results: FileUploadResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      const result = await uploadFile(file, {
        ...options,
        onProgress: (progress) => onProgress?.(i, progress, files.length),
      });

      results.push(result);
    }

    return results;
  };

  return { uploadMultipleFiles };
};

// Utility to validate image files
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Неподдържан формат. Моля, използвайте JPG, PNG, GIF или WebP.'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Файлът е твърде голям. Максимално 10MB.'
    };
  }

  return { valid: true };
};

// Utility to get file info
export const getFileInfo = (file: File) => {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    sizeFormatted: formatFileSize(file.size),
  };
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 