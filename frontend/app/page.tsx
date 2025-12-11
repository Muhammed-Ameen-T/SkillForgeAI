/**
 * @fileoverview Landing page for SkillForge AI.
 * Hero section with call-to-action for unauthenticated users.
 */

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Target, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/features/Header';

/**
 * Landing/Index page component.
 * Displays hero section, features, and call-to-action.
 * * @returns Complete landing page
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Learning Paths</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Master Any Skill with{' '}
              <span className="text-gradient">Personalized Roadmaps</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              SkillForge uses AI to create custom learning paths tailored to your goals,
              schedule, and preferred learning style. From beginner to expert, we guide your journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button className="btn-gradient h-14 px-8 text-lg font-semibold">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-14 border-border bg-transparent px-8 text-lg font-semibold text-foreground hover:bg-muted/30"
              >
                See How It Works
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span><strong className="text-foreground">10,000+</strong> Learners</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-secondary" />
                <span><strong className="text-foreground">50,000+</strong> Roadmaps Created</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                <span><strong className="text-foreground">500+</strong> Skills Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border/50 bg-card/30 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Why Choose <span className="text-gradient">SkillForge</span>?
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Our AI-powered platform adapts to you, not the other way around.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="glass-card group rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:border-primary/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/50 transition-transform group-hover:scale-110">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  AI-Powered Generation
                </h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your goals and creates a custom roadmap in seconds,
                  not hours of research.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card group rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:border-secondary/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/50 transition-transform group-hover:scale-110">
                  <Target className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Personalized Paths
                </h3>
                <p className="text-muted-foreground">
                  Each roadmap adapts to your current skill level, available time,
                  and preferred learning style.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card group rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:border-accent/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-500/50 transition-transform group-hover:scale-110">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Curated Resources
                </h3>
                <p className="text-muted-foreground">
                  Get handpicked articles, videos, and courses vetted by experts
                  for maximum learning efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="glass-card mx-auto max-w-3xl rounded-2xl p-10 md:p-16">
              <Sparkles className="mx-auto mb-6 h-12 w-12 text-primary" />
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join thousands of learners who've transformed their careers with SkillForge.
              </p>
              <Link href="/login">
                <Button className="btn-gradient h-14 px-10 text-lg font-semibold">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
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