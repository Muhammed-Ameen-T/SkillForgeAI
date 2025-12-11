/**
 * @fileoverview RoadmapCard component for displaying learning roadmaps.
 * Features glassmorphism styling and progress visualization.
 */
'use client';

import { BookOpen, Clock, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
// Ensure you have migrated this component too, or remove/replace it
import { ProgressCircle } from '@/components/ui/progress-circle'; 
import type { Roadmap } from '@/types';

interface RoadmapCardProps {
  roadmap: Roadmap;
  onClick?: () => void;
  className?: string;
}

/**
 * Visual card component for displaying a learning roadmap.
 * Features glassmorphism design, progress visualization, and step preview.
 */
export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  roadmap,
  onClick,
  className,
}) => {
  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-600',
    intermediate: 'bg-yellow-500/20 text-yellow-600',
    advanced: 'bg-red-500/20 text-red-600',
    expert: 'bg-purple-500/20 text-purple-600',
  };

  const completedSteps = roadmap.steps.filter(s => s.isCompleted).length;
  const totalSteps = roadmap.steps.length;

  return (
    <article
      className={cn(
        'glass-card glow group cursor-pointer rounded-xl p-6 transition-all duration-300',
        'hover:scale-[1.02] hover:border-primary/30',
        'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background',
        className
      )}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      tabIndex={0}
      role="button"
      aria-label={`View ${roadmap.title} roadmap`}
    >
      {/* Header Section */}
      <header className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 truncate text-lg font-semibold text-foreground transition-colors group-hover:text-gradient">
            {roadmap.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {roadmap.description}
          </p>
        </div>
        
        {/* Difficulty Badge */}
        <span
          className={cn(
            'flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize',
            difficultyColors[roadmap.difficulty] || 'bg-muted text-muted-foreground'
          )}
        >
          {roadmap.difficulty}
        </span>
      </header>

      {/* Progress Section */}
      <div className="mb-5 flex items-center gap-4">
        {/* Ensure ProgressCircle exists in your UI folder, or use a simple div */}
        <ProgressCircle progress={roadmap.progress} size={56} strokeWidth={6} />
        
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {completedSteps}/{totalSteps} steps
            </span>
          </div>
          
          {/* Linear progress bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${roadmap.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{roadmap.estimatedDuration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-4 w-4" />
          <span>{roadmap.skill}</span>
        </div>
      </div>

      {/* Steps Preview */}
      <div className="space-y-2">
        {roadmap.steps.slice(0, 3).map((step, index) => (
          <div
            key={step.id || index}
            className={cn(
              'flex items-center gap-3 rounded-lg p-2.5 text-sm transition-colors',
              step.isCompleted ? 'bg-green-500/10' : 'bg-muted/20'
            )}
          >
            {step.isCompleted ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
            ) : (
              <Circle className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            )}
            <span
              className={cn(
                'flex-1 truncate',
                step.isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
              )}
            >
              {step.title}
            </span>
            <span className="flex-shrink-0 text-xs text-muted-foreground">
              {step.duration}
            </span>
          </div>
        ))}
        
        {roadmap.steps.length > 3 && (
          <div className="flex items-center justify-center gap-1 pt-2 text-sm text-muted-foreground">
            <span>+{roadmap.steps.length - 3} more steps</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </article>
  );
};