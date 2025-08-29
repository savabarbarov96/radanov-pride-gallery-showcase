/**
 * Simple client-side image compression utilities
 * Optimized for cat gallery photos - balance between quality and size
 */

export interface CompressImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'original';
}

/**
 * Compress an image file on the client side
 * @param file - The original image file
 * @param options - Compression options
 * @returns Promise<File> - The compressed image file
 */
export async function compressImage(
  file: File, 
  options: CompressImageOptions = {}
): Promise<File> {
  const {
    maxWidth = 1920,  // Max width for gallery images
    maxHeight = 1080, // Max height for gallery images
    quality = 0.8,    // 80% quality - good balance
    format = 'jpeg'   // JPEG for photos, WebP if supported
  } = options;

  return new Promise((resolve, reject) => {
    // Skip compression for very small files (under 100KB)
    if (file.size < 100 * 1024) {
      resolve(file);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.fillStyle = '#FFFFFF'; // White background for JPEG
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob with compression
      const outputFormat = format === 'original' ? file.type : 
                          format === 'webp' ? 'image/webp' : 'image/jpeg';
      
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas to blob conversion failed'));
            return;
          }

          // Create new file with same name but potentially different extension
          const compressedFile = new File(
            [blob], 
            file.name.replace(/\.[^/.]+$/, format === 'webp' ? '.webp' : '.jpg'),
            { type: outputFormat }
          );

          resolve(compressedFile);
        },
        outputFormat,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Image loading failed'));
    };

    // Load the image
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Create a thumbnail version of an image
 * @param file - The original image file
 * @returns Promise<File> - The thumbnail file
 */
export async function createThumbnail(file: File): Promise<File> {
  return compressImage(file, {
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.7,
    format: 'jpeg'
  });
}

/**
 * Check if WebP format is supported by the browser
 * @returns boolean - Whether WebP is supported
 */
export function isWebPSupported(): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Get optimal image format based on browser support
 * @returns 'webp' | 'jpeg' - The optimal format to use
 */
export function getOptimalFormat(): 'webp' | 'jpeg' {
  return isWebPSupported() ? 'webp' : 'jpeg';
}

/**
 * Validate image file before upload
 * @param file - The file to validate
 * @returns boolean - Whether the file is a valid image
 */
export function validateImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB max

  return validTypes.includes(file.type) && file.size <= maxSize;
}