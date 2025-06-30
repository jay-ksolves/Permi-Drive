import { API_CONFIG } from '@/constants/config';

export interface ShareOptions {
  password?: string;
  expiryDays?: number;
  allowDownload?: boolean;
  allowPreview?: boolean;
  requireSignIn?: boolean;
  notifyShares?: boolean;
}

export interface ShareLink {
  id: string;
  token: string;
  url: string;
  fileId: string;
  fileName: string;
  expiresAt?: Date;
  createdAt: Date;
  accessCount: number;
  options: ShareOptions;
}

class ShareService {
  private baseUrl = API_CONFIG.baseUrl;

  async createShareLink(fileId: string, options: ShareOptions): Promise<ShareLink> {
    const response = await fetch(`${this.baseUrl}/share/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ fileId, ...options }),
    });

    if (!response.ok) {
      throw new Error('Failed to create share link');
    }

    return response.json();
  }

  async getShareLinks(): Promise<ShareLink[]> {
    const response = await fetch(`${this.baseUrl}/share/links`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch share links');
    }

    const data = await response.json();
    return data.links;
  }

  async getSharedFile(token: string, password?: string): Promise<{
    file: any;
    canDownload: boolean;
    canPreview: boolean;
  }> {
    const body: any = { token };
    if (password) {
      body.password = password;
    }

    const response = await fetch(`${this.baseUrl}/share/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to access shared file');
    }

    return response.json();
  }

  async updateShareLink(linkId: string, options: Partial<ShareOptions>): Promise<ShareLink> {
    const response = await fetch(`${this.baseUrl}/share/links/${linkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error('Failed to update share link');
    }

    return response.json();
  }

  async deleteShareLink(linkId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/share/links/${linkId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete share link');
    }
  }

  async getShareAnalytics(linkId: string): Promise<{
    totalAccess: number;
    uniqueVisitors: number;
    accessHistory: Array<{
      timestamp: Date;
      ip: string;
      userAgent: string;
    }>;
  }> {
    const response = await fetch(`${this.baseUrl}/share/links/${linkId}/analytics`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch share analytics');
    }

    return response.json();
  }
}

export const shareService = new ShareService();