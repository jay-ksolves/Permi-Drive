import { FileItem, FileFilters } from '@/types';
import { MIME_TYPE_CATEGORIES, getMimeTypeCategory } from '@/constants/mimeTypes';

export function groupFilesByMimeType(files: FileItem[]) {
  const grouped: Record<string, FileItem[]> = {};
  
  files.forEach(file => {
    const category = getMimeTypeCategory(file.mimeType);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(file);
  });
  
  return grouped;
}

export function filterFiles(files: FileItem[], filters: FileFilters): FileItem[] {
  let filtered = [...files];

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(file =>
      file.name.toLowerCase().includes(searchTerm)
    );
  }

  // MIME type filter
  if (filters.mimeType && filters.mimeType !== 'all') {
    if (filters.mimeType in MIME_TYPE_CATEGORIES) {
      const allowedTypes = MIME_TYPE_CATEGORIES[filters.mimeType as keyof typeof MIME_TYPE_CATEGORIES];
      filtered = filtered.filter(file => allowedTypes.includes(file.mimeType as any));
    }
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (filters.sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'size':
        aValue = a.size;
        bValue = b.size;
        break;
      case 'date':
        aValue = new Date(a.updatedAt);
        bValue = new Date(b.updatedAt);
        break;
      case 'type':
        aValue = a.type.toLowerCase();
        bValue = b.type.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return filtered;
}

export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

export function isValidFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize;
}

export function generateShareToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isImageFile(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

export function isVideoFile(mimeType: string): boolean {
  return mimeType.startsWith('video/');
}

export function calculateTrashDaysRemaining(deletedAt: Date, retentionDays: number): number {
  const deletedTime = new Date(deletedAt).getTime();
  const expiryTime = deletedTime + (retentionDays * 24 * 60 * 60 * 1000);
  const remainingTime = expiryTime - Date.now();
  return Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
}