/**
 * @fileoverview AI Generator component for creating learning roadmaps.
 * Provides a form interface for roadmap generation and displays results.
 */

'use client';

import { useState, FormEvent } from 'react';
import { Sparkles, Zap, Target, Clock, BookOpen, Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GeneratorSkeleton } from '@/components/ui/skeleton-loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// Ensure these actions exist in your slice
import { generateRoadmap, saveRoadmap, clearDraft } from '@/store/slices/roadmapSlice';
import type { GenerateRoadmapRequest } from '@/types';
import { useToast } from '@/hooks/use-toast';

/**
 * AI Generator component for creating personalized learning roadmaps.
 * Features a form for input parameters and displays generated roadmap drafts.
 * * @returns Interactive roadmap generator interface
 */
export const AiGenerator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  // Ensure 'isLoading' is mapped correctly from your slice (might be isGenerating)
  const { isGenerating, draftRoadmap, error } = useAppSelector(
    (state) => state.roadmap
  );

  /** Form state for generation parameters */
  const [formData, setFormData] = useState<GenerateRoadmapRequest>({
    skill: '',
    currentLevel: 'none',
    targetLevel: 'intermediate',
    hoursPerWeek: 10,
    preferredStyle: 'mixed',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.skill.trim()) {
      toast({
        title: 'Skill Required',
        description: 'Please enter a skill or topic you want to learn.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await dispatch(generateRoadmap(formData)).unwrap();
      toast({
        title: 'Roadmap Generated!',
        description: 'Your personalized learning path is ready.',
      });
    } catch (err: any) {
      toast({
        title: 'Generation Failed',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    if (!draftRoadmap) return;
    
    try {
      await dispatch(saveRoadmap(draftRoadmap)).unwrap();
      toast({
        title: 'Roadmap Saved!',
        description: 'Your learning path has been saved to your dashboard.',
      });
    } catch (err: any) {
      toast({
        title: 'Save Failed',
        description: err.message || 'Could not save roadmap',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    dispatch(clearDraft());
    setFormData({
      skill: '',
      currentLevel: 'none',
      targetLevel: 'intermediate',
      hoursPerWeek: 10,
      preferredStyle: 'mixed',
    });
  };

  return (
    <section className="w-full" aria-label="AI Roadmap Generator">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Learning</span>
        </div>
        <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
          Generate Your <span className="text-gradient">Learning Path</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Tell us what you want to learn, and our AI will create a personalized roadmap
          tailored to your goals and schedule.
        </p>
      </div>

      {/* Generator Form */}
      {!draftRoadmap && !isGenerating && (
        <form
          onSubmit={handleSubmit}
          className="glass-card mx-auto max-w-2xl rounded-2xl p-6 md:p-8"
        >
          <div className="space-y-6">
            {/* Skill Input */}
            <div className="space-y-2">
              <Label htmlFor="skill" className="flex items-center gap-2 text-foreground">
                <Target className="h-4 w-4 text-primary" />
                What do you want to learn?
              </Label>
              <Input
                id="skill"
                type="text"
                placeholder="e.g., React, Machine Learning, Python..."
                value={formData.skill}
                onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                className="h-12 bg-muted/30 text-foreground placeholder:text-muted-foreground focus-visible:ring-2"
                required
              />
            </div>

            {/* Level Selects Row */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentLevel" className="text-foreground">
                  Your Current Level
                </Label>
                <Select
                  value={formData.currentLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, currentLevel: value as GenerateRoadmapRequest['currentLevel'] })
                  }
                >
                  <SelectTrigger id="currentLevel" className="h-12 bg-muted/30 focus:ring-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Complete Beginner</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetLevel" className="text-foreground">
                  Target Level
                </Label>
                <Select
                  value={formData.targetLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, targetLevel: value as GenerateRoadmapRequest['targetLevel'] })
                  }
                >
                  <SelectTrigger id="targetLevel" className="h-12 bg-muted/30 focus:ring-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time & Style Row */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek" className="flex items-center gap-2 text-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  Hours per Week
                </Label>
                <Input
                  id="hoursPerWeek"
                  type="number"
                  min={1}
                  max={40}
                  value={formData.hoursPerWeek}
                  onChange={(e) =>
                    setFormData({ ...formData, hoursPerWeek: parseInt(e.target.value) || 1 })
                  }
                  className="h-12 bg-muted/30 text-foreground focus-visible:ring-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredStyle" className="flex items-center gap-2 text-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Learning Style
                </Label>
                <Select
                  value={formData.preferredStyle}
                  onValueChange={(value) =>
                    setFormData({ ...formData, preferredStyle: value as GenerateRoadmapRequest['preferredStyle'] })
                  }
                >
                  <SelectTrigger id="preferredStyle" className="h-12 bg-muted/30 focus:ring-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reading">Reading (Articles/Docs)</SelectItem>
                    <SelectItem value="video">Video Courses</SelectItem>
                    <SelectItem value="hands-on">Hands-on Projects</SelectItem>
                    <SelectItem value="mixed">Mixed Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="btn-gradient h-14 w-full rounded-xl text-lg font-semibold"
              disabled={isGenerating}
            >
              <Zap className="mr-2 h-5 w-5" />
              Generate My Roadmap
            </Button>
          </div>
        </form>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 animate-pulse text-primary" />
              <span className="text-lg font-medium text-foreground">
                AI is crafting your roadmap...
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Analyzing skill requirements and generating personalized steps
            </p>
          </div>
          <GeneratorSkeleton />
        </div>
      )}

      {/* Draft Result */}
      {draftRoadmap && !isGenerating && (
        <div className="mx-auto max-w-3xl">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            {/* Draft Header */}
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-green-500/20 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                {draftRoadmap.title}
              </h3>
              <p className="text-muted-foreground">{draftRoadmap.description}</p>
            </div>

            {/* Stats */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-muted/20 p-4 text-center">
                <div className="mb-1 text-2xl font-bold text-primary">
                  {draftRoadmap.steps.length}
                </div>
                <div className="text-xs text-muted-foreground">Steps</div>
              </div>
              <div className="rounded-xl bg-muted/20 p-4 text-center">
                <div className="mb-1 text-2xl font-bold text-secondary">
                  {draftRoadmap.estimatedDuration.split(' ')[0]}
                </div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
              <div className="rounded-xl bg-muted/20 p-4 text-center">
                <div className="mb-1 text-2xl font-bold capitalize text-accent">
                  {draftRoadmap.difficulty}
                </div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
            </div>

            {/* Steps List */}
            <div className="mb-8 space-y-3">
              {draftRoadmap.steps.map((step, index) => (
                <div
                  key={step.id || index}
                  className="flex items-start gap-4 rounded-xl bg-muted/20 p-4 transition-colors hover:bg-muted/30"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{step.duration}</span>
                      <span className="text-muted">•</span>
                      <span>{step.resources.length} resources</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleSave}
                className="btn-gradient flex-1 h-12 rounded-xl font-semibold"
                // disabled={isLoading} // Uncomment if isLoading is available in slice
              >
                <Save className="mr-2 h-5 w-5" />
                Save to Dashboard
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 rounded-xl border-border bg-transparent font-semibold text-foreground hover:bg-muted/30"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Generate New
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mx-auto max-w-2xl rounded-xl bg-destructive/10 p-4 text-center text-destructive">
          <p>{error}</p>
          <Button
            onClick={handleReset}
            variant="ghost"
            className="mt-2 text-destructive hover:bg-destructive/20"
          >
            Try Again
          </Button>
        </div>
      )}
    </section>
  );
};