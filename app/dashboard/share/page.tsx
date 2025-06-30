'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Share2, 
  Copy, 
  Eye, 
  Download, 
  Calendar,
  Users,
  Link,
  Mail,
  QrCode,
  Settings
} from 'lucide-react';
import { generateShareToken } from '@/utils/fileUtils';
import { MOCK_FILES } from '@/constants/mockData';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';

export default function SharePage() {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [shareSettings, setShareSettings] = useState({
    password: '',
    expiryDays: 7,
    allowDownload: true,
    allowPreview: true,
    requireSignIn: false,
    notifyShares: true,
  });
  const [shareToken, setShareToken] = useState<string>('');
  const [shareUrl, setShareUrl] = useState<string>('');

  const availableFiles = MOCK_FILES.filter(file => !file.isDeleted);
  const sharedFiles = MOCK_FILES.filter(file => file.isPublic);

  const handleGenerateLink = () => {
    if (!selectedFile) {
      toast.error('Please select a file to share');
      return;
    }

    const token = generateShareToken();
    const url = `${window.location.origin}/share/${token}`;
    
    setShareToken(token);
    setShareUrl(url);
    
    toast.success('Share link generated successfully!');
  };

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSendEmail = () => {
    toast.success('Email sent successfully!');
  };

  const selectedFileData = availableFiles.find(f => f.id === selectedFile);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Share Files</h1>
        <p className="text-muted-foreground">
          Generate secure links to share your files with others
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Share Generator */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Create Share Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Selection */}
              <div className="space-y-2">
                <Label>Select File to Share</Label>
                <Select value={selectedFile} onValueChange={setSelectedFile}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a file..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFiles.map((file) => (
                      <SelectItem key={file.id} value={file.id}>
                        <div className="flex items-center space-x-2">
                          <span>{file.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {file.type.split('/')[1]?.toUpperCase()}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Share Settings */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Password Protection</Label>
                  <Input
                    type="password"
                    placeholder="Optional password"
                    value={shareSettings.password}
                    onChange={(e) => setShareSettings(prev => ({ 
                      ...prev, 
                      password: e.target.value 
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expires After</Label>
                  <Select 
                    value={shareSettings.expiryDays.toString()} 
                    onValueChange={(value) => setShareSettings(prev => ({ 
                      ...prev, 
                      expiryDays: parseInt(value) 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="0">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Permissions</Label>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Download</Label>
                      <p className="text-sm text-muted-foreground">
                        Users can download the file
                      </p>
                    </div>
                    <Switch
                      checked={shareSettings.allowDownload}
                      onCheckedChange={(checked) => setShareSettings(prev => ({ 
                        ...prev, 
                        allowDownload: checked 
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Preview</Label>
                      <p className="text-sm text-muted-foreground">
                        Users can preview the file online
                      </p>
                    </div>
                    <Switch
                      checked={shareSettings.allowPreview}
                      onCheckedChange={(checked) => setShareSettings(prev => ({ 
                        ...prev, 
                        allowPreview: checked 
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Sign In</Label>
                      <p className="text-sm text-muted-foreground">
                        Users must sign in to access
                      </p>
                    </div>
                    <Switch
                      checked={shareSettings.requireSignIn}
                      onCheckedChange={(checked) => setShareSettings(prev => ({ 
                        ...prev, 
                        requireSignIn: checked 
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notify on Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone accesses the file
                      </p>
                    </div>
                    <Switch
                      checked={shareSettings.notifyShares}
                      onCheckedChange={(checked) => setShareSettings(prev => ({ 
                        ...prev, 
                        notifyShares: checked 
                      }))}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleGenerateLink} className="w-full">
                <Link className="mr-2 h-4 w-4" />
                Generate Share Link
              </Button>
            </CardContent>
          </Card>

          {/* Generated Link */}
          {shareUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Share Link Generated
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFileData && (
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">{selectedFileData.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Expires: {shareSettings.expiryDays > 0 
                        ? format(addDays(new Date(), shareSettings.expiryDays), 'PPP')
                        : 'Never'
                      }
                    </p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleSendEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send via Email
                  </Button>
                  <Button variant="outline">
                    <QrCode className="mr-2 h-4 w-4" />
                    QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Shared Files List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Shared Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sharedFiles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Share2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No shared files yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sharedFiles.map((file) => (
                  <div key={file.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm truncate">{file.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        Public
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-3 w-3" />
                        <span>12 views</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>7 days left</span>
                      </div>
                    </div>

                    <div className="flex space-x-1 mt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Copy className="mr-1 h-3 w-3" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}