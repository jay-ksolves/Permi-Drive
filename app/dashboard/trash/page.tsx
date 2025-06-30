'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTrash } from '@/hooks/useFiles';
import { formatBytes } from '@/utils/formatBytes';
import { calculateTrashDaysRemaining } from '@/utils/fileUtils';
import { getMimeTypeIcon } from '@/constants/mimeTypes';
import { STORAGE_CONFIG } from '@/constants/config';
import { 
  RefreshCw, 
  Trash2, 
  AlertTriangle,
  RotateCcw,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Image from 'next/image';

export default function TrashPage() {
  const { trashedFiles, loading, restoreFile, permanentlyDeleteFile } = useTrash();

  const handleRestore = (fileId: string, fileName: string) => {
    restoreFile(fileId);
    toast.success(`"${fileName}" has been restored`);
  };

  const handlePermanentDelete = (fileId: string, fileName: string) => {
    permanentlyDeleteFile(fileId);
    toast.success(`"${fileName}" has been permanently deleted`);
  };

  const handleEmptyTrash = () => {
    // TODO: Implement empty trash functionality
    toast.success('Trash has been emptied');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trash</h1>
          <p className="text-muted-foreground">
            Files in trash are automatically deleted after {STORAGE_CONFIG.trashRetentionDays} days
          </p>
        </div>
        
        {trashedFiles.length > 0 && (
          <Button variant="destructive" onClick={handleEmptyTrash}>
            <Trash2 className="mr-2 h-4 w-4" />
            Empty Trash
          </Button>
        )}
      </div>

      {/* Trash warning */}
      {trashedFiles.length > 0 && (
        <div className="flex items-center space-x-2 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Files in trash will be permanently deleted after 30 days
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">
              Restore files before they're permanently deleted
            </p>
          </div>
        </div>
      )}

      {/* Trash content */}
      {trashedFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">🗑️</div>
          <h3 className="text-lg font-medium mb-2">Trash is empty</h3>
          <p className="text-muted-foreground">
            Files you delete will appear here before being permanently removed.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {trashedFiles.map((file) => {
            const daysRemaining = file.deletedAt 
              ? calculateTrashDaysRemaining(file.deletedAt, STORAGE_CONFIG.trashRetentionDays)
              : 0;
            
            return (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* File preview/icon */}
                    <div className="flex-shrink-0">
                      {file.thumbnailUrl ? (
                        <Image
                          src={file.thumbnailUrl}
                          alt={file.name}
                          width={48}
                          height={48}
                          className="rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-2xl">
                          {getMimeTypeIcon(file.mimeType)}
                        </div>
                      )}
                    </div>

                    {/* File info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{file.name}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>{formatBytes(file.size)}</span>
                        <span>•</span>
                        <span>
                          Deleted {file.deletedAt && format(new Date(file.deletedAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>

                    {/* Days remaining */}
                    <div className="text-center">
                      <Badge 
                        variant={daysRemaining <= 7 ? 'destructive' : 'secondary'}
                        className="mb-2"
                      >
                        {daysRemaining > 0 ? `${daysRemaining} days left` : 'Expires today'}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestore(file.id, file.name)}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Restore
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handlePermanentDelete(file.id, file.name)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Delete Forever
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}