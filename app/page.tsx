'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HardDrive, 
  Shield, 
  Share, 
  Zap, 
  ArrowRight, 
  Upload,
  Users,
  Lock,
  Cloud,
  CheckCircle,
  Star,
  Play,
  ChevronDown
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    setIsVisible(true);
    
    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <HardDrive className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PermiDrive
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
              <LoginButton />
            </nav>
            <div className="md:hidden">
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <section className="py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 10,000+ users worldwide
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                  Your Files,{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Everywhere
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  Secure cloud storage with advanced permissions, seamless sharing, 
                  and collaboration tools. Access your files anywhere, anytime with 
                  enterprise-grade security.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <LoginButton />
                <Button variant="outline" size="lg" className="group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>15GB Free Storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </div>

            <div className={`relative ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse-glow"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-white/20">
                  <div className="space-y-6">
                    {/* Mock file browser */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">My Files</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Project Proposal.pdf', size: '2.5 MB', type: 'pdf' },
                        { name: 'Team Photo.jpg', size: '5.2 MB', type: 'image' },
                        { name: 'Budget Sheet.xlsx', size: '1.8 MB', type: 'excel' },
                        { name: 'Presentation.pptx', size: '12.3 MB', type: 'ppt' },
                      ].map((file, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {file.type === 'pdf' ? '📄' : file.type === 'image' ? '🖼️' : file.type === 'excel' ? '📊' : '📋'}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-slate-500">{file.size}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything you need for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                secure storage
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Built with enterprise-grade security and designed for teams of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Bank-Level Security',
                description: 'End-to-end encryption with advanced access controls and compliance certifications.',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: Share,
                title: 'Smart Sharing',
                description: 'Share files instantly with customizable permissions, expiry dates, and password protection.',
                color: 'from-blue-500 to-cyan-600'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Upload and sync files at blazing speeds with our globally distributed infrastructure.',
                color: 'from-yellow-500 to-orange-600'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Work together seamlessly with real-time collaboration and version control.',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: Cloud,
                title: 'Automatic Backup',
                description: 'Never lose your files with automatic backup and 99.9% uptime guarantee.',
                color: 'from-indigo-500 to-blue-600'
              },
              {
                icon: Lock,
                title: 'Advanced Permissions',
                description: 'Granular access controls with role-based permissions and audit trails.',
                color: 'from-red-500 to-rose-600'
              }
            ].map((feature, index) => (
              <Card key={index} className="scroll-animate border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              How{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PermiDrive
              </span>{' '}
              works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Sign Up & Connect',
                description: 'Create your account with Google OAuth and get 15GB of free storage instantly.',
                icon: Users,
                color: 'from-blue-500 to-cyan-600'
              },
              {
                step: '02',
                title: 'Upload & Organize',
                description: 'Drag and drop your files, create folders, and organize everything with smart categorization.',
                icon: Upload,
                color: 'from-purple-500 to-pink-600'
              },
              {
                step: '03',
                title: 'Share & Collaborate',
                description: 'Share files securely with team members, set permissions, and collaborate in real-time.',
                icon: Share,
                color: 'from-green-500 to-emerald-600'
              }
            ].map((step, index) => (
              <div key={index} className="scroll-animate text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-sm font-bold text-slate-400 mb-2">{step.step}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center scroll-animate">
            {[
              { value: '99.9%', label: 'Uptime Guarantee' },
              { value: '15GB', label: 'Free Storage' },
              { value: '256-bit', label: 'Encryption' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="text-center scroll-animate">
            <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden">
              <CardContent className="p-12 lg:p-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Ready to get started?
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  Join thousands of users who trust PermiDrive with their files
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-blue-600 hover:text-blue-700">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <HardDrive className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PermiDrive
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Secure cloud storage for modern teams
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 text-center text-slate-600 dark:text-slate-300">
            <p>&copy; 2024 PermiDrive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}