export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  displayName?: string;
  storageUsed: number;
  storageLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  mimeType: string;
  url?: string;
  thumbnailUrl?: string;
  folderId?: string;
  userId: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  sharedToken?: string;
  isPublic: boolean;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  userId: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShareToken {
  id: string;
  token: string;
  fileId: string;
  expiresAt?: Date;
  createdAt: Date;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export type ViewMode = 'list' | 'grid' | 'thumbnail';

export type SortOption = 'name' | 'size' | 'date' | 'type';

export interface FileFilters {
  search: string;
  mimeType?: string;
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
}