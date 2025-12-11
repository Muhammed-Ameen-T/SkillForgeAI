'use client';

/**
 * @fileoverview Dashboard page for SkillForge AI.
 * Main authenticated user interface with roadmap management.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, BookOpen, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Header } from '@/components/features/Header';
import { RoadmapCard } from '@/components/features/RoadmapCard';
import { AiGenerator } from '@/components/features/AiGenerator';
import { RoadmapSkeleton } from '@/components/ui/skeleton-loader';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRoadmaps } from '@/store/slices/roadmapSlice';
import { checkSession } from '@/store/slices/authSlice';

/**
 * Dashboard page component displaying user's roadmaps and AI generator.
 * Fetches and displays saved roadmaps with statistics.
 * * @returns Complete dashboard interface
 */
export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { savedRoadmaps, isLoading: roadmapsLoading } = useAppSelector(
    (state) => state.roadmap
  );
  const { isAuthenticated, isLoading: authLoading, user } = useAppSelector(
    (state) => state.auth
  );

  /** Check session and fetch roadmaps on mount */
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  /** Fetch roadmaps when authenticated */
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchRoadmaps());
    }
  }, [isAuthenticated, dispatch]);

  /** Redirect to login if not authenticated (after loading) */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  /** Calculate statistics */
  const totalRoadmaps = savedRoadmaps.length;
  const totalSteps = savedRoadmaps.reduce((acc, r) => acc + r.steps.length, 0);
  const completedSteps = savedRoadmaps.reduce(
    (acc, r) => acc + r.steps.filter((s) => s.isCompleted).length,
    0
  );
  const averageProgress =
    totalRoadmaps > 0
      ? Math.round(
          savedRoadmaps.reduce((acc, r) => acc + r.progress, 0) / totalRoadmaps
        )
      : 0;

  /** Show loading state while checking auth */
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
              Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Learner'}</span>
            </h1>
            <p className="text-muted-foreground">
              Track your progress and discover new skills to master.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="glass-card rounded-xl p-5 transition-transform hover:scale-105">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalRoadmaps}</p>
              <p className="text-sm text-muted-foreground">Active Roadmaps</p>
            </div>

            <div className="glass-card rounded-xl p-5 transition-transform hover:scale-105">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{averageProgress}%</p>
              <p className="text-sm text-muted-foreground">Avg. Progress</p>
            </div>

            <div className="glass-card rounded-xl p-5 transition-transform hover:scale-105">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                <Sparkles className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{completedSteps}</p>
              <p className="text-sm text-muted-foreground">Steps Completed</p>
            </div>

            <div className="glass-card rounded-xl p-5 transition-transform hover:scale-105">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalSteps - completedSteps}</p>
              <p className="text-sm text-muted-foreground">Steps Remaining</p>
            </div>
          </div>
        </section>

        {/* AI Generator Section */}
        <section className="mb-16">
          <AiGenerator />
        </section>

        {/* Roadmaps Section */}
        <section>
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-2xl font-bold text-foreground">Your Roadmaps</h2>
              <p className="text-muted-foreground">
                Continue your learning journey where you left off.
              </p>
            </div>
          </div>

          {/* Loading State */}
          {roadmapsLoading && <RoadmapSkeleton count={3} />}

          {/* Empty State */}
          {!roadmapsLoading && savedRoadmaps.length === 0 && (
            <div className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No roadmaps yet
              </h3>
              <p className="mb-6 max-w-sm text-muted-foreground">
                Generate your first AI-powered learning roadmap using the generator above.
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-gradient"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create First Roadmap
              </Button>
            </div>
          )}

          {/* Roadmaps Grid */}
          {!roadmapsLoading && savedRoadmaps.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedRoadmaps.map((roadmap, index) => (
                <div
                  key={roadmap.id}
                  className="opacity-0 animate-in slide-in-from-bottom-5 fade-in duration-500"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <RoadmapCard
                    roadmap={roadmap}
                    onClick={() => console.log('View roadmap:', roadmap.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 SkillForge AI. Built for learners, by learners.</p>
        </div>
      </footer>
    </div>
  );
}