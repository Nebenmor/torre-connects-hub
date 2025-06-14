// utils/constants.js

/**
 * Application constants and configuration values
 * Centralized location for all static values used throughout the app
 */

// API Configuration
export const API_CONFIG = {
  TORRE_BASE_URL: "https://torre.ai/api",
  SEARCH_ENDPOINT: "/entities/_searchStream",
  GENOME_ENDPOINT: "/genome/bios",
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Search Configuration
export const SEARCH_CONFIG = {
  DEFAULT_SIZE: 20,
  MAX_SIZE: 100,
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 500, // milliseconds
  MAX_RESULTS_DISPLAY: 50,
};

// UI Constants
export const UI_CONSTANTS = {
  MODAL_ANIMATION_DURATION: 200,
  CARD_HOVER_DELAY: 100,
  LOADING_SPINNER_SIZE: 24,
  AVATAR_SIZE: {
    SMALL: 32,
    MEDIUM: 64,
    LARGE: 128,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
};

// Profile Constants
export const PROFILE_CONSTANTS = {
  MAX_SKILLS_DISPLAY: 8,
  MAX_STRENGTHS_DISPLAY: 6,
  MAX_INTERESTS_DISPLAY: 5,
  MAX_EXPERIENCES_DISPLAY: 5,
  DEFAULT_RATING: 4.0,
  RATING_PRECISION: 1, // decimal places
};

// Personality Traits
export const PERSONALITY_TRAITS = {
  OPENNESS: {
    key: "openness",
    label: "Openness",
    description: "Openness to experience and new ideas",
    color: "blue",
  },
  CONSCIENTIOUSNESS: {
    key: "conscientiousness",
    label: "Conscientiousness",
    description: "Organization and dependability",
    color: "green",
  },
  EXTRAVERSION: {
    key: "extraversion",
    label: "Extraversion",
    description: "Social energy and assertiveness",
    color: "orange",
  },
  AGREEABLENESS: {
    key: "agreeableness",
    label: "Agreeableness",
    description: "Cooperation and trustworthiness",
    color: "purple",
  },
  NEUROTICISM: {
    key: "neuroticism",
    label: "Neuroticism",
    description: "Emotional stability and stress handling",
    color: "red",
  },
};

// Color Themes
export const COLOR_THEMES = {
  PRIMARY: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },
  SUCCESS: {
    50: "#f0fdf4",
    100: "#dcfce7",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
  },
  WARNING: {
    50: "#fffbeb",
    100: "#fef3c7",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
  },
  ERROR: {
    50: "#fef2f2",
    100: "#fee2e2",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
};

// Status Messages
export const MESSAGES = {
  LOADING: {
    SEARCH: "Searching for professionals...",
    PROFILE: "Loading profile insights...",
    GENERAL: "Loading...",
  },
  ERROR: {
    NETWORK: "Network error. Please check your connection.",
    API_UNAVAILABLE: "Service temporarily unavailable. Please try again later.",
    PROFILE_NOT_FOUND: "Profile not found.",
    SEARCH_FAILED: "Search failed. Please try again.",
    GENERAL: "Something went wrong. Please try again.",
  },
  SUCCESS: {
    PROFILE_LOADED: "Profile loaded successfully.",
    SEARCH_COMPLETED: "Search completed.",
  },
  EMPTY_STATES: {
    NO_RESULTS: "No results found",
    NO_RESULTS_DESCRIPTION: "Try adjusting your search terms or filters",
    START_SEARCHING: "Ready to discover talent?",
    START_SEARCHING_DESCRIPTION:
      "Start by searching for people, skills, or job roles. Our AI-powered search will help you find the perfect match.",
  },
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_PROFILE_CACHE: true,
  ENABLE_ADVANCED_FILTERS: false,
  ENABLE_EXPORT_FUNCTIONALITY: false,
  ENABLE_ANALYTICS: false,
  ENABLE_DARK_MODE: false,
};

// Statistical Data for Dashboard
export const STATS_DATA = {
  ACTIVE_PROFESSIONALS: "2.5M+",
  COMPANIES_HIRING: "50K+",
  COUNTRIES: "190+",
  SUCCESS_RATE: "94%",
};

// Social Media and Contact Icons
export const SOCIAL_PLATFORMS = {
  LINKEDIN: "linkedin",
  GITHUB: "github",
  TWITTER: "twitter",
  PORTFOLIO: "portfolio",
  EMAIL: "email",
};

// Skill Categories
export const SKILL_CATEGORIES = {
  PROGRAMMING: "Programming Languages",
  FRAMEWORKS: "Frameworks & Libraries",
  DATABASES: "Databases",
  CLOUD: "Cloud Platforms",
  TOOLS: "Development Tools",
  SOFT_SKILLS: "Soft Skills",
  DESIGN: "Design & UX",
  MANAGEMENT: "Management & Leadership",
};

// Experience Levels
export const EXPERIENCE_LEVELS = {
  ENTRY: { min: 0, max: 2, label: "Entry Level (0-2 years)" },
  JUNIOR: { min: 2, max: 4, label: "Junior (2-4 years)" },
  MID: { min: 4, max: 7, label: "Mid Level (4-7 years)" },
  SENIOR: { min: 7, max: 10, label: "Senior (7-10 years)" },
  LEAD: { min: 10, max: 15, label: "Lead (10-15 years)" },
  EXPERT: { min: 15, max: null, label: "Expert (15+ years)" },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  RECENT_SEARCHES: "torre_recent_searches",
  USER_PREFERENCES: "torre_user_preferences",
  CACHED_PROFILES: "torre_cached_profiles",
  THEME_PREFERENCE: "torre_theme",
};

// Animation Durations (milliseconds)
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
};

// Validation Rules
export const VALIDATION = {
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_LENGTH: 100,
  USERNAME_PATTERN: /^[a-zA-Z0-9_-]+$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
