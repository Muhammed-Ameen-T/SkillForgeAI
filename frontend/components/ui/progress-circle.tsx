/**
 * @fileoverview Circular progress indicator component.
 * Displays progress as an animated circular gauge.
 */

import { cn } from '@/lib/utils';

/**
 * Props for the ProgressCircle component.
 */
interface ProgressCircleProps {
  /** Progress value (0-100) */
  progress: number;
  /** Size of the circle in pixels */
  size?: number;
  /** Stroke width of the progress ring */
  strokeWidth?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Custom label to display instead of percentage */
  label?: string;
}

/**
 * Circular progress indicator with animated fill.
 * Uses SVG to render a progress ring with smooth animations.
 * 
 * @param props - Component props
 * @param props.progress - Progress percentage (0-100)
 * @param props.size - Diameter of the circle (default: 80)
 * @param props.strokeWidth - Width of the progress stroke (default: 8)
 * @param props.className - Additional CSS classes
 * @param props.showLabel - Whether to show percentage label (default: true)
 * @param props.label - Custom label text
 * @returns SVG circular progress indicator
 * 
 * @example
 * <ProgressCircle progress={75} size={100} />
 */
export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 80,
  strokeWidth = 8,
  className,
  showLabel = true,
  label,
}) => {
  // Calculate circle dimensions
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  // Center point of the SVG
  const center = size / 2;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg]"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          className="opacity-30"
        />
        
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center label */}
      {showLabel && (
        <span className="absolute text-sm font-semibold text-foreground">
          {label || `${Math.round(progress)}%`}
        </span>
      )}
    </div>
  );
};

export default ProgressCircle;
