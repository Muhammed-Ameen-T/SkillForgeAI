'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * 404 Not Found page component.
 * Displays error message with navigation options.
 * * @returns 404 error page
 */
export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        {/* 404 Text */}
        <h1 className="mb-4 text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary md:text-9xl">
          404
        </h1>
        
        <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
          Page Not Found
        </h2>
        
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/">
            <Button className="btn-gradient h-12 px-6">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="h-12 border-border bg-transparent px-6 text-foreground hover:bg-muted/30"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}