/**
 * @fileoverview Skeleton loading component for content placeholders.
 * Displays animated placeholder content while data is loading.
 */

import { cn } from '@/lib/utils';

/**
 * Props for the SkeletonLoader component.
 */
interface SkeletonLoaderProps {
  /** Additional CSS classes */
  className?: string;
  /** Variant of skeleton to display */
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  /** Width of the skeleton (CSS value) */
  width?: string;
  /** Height of the skeleton (CSS value) */
  height?: string;
  /** Number of skeleton lines to render (for text variant) */
  lines?: number;
}

/**
 * Skeleton loader component for loading states.
 * Displays animated placeholders that match the shape of content being loaded.
 * 
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @param props.variant - Shape variant ('text', 'circular', 'rectangular', 'card')
 * @param props.width - Custom width
 * @param props.height - Custom height
 * @param props.lines - Number of text lines for 'text' variant
 * @returns Animated skeleton placeholder element
 * 
 * @example
 * // Single line text skeleton
 * <SkeletonLoader variant="text" />
 * 
 * @example
 * // Card skeleton with custom dimensions
 * <SkeletonLoader variant="card" className="w-full h-48" />
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 3,
}) => {
  const baseClasses = 'skeleton-pulse rounded';
  
  const variantClasses = {
    text: 'h-4',
    circular: 'rounded-full',
    rectangular: '',
    card: 'rounded-lg',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              index === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={{ width: index === lines - 1 ? '75%' : width, height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
    />
  );
};

/**
 * Props for the RoadmapSkeleton component.
 */
interface RoadmapSkeletonProps {
  /** Number of skeleton cards to display */
  count?: number;
}

/**
 * Specialized skeleton loader for roadmap cards.
 * Displays a grid of skeleton cards matching the roadmap card layout.
 * 
 * @param props - Component props
 * @param props.count - Number of skeleton cards to render
 * @returns Grid of skeleton roadmap cards
 * 
 * @example
 * <RoadmapSkeleton count={3} />
 */
export const RoadmapSkeleton: React.FC<RoadmapSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="glass-card rounded-xl p-6 opacity-0 fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <SkeletonLoader className="mb-2 h-6 w-3/4" />
              <SkeletonLoader className="h-4 w-1/2" />
            </div>
            <SkeletonLoader className="h-6 w-20 rounded-full" />
          </div>
          
          {/* Progress bar */}
          <div className="mb-4">
            <SkeletonLoader className="mb-2 h-3 w-full rounded-full" />
            <SkeletonLoader className="h-3 w-1/4" />
          </div>
          
          {/* Steps preview */}
          <div className="space-y-2">
            <SkeletonLoader className="h-10 w-full rounded-lg" />
            <SkeletonLoader className="h-10 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton for the AI generator output.
 * Shows animated placeholders during roadmap generation.
 * 
 * @returns Skeleton layout matching generated roadmap structure
 */
export const GeneratorSkeleton: React.FC = () => {
  return (
    <div className="glass-card pulse-glow rounded-2xl p-8">
      {/* Title */}
      <div className="mb-6 text-center">
        <SkeletonLoader className="mx-auto mb-3 h-8 w-2/3" />
        <SkeletonLoader className="mx-auto h-4 w-1/2" />
      </div>
      
      {/* Stats */}
      <div className="mb-8 flex justify-center gap-8">
        <SkeletonLoader className="h-12 w-24 rounded-lg" />
        <SkeletonLoader className="h-12 w-24 rounded-lg" />
        <SkeletonLoader className="h-12 w-24 rounded-lg" />
      </div>
      
      {/* Steps */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl bg-muted/30 p-4"
          >
            <SkeletonLoader variant="circular" className="h-10 w-10 flex-shrink-0" />
            <div className="flex-1">
              <SkeletonLoader className="mb-2 h-5 w-1/3" />
              <SkeletonLoader className="h-3 w-2/3" />
            </div>
            <SkeletonLoader className="h-8 w-16 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
