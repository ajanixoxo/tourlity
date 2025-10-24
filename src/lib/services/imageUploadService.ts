
import { supabaseAdmin } from '@/lib/supabase'; // Change this line
import { v4 as uuidv4 } from 'uuid';

export type UploadedImage = {
  url: string;
  path: string;
};

export class ImageUploadService {
  private static readonly ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  private static readonly MAX_SIZE = 5 * 1024 * 1024; // 5MB

  /**
   * Validates a single file
   */
  private static validateFile(file: File): void {
    if (!ImageUploadService.ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.type}`);
    }
    if (file.size > ImageUploadService.MAX_SIZE) {
      throw new Error(`File too large: ${file.name}`);
    }
  }

  /**
   * Uploads multiple files to a specific tour folder
   */
  static async uploadTourImages(
    files: File[],
    tourId: string,
    subfolder: 'tour-images' | 'hotel-images'
  ): Promise<UploadedImage[]> {
    const uploadedImages: UploadedImage[] = [];

    try {
      for (const [index, file] of files.entries()) {
        // Validate file
        ImageUploadService.validateFile(file);

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = index === 0 && subfolder === 'tour-images'
          ? 'cover'
          : uuidv4();
        const filePath = `tours/${tourId}/${subfolder}/${fileName}.${fileExt}`;

        // Upload to Supabase Storage
        const { data, error } = await supabaseAdmin.storage // Use supabaseAdmin
          .from('tours')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          throw new Error(`Failed to upload ${file.name}: ${error.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin.storage // Use supabaseAdmin
          .from('tours')
          .getPublicUrl(data.path);

        uploadedImages.push({
          url: publicUrl,
          path: data.path
        });
      }

      return uploadedImages;
    } catch (error) {
      // If any upload fails, attempt to delete all previously uploaded images
      await this.deleteUploadedImages(uploadedImages);
      throw error;
    }
  }

  /**
   * Deletes uploaded images (used for rollback)
   */
  static async deleteUploadedImages(images: UploadedImage[]): Promise<void> {
    for (const image of images) {
      try {
        const { error } = await supabaseAdmin.storage // Use supabaseAdmin
          .from('tours')
          .remove([image.path]);
        
        if (error) {
          console.error(`Failed to delete image ${image.path}:`, error);
        }
      } catch (error) {
        console.error(`Error deleting image ${image.path}:`, error);
      }
    }
  }
}