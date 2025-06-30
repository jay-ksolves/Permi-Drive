'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { shareService } from '@/services/shareService';
import { formatBytes } from '@/utils/formatBytes';
import { getMimeTypeIcon } from '@/constants/mimeTypes';
import { 
  Download, 
  Eye, 
  Lock, 
  FileText,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

export default function SharedFilePage() {
  const params = useParams();
  const token = params.token as string;
  
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [needsPassword, setNeedsPassword] = useState(false);
  const [permissions, setPermissions] = useState({
    canDownload: false,
    canPreview: false,
  });

  useEffect(() => {
    if (token) {
      fetchSharedFile();
    }
  }, [token]);

  const fetchSharedFile = async (pwd?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await shareService.getSharedFile(token, pwd);
      setFile(result.file);
      setPermissions({
        canDownload: result.canDownload,
        canPreview: result.canPreview,
      });
      setNeedsPassword(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load file';
      
      if (errorMessage.includes('password')) {
        setNeedsPassword(true);
        setError('This file is password protected');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      fetchSharedFile(password);
    }
  };

  const handleDownload = async () => {
    try {
      // In a real app, this would download the file
      toast.success('Download started');
    } catch (err) {
      toast.error('Failed to download file');
    }
  };

  const handlePreview = () => {
    // In a real app, this would open a preview modal
    toast.info('Preview functionality coming soon');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
              <p className="text-muted-foreground">Loading shared file...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (needsPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle>Password Required</CardTitle>
            <p className="text-muted-foreground">
              This file is password protected. Please enter the password to access it.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              
              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              
              <Button type="submit" className="w-full">
                Access File
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !needsPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!file) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Shared File</h1>
          <p className="text-muted-foreground">
            Someone has shared a file with you
          </p>
        </div>

        {/* File Card */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* File Preview */}
              <div className="flex-1">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center mb-6">
                  {file.thumbnailUrl ? (
                    <Image
                      src={file.thumbnailUrl}
                      alt={file.name}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-6xl">
                      {getMimeTypeIcon(file.mimeType)}
                    </div>
                  )}
                </div>
                
                {permissions.canPreview && (
                  <Button 
                    onClick={handlePreview}
                    className="w-full mb-4"
                    variant="outline"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview File
                  </Button>
                )}
              </div>

              {/* File Info */}
              <div className="lg:w-80 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{file.name}</h2>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="secondary">
                      {file.mimeType.split('/')[1]?.toUpperCase()}
                    </Badge>
                    <span className="text-muted-foreground">
                      {formatBytes(file.size)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">File Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{file.mimeType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span>{formatBytes(file.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shared:</span>
                        <span>{new Date(file.sharedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Permissions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${permissions.canPreview ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">Preview: {permissions.canPreview ? 'Allowed' : 'Restricted'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${permissions.canDownload ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">Download: {permissions.canDownload ? 'Allowed' : 'Restricted'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {permissions.canDownload && (
                  <Button 
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download File
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-sm">
            Powered by{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PermiDrive
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}