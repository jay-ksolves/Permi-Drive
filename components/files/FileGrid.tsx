'use client';

import { FileItem, ViewMode } from '@/types';
import { FileCard } from './FileCard';
import { Skeleton } from '@/components/ui/skeleton';

interface FileGridProps {
  files: FileItem[];
  loading?: boolean;
  viewMode: ViewMode;
  onDelete?: (fileId: string) => void;
  onShare?: (fileId: string) => void;
  onDownload?: (fileId: string) => void;
}

export function FileGrid({ 
  files, 
  loading, 
  viewMode, 
  onDelete, 
  onShare, 
  onDownload 
}: FileGridProps) {
  if (loading) {
    return (
      <div className={`grid gap-4 ${
        viewMode === 'list' ? 'grid-cols-1' : 
        viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
        'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
      }`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className={viewMode === 'list' ? 'h-16' : 'h-48'} />
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">📁</div>
        <h3 className="text-lg font-medium mb-2">No files found</h3>
        <p className="text-muted-foreground">
          Upload some files to get started or adjust your search filters.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="border rounded-lg overflow-hidden">
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            viewMode={viewMode}
            onDelete={onDelete}
            onShare={onShare}
            onDownload={onDownload}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
    }`}>
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          viewMode={viewMode}
          onDelete={onDelete}
          onShare={onShare}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}