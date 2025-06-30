'use client';

import { useState } from 'react';
import { FileItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  MoreVertical, 
  Download, 
  Share, 
  Trash2, 
  Eye,
  Copy,
  Edit
} from 'lucide-react';
import { formatBytes } from '@/utils/formatBytes';
import { getMimeTypeIcon } from '@/constants/mimeTypes';
import { format } from 'date-fns';
import Image from 'next/image';

interface FileCardProps {
  file: FileItem;
  viewMode: 'list' | 'grid' | 'thumbnail';
  onDelete?: (fileId: string) => void;
  onShare?: (fileId: string) => void;
  onDownload?: (fileId: string) => void;
}

export function FileCard({ file, viewMode, onDelete, onShare, onDownload }: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <div 
        className="flex items-center space-x-4 p-4 border-b hover:bg-muted/50 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-shrink-0">
          {file.thumbnailUrl ? (
            <Image
              src={file.thumbnailUrl}
              alt={file.name}
              width={40}
              height={40}
              className="rounded object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xl">
              {getMimeTypeIcon(file.mimeType)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(file.updatedAt), 'MMM d, yyyy')}
          </p>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {formatBytes(file.size)}
        </div>
        
        <div className="flex items-center space-x-2">
          {file.isPublic && (
            <Badge variant="secondary" className="text-xs">
              Shared
            </Badge>
          )}
          
          {isHovered && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDownload?.(file.id)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShare?.(file.id)}>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete?.(file.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card 
      className={`group hover:shadow-md transition-all duration-200 ${
        viewMode === 'thumbnail' ? 'aspect-square' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          {/* File preview */}
          <div className={`mb-3 ${viewMode === 'thumbnail' ? 'flex-1' : ''}`}>
            {file.thumbnailUrl ? (
              <div className={`relative ${viewMode === 'thumbnail' ? 'h-full' : 'h-32'} rounded-md overflow-hidden`}>
                <Image
                  src={file.thumbnailUrl}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className={`${viewMode === 'thumbnail' ? 'h-full' : 'h-32'} rounded-md bg-muted flex items-center justify-center`}>
                <span className="text-4xl">{getMimeTypeIcon(file.mimeType)}</span>
              </div>
            )}
          </div>
          
          {/* File info */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-sm leading-tight line-clamp-2">
                {file.name}
              </h3>
              
              {isHovered && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload?.(file.id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onShare?.(file.id)}>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(file.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatBytes(file.size)}</span>
              {file.isPublic && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  Shared
                </Badge>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground">
              {format(new Date(file.updatedAt), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}