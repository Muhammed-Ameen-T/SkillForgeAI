/**
 * @fileoverview Type definitions for SkillForge AI application.
 * Contains all shared TypeScript interfaces and types used across the application.
 */

/**
 * Represents a single step/milestone in a learning roadmap.
 */
export interface RoadmapStep {
  /** Unique identifier for the step */
  id: string;
  /** Step title/name */
  title: string;
  /** Detailed description of what to learn */
  description: string;
  /** Estimated duration (e.g., "2 weeks") */
  duration: string;
  /** Learning resources for this step */
  resources: Resource[];
  /** Whether this step is completed */
  isCompleted: boolean;
  /** Order/position in the roadmap */
  order: number;
}

/**
 * Represents a learning resource (article, video, course, etc.)
 */
export interface Resource {
  /** Unique identifier */
  id: string;
  /** Resource title */
  title: string;
  /** URL to the resource */
  url: string;
  /** Type of resource */
  type: 'article' | 'video' | 'course' | 'book' | 'tutorial';
}

/**
 * Represents a complete learning roadmap.
 */
export interface Roadmap {
  /** Unique identifier */
  id: string;
  /** Roadmap title */
  title: string;
  /** Brief description of the learning goal */
  description: string;
  /** Skill/topic being learned */
  skill: string;
  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Estimated total duration */
  estimatedDuration: string;
  /** Individual steps in the roadmap */
  steps: RoadmapStep[];
  /** Creation timestamp */
  createdAt: string;
  /** Last updated timestamp */
  updatedAt: string;
  /** Overall progress percentage (0-100) */
  progress: number;
}

/**
 * User authentication credentials for login.
 */
export interface LoginCredentials {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
}

/**
 * Authenticated user information.
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User's email address */
  email: string;
  /** User's display name */
  name: string;
  /** URL to user's avatar image */
  avatar?: string;
  /** Account creation timestamp */
  createdAt: string;
}

/**
 * Authentication response from the server.
 */
export interface AuthResponse {
  /** JWT access token */
  token: string;
  /** Authenticated user data */
  user: User;
}

/**
 * Request payload for AI roadmap generation.
 */
export interface GenerateRoadmapRequest {
  /** The skill or topic to learn */
  skill: string;
  /** Current skill level */
  currentLevel: 'none' | 'beginner' | 'intermediate' | 'advanced';
  /** Target proficiency level */
  targetLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  /** Available time per week for learning */
  hoursPerWeek: number;
  /** Preferred learning style */
  preferredStyle: 'reading' | 'video' | 'hands-on' | 'mixed';
}

/**
 * API error response structure.
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** HTTP status code */
  statusCode: number;
  /** Error code for programmatic handling */
  code?: string;
}

/**
 * Generic API response wrapper.
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  /** Success indicator */
  success: boolean;
  /** Optional message */
  message?: string;
}
