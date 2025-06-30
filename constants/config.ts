export const APP_CONFIG = {
  name: 'PermiDrive',
  description: 'Secure cloud storage and file sharing platform',
  version: '1.0.0',
  author: 'PermiDrive Team',
} as const;

export const STORAGE_CONFIG = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  maxFilesPerUpload: 10,
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/zip',
    'application/x-rar-compressed',
    'video/mp4',
    'video/avi',
    'video/mov',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
  ],
  trashRetentionDays: 30,
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
} as const;

export const THEME_CONFIG = {
  defaultTheme: 'light',
  storageKey: 'permidrive-theme',
} as const;

export const PAGINATION_CONFIG = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;