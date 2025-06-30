import { FileItem, UploadProgress } from '@/types';
import { API_CONFIG } from '@/constants/config';

class FileService {
  private baseUrl = API_CONFIG.baseUrl;

  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<FileItem> {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.data);
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `${this.baseUrl}/files/upload`);
      xhr.send(formData);
    });
  }

  async getFiles(params?: {
    search?: string;
    mimeType?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<{ files: FileItem[]; total: number }> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${this.baseUrl}/files?${searchParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    return response.json();
  }

  async getFile(fileId: string): Promise<FileItem> {
    const response = await fetch(`${this.baseUrl}/files/${fileId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }

    return response.json();
  }

  async deleteFile(fileId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/files/${fileId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete file');
    }
  }

  async restoreFile(fileId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/files/${fileId}/restore`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to restore file');
    }
  }

  async permanentlyDeleteFile(fileId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/files/${fileId}/permanent`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to permanently delete file');
    }
  }

  async shareFile(fileId: string, options: {
    password?: string;
    expiryDays?: number;
    allowDownload?: boolean;
    allowPreview?: boolean;
  }): Promise<{ shareUrl: string; token: string }> {
    const response = await fetch(`${this.baseUrl}/files/${fileId}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error('Failed to share file');
    }

    return response.json();
  }

  async downloadFile(fileId: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/files/${fileId}/download`);
    
    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    return response.blob();
  }

  async getTrashedFiles(): Promise<FileItem[]> {
    const response = await fetch(`${this.baseUrl}/files/trash`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trashed files');
    }

    const data = await response.json();
    return data.files;
  }

  async getStorageUsage(): Promise<{
    used: number;
    limit: number;
    breakdown: Record<string, number>;
  }> {
    const response = await fetch(`${this.baseUrl}/storage/usage`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch storage usage');
    }

    return response.json();
  }
}

export const fileService = new FileService();