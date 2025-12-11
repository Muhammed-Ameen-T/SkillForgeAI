  'use client';

  import { useState } from 'react';
  import Link from 'next/link';
  import { useRouter } from 'next/navigation';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { AuthInput } from '@/components/auth/AuthInput';
  import { SocialAuth } from '@/components/auth/SocialAuth';
  import { loginSchema, LoginFormValues } from '@/lib/validation/auth';
  import { useToast } from '@/hooks/use-toast';

  export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      mode: 'onBlur', // Validates when user leaves the field
    });

    const onSubmit = async (data: LoginFormValues) => {
      setIsLoading(true);
      try {
        // await dispatch(loginUser(data)).unwrap();
        await new Promise(resolve => setTimeout(resolve, 1500)); // Demo delay
        toast({ title: 'Welcome back!', description: 'Logged in successfully.' });
        router.push('/dashboard');
      } catch (err) {
        toast({ 
          title: 'Error', 
          description: 'Invalid credentials', 
          variant: 'destructive' 
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <main className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span>Skill<span className="text-gradient">Forge</span></span>
            </Link>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-2xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <AuthInput
                label="Email"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                registration={register('email')}
                error={errors.email?.message}
              />

              <AuthInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="••••••••"
                registration={register('password')}
                error={errors.password?.message}
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                }
              />

              <Button type="submit" className="btn-gradient w-full h-12" disabled={isLoading}>
                {isLoading ? "Signing in..." : <><span className="mr-2">Sign In</span><ArrowRight className="h-4 w-4" /></>}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
            </div>

            <SocialAuth />
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary! hover:underline font-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    );
  }