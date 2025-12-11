import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  registration: UseFormRegisterReturn;
  error?: string;
  endIcon?: React.ReactNode;
}

export function AuthInput({ 
  label, 
  icon: Icon, 
  registration, 
  error, 
  className, 
  endIcon,
  ...props 
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <Label className={cn("transition-colors", error ? "text-destructive" : "text-foreground")}>
        {label}
      </Label>
      <div className="relative">
        <Icon className={cn(
          "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors",
          error ? "text-destructive" : "text-muted-foreground"
        )} />
        
        <Input
          {...registration}
          {...props}
          className={cn(
            "h-12 bg-muted/30 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-2",
            endIcon ? "pr-10" : "",
            error 
              ? "border-destructive focus-visible:ring-destructive/50" 
              : "border-input focus-visible:ring-primary/50",
            className
          )}
        />
        
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>
      
      {/* Inline Validation Error with Slide Down Animation */}
      {error && (
        <p className="text-xs font-medium text-red-500! animate-in slide-in-from-top-1 fade-in-0">
          {error}
        </p>
      )}
    </div>
  );
} 