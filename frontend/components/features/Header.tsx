/**
 * @fileoverview Header/Navigation component for SkillForge AI.
 * Provides main navigation and user controls.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link'; // ✅ Next.js Link
import { useRouter } from 'next/navigation'; // ✅ Next.js Router
import { LogOut, User, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/store/slices/authSlice';

/**
 * Main header navigation component.
 * Displays logo, navigation links, and user controls.
 * Responsive design with mobile menu support.
 * * @returns Header navigation element
 */
export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter(); // ✅ Init router
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Handles user logout action.
   */
  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/login'); // ✅ Use router.push
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-primary"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
             <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">
            Skill<span className="text-gradient">Forge</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              
              {/* User Menu */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user?.name || 'User'}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button className="btn-gradient">Get Started</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="container mx-auto space-y-4 p-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{user?.name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="block rounded-lg p-3 font-medium text-foreground transition-colors hover:bg-muted/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="btn-gradient w-full">Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};