'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import { formatBytes } from '@/utils/formatBytes';
import { STORAGE_CONFIG } from '@/constants/config';
import { isValidFileType, isValidFileSize } from '@/utils/fileUtils';

interface FileWithPreview extends File {
  id: string;
  preview?: string;
  error?: string;
}

interface DropZoneProps {
  onFilesSelected: (files: FileWithPreview[]) => void;
  maxFiles?: number;
}

export function DropZone({ onFilesSelected, maxFiles = STORAGE_CONFIG.maxFilesPerUpload }: DropZoneProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!isValidFileType(file, STORAGE_CONFIG.allowedTypes)) {
      return 'File type not supported';
    }
    if (!isValidFileSize(file, STORAGE_CONFIG.maxFileSize)) {
      return `File too large. Maximum size is ${formatBytes(STORAGE_CONFIG.maxFileSize)}`;
    }
    return null;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview: FileWithPreview[] = acceptedFiles.map((file) => {
      const fileWithPreview = Object.assign(file, {
        id: Math.random().toString(36).substr(2, 9),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        error: validateFile(file),
      });
      return fileWithPreview;
    });

    setSelectedFiles(prev => [...prev, ...filesWithPreview].slice(0, maxFiles));
    onFilesSelected(filesWithPreview);
  }, [maxFiles, onFilesSelected]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles,
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const removeFile = (fileId: string) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter(file => file.id !== fileId);
      // Revoke object URL for images
      const removedFile = prev.find(file => file.id === fileId);
      if (removedFile?.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return newFiles;
    });
  };

  const clearAll = () => {
    selectedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setSelectedFiles([]);
  };

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary hover:bg-primary/5'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        
        <h3 className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </h3>
        
        <p className="text-muted-foreground mb-4">
          or click to browse files
        </p>
        
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Maximum file size: {formatBytes(STORAGE_CONFIG.maxFileSize)}</p>
          <p>Maximum {maxFiles} files at once</p>
        </div>
      </div>

      {/* Selected files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Selected Files ({selectedFiles.length})</h4>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>

          <div className="grid gap-3">
            {selectedFiles.map((file) => (
              <Card key={file.id} className={file.error ? 'border-destructive' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* File preview/icon */}
                    <div className="flex-shrink-0">
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                          <File className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* File info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(file.size)} • {file.type}
                      </p>
                      
                      {file.error && (
                        <div className="flex items-center space-x-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-destructive" />
                          <p className="text-xs text-destructive">{file.error}</p>
                        </div>
                      )}
                    </div>

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}