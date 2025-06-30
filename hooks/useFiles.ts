'use client';

import { useState, useEffect } from 'react';
import { FileItem, FileFilters, ViewMode } from '@/types';
import { MOCK_FILES, DELETED_FILES } from '@/constants/mockData';
import { filterFiles } from '@/utils/fileUtils';

export function useFiles() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<FileFilters>({
    search: '',
    mimeType: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  useEffect(() => {
    // Simulate API call
    const loadFiles = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setFiles(MOCK_FILES.filter(file => !file.isDeleted));
      setLoading(false);
    };

    loadFiles();
  }, []);

  const filteredFiles = filterFiles(files, filters);

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, isDeleted: true, deletedAt: new Date() }
        : file
    ));
  };

  const restoreFile = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, isDeleted: false, deletedAt: undefined }
        : file
    ));
  };

  const permanentlyDeleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return {
    files: filteredFiles,
    loading,
    viewMode,
    setViewMode,
    filters,
    setFilters,
    deleteFile,
    restoreFile,
    permanentlyDeleteFile,
  };
}

export function useTrash() {
  const [trashedFiles, setTrashedFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrashedFiles = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setTrashedFiles(DELETED_FILES);
      setLoading(false);
    };

    loadTrashedFiles();
  }, []);

  const restoreFile = (fileId: string) => {
    setTrashedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const permanentlyDeleteFile = (fileId: string) => {
    setTrashedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return {
    trashedFiles,
    loading,
    restoreFile,
    permanentlyDeleteFile,
  };
}