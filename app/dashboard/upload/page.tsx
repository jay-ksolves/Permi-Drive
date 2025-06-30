'use client';

import { useState } from 'react';
import { DropZone } from '@/components/upload/DropZone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileWithPreview extends File {
  id: string;
  preview?: string;
  error?: string;
}

interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFilesSelected = (files: FileWithPreview[]) => {
    setSelectedFiles(files);
  };

  const simulateUpload = async (file: FileWithPreview): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (file.error) {
        reject(new Error(file.error));
        return;
      }

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setUploadProgress(prev => prev.map(item => 
            item.fileId === file.id 
              ? { ...item, progress: 100, status: 'completed' }
              : item
          ));
          
          resolve();
        } else {
          setUploadProgress(prev => prev.map(item => 
            item.fileId === file.id 
              ? { ...item, progress }
              : item
          ));
        }
      }, 200);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    
    // Initialize progress tracking
    const initialProgress = selectedFiles.map(file => ({
      fileId: file.id,
      fileName: file.name,
      progress: 0,
      status: 'uploading' as const,
      error: file.error,
    }));
    
    setUploadProgress(initialProgress);

    // Upload files concurrently
    const uploadPromises = selectedFiles.map(async (file) => {
      try {
        await simulateUpload(file);
        return { success: true, fileName: file.name };
      } catch (error) {
        setUploadProgress(prev => prev.map(item => 
          item.fileId === file.id 
            ? { 
                ...item, 
                status: 'error', 
                error: error instanceof Error ? error.message : 'Upload failed' 
              }
            : item
        ));
        return { success: false, fileName: file.name, error };
      }
    });

    const results = await Promise.allSettled(uploadPromises);
    
    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;
    
    const failed = results.length - successful;

    setIsUploading(false);
    
    if (successful > 0) {
      toast.success(`Successfully uploaded ${successful} file${successful > 1 ? 's' : ''}`);
    }
    
    if (failed > 0) {
      toast.error(`Failed to upload ${failed} file${failed > 1 ? 's' : ''}`);
    }
  };

  const clearUploads = () => {
    setSelectedFiles([]);
    setUploadProgress([]);
  };

  const removeFromProgress = (fileId: string) => {
    setUploadProgress(prev => prev.filter(item => item.fileId !== fileId));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Files</h1>
        <p className="text-muted-foreground">
          Upload your files to PermiDrive cloud storage
        </p>
      </div>

      {/* Upload section */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DropZone onFilesSelected={handleFilesSelected} />
          
          {selectedFiles.length > 0 && (
            <div className="mt-6 flex gap-4">
              <Button 
                onClick={handleUpload} 
                disabled={isUploading || selectedFiles.every(f => f.error)}
                className="flex-1"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Files`}
              </Button>
              <Button variant="outline" onClick={() => setSelectedFiles([])}>
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Upload limits info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">File Size Limit</h4>
              <p className="text-sm text-muted-foreground">
                Maximum 100 MB per file
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Supported Formats</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">Images</Badge>
                <Badge variant="secondary" className="text-xs">Documents</Badge>
                <Badge variant="secondary" className="text-xs">Videos</Badge>
                <Badge variant="secondary" className="text-xs">Audio</Badge>
                <Badge variant="secondary" className="text-xs">Archives</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Batch Upload</h4>
              <p className="text-sm text-muted-foreground">
                Upload up to 10 files at once
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upload Progress</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearUploads}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadProgress.map((item) => (
                <div key={item.fileId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {item.status === 'error' && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      {item.status === 'uploading' && (
                        <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      )}
                      <span className="text-sm font-medium">{item.fileName}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {item.progress.toFixed(0)}%
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromProgress(item.fileId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Progress value={item.progress} className="h-2" />
                  
                  {item.error && (
                    <p className="text-sm text-red-500">{item.error}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}