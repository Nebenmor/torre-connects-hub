// src/hooks/useProfile.js

import { useState } from "react";
import TorreApiService from "../services/api/torreApi";
import { mockGenomeData } from "../services/mockData";

/**
 * Custom hook for managing profile data
 * Handles fetching and caching of user genome data from Torre.ai
 */
export const useProfile = () => {
  const [genomeData, setGenomeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async (username) => {
    if (!username) {
      setError("Username is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await TorreApiService.getPersonGenome(username);
      setGenomeData(data);
    } catch (err) {
      console.error("Failed to load genome data:", err);
      setError(err.message);
      // Use mock data as fallback
      setGenomeData(mockGenomeData(username));
    } finally {
      setLoading(false);
    }
  };

  const clearProfile = () => {
    setGenomeData(null);
    setError(null);
  };

  return {
    genomeData,
    loading,
    error,
    fetchProfile,
    clearProfile,
  };
};

/**
 * Hook for managing multiple profiles cache
 * Useful for applications that need to cache multiple user profiles
 */
export const useProfileCache = () => {
  const [profileCache, setProfileCache] = useState(new Map());
  const [loading, setLoading] = useState(false);

  const getCachedProfile = (username) => {
    return profileCache.get(username);
  };

  const fetchAndCacheProfile = async (username) => {
    if (!username) return null;

    // Return cached version if available
    const cached = profileCache.get(username);
    if (cached) return cached;

    setLoading(true);
    try {
      const data = await TorreApiService.getPersonGenome(username);
      setProfileCache((prev) => new Map(prev).set(username, data));
      return data;
    } catch (err) {
      console.error("Failed to load and cache genome data:", err);
      const mockData = mockGenomeData(username);
      setProfileCache((prev) => new Map(prev).set(username, mockData));
      return mockData;
    } finally {
      setLoading(false);
    }
  };

  const clearCache = (username = null) => {
    if (username) {
      setProfileCache((prev) => {
        const newCache = new Map(prev);
        newCache.delete(username);
        return newCache;
      });
    } else {
      setProfileCache(new Map());
    }
  };

  return {
    profileCache,
    loading,
    getCachedProfile,
    fetchAndCacheProfile,
    clearCache,
  };
};
