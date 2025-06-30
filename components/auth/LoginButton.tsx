'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Chrome } from 'lucide-react';

export function LoginButton() {
  const { signIn, loading } = useAuth();

  return (
    <Button 
      onClick={signIn} 
      disabled={loading}
      size="lg"
      className="w-full max-w-sm"
    >
      <Chrome className="mr-2 h-4 w-4" />
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </Button>
  );
}