/**
 * @fileoverview Redux slice for managing roadmap generation state.
 * Handles the AI generation workflow including loading states, draft management,
 * and error handling for the roadmap generator feature.
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';
import type { Roadmap, GenerateRoadmapRequest, ApiResponse } from '@/types';

/**
 * State shape for the roadmap slice.
 */
export interface RoadmapState {
  /** Whether AI generation is currently in progress */
  isGenerating: boolean;
  /** The draft roadmap from AI generation (before saving) */
  draftRoadmap: Roadmap | null;
  /** List of saved roadmaps */
  savedRoadmaps: Roadmap[];
  /** Currently selected roadmap for viewing */
  selectedRoadmap: Roadmap | null;
  /** Error message from failed operations */
  error: string | null;
  /** Loading state for fetching saved roadmaps */
  isLoading: boolean;
}

/**
 * Initial state for the roadmap slice.
 */
const initialState: RoadmapState = {
  isGenerating: false,
  draftRoadmap: null,
  savedRoadmaps: [],
  selectedRoadmap: null,
  error: null,
  isLoading: false,
};

/**
 * Async thunk for generating a roadmap via AI.
 * Posts generation request to the API and returns the generated roadmap.
 * 
 * @param request - The roadmap generation parameters
 * @returns The generated roadmap draft
 * @throws Error if generation fails
 */
export const generateRoadmap = createAsyncThunk<
  Roadmap,
  GenerateRoadmapRequest,
  { rejectValue: string }
>(
  'roadmap/generate',
  async (request, { rejectWithValue }) => {
    try {
      // Simulate API call for demo (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated roadmap for demo
      const mockRoadmap: Roadmap = {
        id: `draft-${Date.now()}`,
        title: `${request.skill} Learning Path`,
        description: `A comprehensive roadmap to master ${request.skill} from ${request.currentLevel} to ${request.targetLevel} level.`,
        skill: request.skill,
        difficulty: request.targetLevel === 'expert' ? 'advanced' : request.targetLevel as 'beginner' | 'intermediate' | 'advanced',
        estimatedDuration: `${Math.ceil(request.hoursPerWeek * 12)} hours over 12 weeks`,
        steps: [
          {
            id: '1',
            title: 'Foundation & Fundamentals',
            description: `Build a solid foundation in ${request.skill} basics. Understand core concepts and terminology.`,
            duration: '2 weeks',
            resources: [
              { id: 'r1', title: 'Official Documentation', url: '#', type: 'article' },
              { id: 'r2', title: 'Beginner Tutorial', url: '#', type: 'video' },
            ],
            isCompleted: false,
            order: 1,
          },
          {
            id: '2',
            title: 'Core Concepts Deep Dive',
            description: `Master the essential patterns and techniques used in professional ${request.skill} development.`,
            duration: '3 weeks',
            resources: [
              { id: 'r3', title: 'Interactive Course', url: '#', type: 'course' },
              { id: 'r4', title: 'Practice Exercises', url: '#', type: 'tutorial' },
            ],
            isCompleted: false,
            order: 2,
          },
          {
            id: '3',
            title: 'Practical Projects',
            description: `Apply your knowledge by building real-world projects that demonstrate ${request.skill} proficiency.`,
            duration: '4 weeks',
            resources: [
              { id: 'r5', title: 'Project-Based Learning', url: '#', type: 'tutorial' },
              { id: 'r6', title: 'Code Examples', url: '#', type: 'article' },
            ],
            isCompleted: false,
            order: 3,
          },
          {
            id: '4',
            title: 'Advanced Techniques',
            description: `Learn advanced patterns, optimizations, and best practices for ${request.skill}.`,
            duration: '3 weeks',
            resources: [
              { id: 'r7', title: 'Advanced Guide', url: '#', type: 'book' },
              { id: 'r8', title: 'Expert Talks', url: '#', type: 'video' },
            ],
            isCompleted: false,
            order: 4,
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
      };
      
      return mockRoadmap;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate roadmap';
      return rejectWithValue(message);
    }
  }
);

/**
 * Async thunk for saving a draft roadmap.
 * 
 * @param roadmap - The roadmap to save
 * @returns The saved roadmap with server-assigned ID
 */
export const saveRoadmap = createAsyncThunk<
  Roadmap,
  Roadmap,
  { rejectValue: string }
>(
  'roadmap/save',
  async (roadmap, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const savedRoadmap: Roadmap = {
        ...roadmap,
        id: `saved-${Date.now()}`,
        updatedAt: new Date().toISOString(),
      };
      
      return savedRoadmap;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save roadmap';
      return rejectWithValue(message);
    }
  }
);

/**
 * Async thunk for fetching user's saved roadmaps.
 * 
 * @returns Array of saved roadmaps
 */
export const fetchRoadmaps = createAsyncThunk<
  Roadmap[],
  void,
  { rejectValue: string }
>(
  'roadmap/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return mock data for demo
      const mockRoadmaps: Roadmap[] = [
        {
          id: 'saved-1',
          title: 'React Mastery Path',
          description: 'A comprehensive journey from React basics to advanced patterns.',
          skill: 'React',
          difficulty: 'intermediate',
          estimatedDuration: '96 hours over 12 weeks',
          steps: [
            {
              id: '1',
              title: 'React Fundamentals',
              description: 'Learn JSX, components, and basic hooks.',
              duration: '2 weeks',
              resources: [],
              isCompleted: true,
              order: 1,
            },
            {
              id: '2',
              title: 'State Management',
              description: 'Master useState, useReducer, and context.',
              duration: '2 weeks',
              resources: [],
              isCompleted: true,
              order: 2,
            },
            {
              id: '3',
              title: 'Advanced Patterns',
              description: 'Learn compound components and render props.',
              duration: '3 weeks',
              resources: [],
              isCompleted: false,
              order: 3,
            },
          ],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          progress: 66,
        },
        {
          id: 'saved-2',
          title: 'TypeScript Foundations',
          description: 'Build type-safe applications with TypeScript.',
          skill: 'TypeScript',
          difficulty: 'beginner',
          estimatedDuration: '48 hours over 6 weeks',
          steps: [
            {
              id: '1',
              title: 'Type Basics',
              description: 'Understand primitive and complex types.',
              duration: '2 weeks',
              resources: [],
              isCompleted: true,
              order: 1,
            },
            {
              id: '2',
              title: 'Generics & Utilities',
              description: 'Master generic types and utility types.',
              duration: '2 weeks',
              resources: [],
              isCompleted: false,
              order: 2,
            },
          ],
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          progress: 50,
        },
      ];
      
      return mockRoadmaps;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch roadmaps';
      return rejectWithValue(message);
    }
  }
);

/**
 * Redux slice for roadmap state management.
 */
const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    /**
     * Clears the current draft roadmap.
     */
    clearDraft: (state) => {
      state.draftRoadmap = null;
    },
    /**
     * Clears any error state.
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Sets the selected roadmap for viewing.
     * 
     * @param state - Current state
     * @param action - Payload containing the roadmap to select
     */
    selectRoadmap: (state, action: PayloadAction<Roadmap | null>) => {
      state.selectedRoadmap = action.payload;
    },
    /**
     * Updates a step's completion status.
     * 
     * @param state - Current state
     * @param action - Payload containing roadmapId and stepId
     */
    toggleStepComplete: (state, action: PayloadAction<{ roadmapId: string; stepId: string }>) => {
      const { roadmapId, stepId } = action.payload;
      const roadmap = state.savedRoadmaps.find(r => r.id === roadmapId);
      
      if (roadmap) {
        const step = roadmap.steps.find(s => s.id === stepId);
        if (step) {
          step.isCompleted = !step.isCompleted;
          // Recalculate progress
          const completedSteps = roadmap.steps.filter(s => s.isCompleted).length;
          roadmap.progress = Math.round((completedSteps / roadmap.steps.length) * 100);
          roadmap.updatedAt = new Date().toISOString();
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate roadmap
      .addCase(generateRoadmap.pending, (state) => {
        state.isGenerating = true;
        state.error = null;
        state.draftRoadmap = null;
      })
      .addCase(generateRoadmap.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.draftRoadmap = action.payload;
      })
      .addCase(generateRoadmap.rejected, (state, action) => {
        state.isGenerating = false;
        state.error = action.payload || 'Failed to generate roadmap';
      })
      // Save roadmap
      .addCase(saveRoadmap.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveRoadmap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedRoadmaps.unshift(action.payload);
        state.draftRoadmap = null;
      })
      .addCase(saveRoadmap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to save roadmap';
      })
      // Fetch roadmaps
      .addCase(fetchRoadmaps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoadmaps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedRoadmaps = action.payload;
      })
      .addCase(fetchRoadmaps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch roadmaps';
      });
  },
});

export const { clearDraft, clearError, selectRoadmap, toggleStepComplete } = roadmapSlice.actions;
export default roadmapSlice.reducer;
