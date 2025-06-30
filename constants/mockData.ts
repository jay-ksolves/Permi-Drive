import { FileItem, User } from '@/types';

export const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  displayName: 'John Doe',
  storageUsed: 2.5 * 1024 * 1024 * 1024, // 2.5GB
  storageLimit: 15 * 1024 * 1024 * 1024, // 15GB
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
};

export const MOCK_FILES: FileItem[] = [
  {
    id: '1',
    name: 'Project Proposal.pdf',
    size: 2.5 * 1024 * 1024,
    type: 'application/pdf',
    mimeType: 'application/pdf',
    url: 'https://example.com/files/1',
    thumbnailUrl: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: '1',
    isDeleted: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isPublic: false,
  },
  {
    id: '2',
    name: 'Team Photo.jpg',
    size: 5.2 * 1024 * 1024,
    type: 'image/jpeg',
    mimeType: 'image/jpeg',
    url: 'https://example.com/files/2',
    thumbnailUrl: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: '1',
    isDeleted: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    isPublic: true,
    sharedToken: 'abc123def456',
  },
  {
    id: '3',
    name: 'Budget Spreadsheet.xlsx',
    size: 1.8 * 1024 * 1024,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    url: 'https://example.com/files/3',
    userId: '1',
    isDeleted: false,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    isPublic: false,
  },
  {
    id: '4',
    name: 'Presentation.pptx',
    size: 12.3 * 1024 * 1024,
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    url: 'https://example.com/files/4',
    userId: '1',
    isDeleted: false,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    isPublic: false,
  },
  {
    id: '5',
    name: 'Meeting Recording.mp4',
    size: 45.7 * 1024 * 1024,
    type: 'video/mp4',
    mimeType: 'video/mp4',
    url: 'https://example.com/files/5',
    thumbnailUrl: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=300',
    userId: '1',
    isDeleted: false,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    isPublic: false,
  },
  {
    id: '6',
    name: 'Deleted Document.docx',
    size: 800 * 1024,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url: 'https://example.com/files/6',
    userId: '1',
    isDeleted: true,
    deletedAt: new Date('2024-01-20'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-20'),
    isPublic: false,
  },
];

export const RECENT_FILES = MOCK_FILES
  .filter(file => !file.isDeleted)
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 5);

export const DELETED_FILES = MOCK_FILES.filter(file => file.isDeleted);