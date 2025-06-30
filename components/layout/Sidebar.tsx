'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Upload, 
  Trash2, 
  User, 
  Settings,
  Share2,
  HardDrive
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'All Files', href: '/dashboard/files', icon: FolderOpen },
  { name: 'Upload', href: '/dashboard/upload', icon: Upload },
  { name: 'Share', href: '/dashboard/share', icon: Share2 },
  { name: 'Trash', href: '/dashboard/trash', icon: Trash2 },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col h-full border-r bg-card/50 backdrop-blur-sm', className)}>
      {/* Header */}
      <div className="flex items-center p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <HardDrive className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PermiDrive
          </span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start h-12 px-4 transition-all duration-200',
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-muted/50 hover:translate-x-1'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Storage indicator */}
      <div className="p-4 border-t">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Storage</span>
            <span className="font-medium">2.5 GB / 15 GB</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '17%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}