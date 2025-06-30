import { User } from '@/types';
import { API_CONFIG } from '@/constants/config';

class AuthService {
  private baseUrl = API_CONFIG.baseUrl;

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/me`, {
        credentials: 'include',
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  async signIn(provider: 'google'): Promise<{ url: string }> {
    const response = await fetch(`${this.baseUrl}/auth/signin/${provider}`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to initiate sign in');
    }

    return response.json();
  }

  async signOut(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to sign out');
    }
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const data = await response.json();
    return data.user;
  }

  async deleteAccount(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/account`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete account');
    }
  }

  async exportData(): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/auth/export`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to export data');
    }

    return response.blob();
  }
}

export const authService = new AuthService();