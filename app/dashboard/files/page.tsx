'use client';

import { FileGrid } from '@/components/files/FileGrid';
import { FileFilters } from '@/components/files/FileFilters';
import { useFiles } from '@/hooks/useFiles';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Link from 'next/link';

export default function FilesPage() {
  const {
    files,
    loading,
    viewMode,
    setViewMode,
    filters,
    setFilters,
    deleteFile,
  } = useFiles();

  const handleShare = (fileId: string) => {
    console.log('Share file:', fileId);
    // TODO: Implement share functionality
  };

  const handleDownload = (fileId: string) => {
    console.log('Download file:', fileId);
    // TODO: Implement download functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Files</h1>
          <p className="text-muted-foreground">
            Manage and organize your files
          </p>
        </div>
        <Link href="/dashboard/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <FileFilters
        filters={filters}
        onFiltersChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Results summary */}
      {!loading && (
        <div className="text-sm text-muted-foreground">
          {files.length} {files.length === 1 ? 'file' : 'files'} found
          {filters.search && ` for "${filters.search}"`}
        </div>
      )}

      {/* File Grid */}
      <FileGrid
        files={files}
        loading={loading}
        viewMode={viewMode}
        onDelete={deleteFile}
        onShare={handleShare}
        onDownload={handleDownload}
      />
    </div>
  );
}