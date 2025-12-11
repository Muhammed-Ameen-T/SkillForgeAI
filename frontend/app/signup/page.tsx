'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { registerSchema, otpSchema, RegisterFormValues, OtpFormValues } from '@/lib/validation/auth';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

type Step = 'REGISTER' | 'OTP';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('REGISTER');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Form 1: Registration Details
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  // Form 2: OTP Verification
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  // Handle Initial Registration
  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRegisteredEmail(data.email);
      setStep('OTP');
      toast({ title: 'OTP Sent!', description: `Check ${data.email} for your code.` });
    } catch (err) {
      toast({ title: 'Error', description: 'Registration failed', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Verification
  const onOtpSubmit = async (data: OtpFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ title: 'Success!', description: 'Account created successfully.' });
      router.push('/dashboard');
    } catch (err) {
      toast({ title: 'Invalid OTP', description: 'Please try again', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
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
          
          {step === 'REGISTER' ? (
            /* STEP 1: REGISTRATION FORM */
            <>
              <div className="mb-6 text-center">
                <h1 className="mb-2 text-2xl font-bold">Create Account</h1>
                <p className="text-muted-foreground">Join thousands of developers</p>
              </div>

              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <AuthInput
                  label="Full Name"
                  type="text"
                  icon={User}
                  placeholder="John Doe"
                  registration={registerForm.register('fullName')}
                  error={registerForm.formState.errors.fullName?.message}
                />

                <AuthInput
                  label="Email"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  registration={registerForm.register('email')}
                  error={registerForm.formState.errors.email?.message}
                />

                <AuthInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={Lock}
                  placeholder="••••••••"
                  registration={registerForm.register('password')}
                  error={registerForm.formState.errors.password?.message}
                  endIcon={
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  }
                />

                <AuthInput
                  label="Confirm Password"
                  type="password"
                  icon={Lock}
                  placeholder="••••••••"
                  registration={registerForm.register('confirmPassword')}
                  error={registerForm.formState.errors.confirmPassword?.message}
                />

                <Button type="submit" className="btn-gradient w-full h-12 mt-2" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Create Account"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or sign up with</span></div>
              </div>

              <SocialAuth />
            </>
          ) : (
            /* STEP 2: OTP VERIFICATION */
            <>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h1 className="mb-2 text-2xl font-bold">Verify Email</h1>
                <p className="text-muted-foreground">
                  Enter the 6-digit code sent to <br />
                  <span className="font-medium text-foreground">{registeredEmail}</span>
                </p>
              </div>

              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Input 
                    {...otpForm.register('otp')}
                    className="h-14 text-center text-2xl tracking-[0.5em] font-mono bg-muted/30"
                    placeholder="000000"
                    maxLength={6}
                  />
                  {otpForm.formState.errors.otp && (
                    <p className="text-center text-sm text-destructive">{otpForm.formState.errors.otp.message}</p>
                  )}
                </div>

                <Button type="submit" className="btn-gradient w-full h-12" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>

                <button 
                  type="button" 
                  onClick={() => setStep('REGISTER')}
                  className="w-full text-sm text-muted-foreground hover:text-foreground"
                >
                  Change Email Address
                </button>
              </form>
            </>
          )}
        </div>

        {step === 'REGISTER' && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary! hover:underline font-bold">Sign in</Link>
          </p>
        )}
      </div>
    </main>
  );
}