'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileCard } from '@/components/files/FileCard';
import { useAuth } from '@/contexts/AuthContext';
import { formatBytes, calculateStoragePercentage } from '@/utils/formatBytes';
import { RECENT_FILES } from '@/constants/mockData';
import { 
  HardDrive, 
  Upload, 
  Download, 
  Share, 
  Trash2,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const storagePercentage = calculateStoragePercentage(user.storageUsed, user.storageLimit);
  const totalFiles = 24; // Mock data
  const sharedFiles = 6; // Mock data
  const deletedFiles = 3; // Mock data

  const stats = [
    {
      title: 'Total Files',
      value: totalFiles.toLocaleString(),
      icon: HardDrive,
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Storage Used',
      value: formatBytes(user.storageUsed),
      subtitle: `of ${formatBytes(user.storageLimit)}`,
      icon: Upload,
      trend: `${storagePercentage}%`,
      trendUp: storagePercentage > 50,
    },
    {
      title: 'Shared Files',
      value: sharedFiles.toLocaleString(),
      icon: Share,
      trend: '+3',
      trendUp: true,
    },
    {
      title: 'In Trash',
      value: deletedFiles.toLocaleString(),
      icon: Trash2,
      trend: '-2',
      trendUp: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.displayName || user.name}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your files today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              )}
              <p className={`text-xs flex items-center gap-1 mt-1 ${
                stat.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="h-3 w-3" />
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Storage Usage */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used</span>
                <span>{formatBytes(user.storageUsed)}</span>
              </div>
              <Progress value={storagePercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 GB</span>
                <span>{formatBytes(user.storageLimit)}</span>
              </div>
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Images</span>
                </div>
                <span>1.2 GB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Documents</span>
                </div>
                <span>800 MB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Videos</span>
                </div>
                <span>500 MB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Files */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RECENT_FILES.slice(0, 5).map((file) => (
                <div key={file.id} className="border rounded-lg">
                  <FileCard
                    file={file}
                    viewMode="list"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">You uploaded <strong>Team Photo.jpg</strong></p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">You shared <strong>Project Proposal.pdf</strong></p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">You moved <strong>Budget Spreadsheet.xlsx</strong> to trash</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">You created folder <strong>Q1 Reports</strong></p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}