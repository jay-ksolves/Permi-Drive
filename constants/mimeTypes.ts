export const MIME_TYPE_CATEGORIES = {
  images: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
    'image/tiff',
    'image/ico',
  ],
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'text/plain',
    'text/rtf',
  ],
  spreadsheets: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.spreadsheet',
    'text/csv',
  ],
  presentations: [
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.oasis.opendocument.presentation',
  ],
  videos: [
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/wmv',
    'video/flv',
    'video/webm',
    'video/mkv',
  ],
  audio: [
    'audio/mp3',
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/aac',
    'audio/flac',
    'audio/m4a',
  ],
  archives: [
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/x-tar',
    'application/gzip',
  ],
  code: [
    'text/javascript',
    'text/typescript',
    'text/html',
    'text/css',
    'application/json',
    'text/xml',
    'application/xml',
  ],
} as const;

export const MIME_TYPE_ICONS = {
  'application/pdf': '📄',
  'image/jpeg': '🖼️',
  'image/png': '🖼️',
  'image/gif': '🖼️',
  'video/mp4': '🎥',
  'audio/mp3': '🎵',
  'application/zip': '📦',
  'text/plain': '📝',
  'application/msword': '📄',
  'application/vnd.ms-excel': '📊',
  default: '📁',
} as const;

export function getMimeTypeCategory(mimeType: string): string {
  for (const [category, types] of Object.entries(MIME_TYPE_CATEGORIES)) {
    if (types.includes(mimeType as any)) {
      return category;
    }
  }
  return 'other';
}

export function getMimeTypeIcon(mimeType: string): string {
  return MIME_TYPE_ICONS[mimeType as keyof typeof MIME_TYPE_ICONS] || MIME_TYPE_ICONS.default;
}