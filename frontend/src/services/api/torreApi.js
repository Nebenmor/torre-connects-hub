import { mockSearchResults, mockGenomeData } from '../mockData';

/**
 * Torre.ai API Service Layer
 * Handles all API calls to Torre.ai with proper error handling and fallbacks
 */
export class TorreApiService {
  static BASE_URL = 'https://torre.ai/api';

  /**
   * Search for people using Torre.ai API
   * @param {string} query - Search query
   * @param {Object} filters - Optional filters
   * @returns {Promise<Object>} Search results
   */
  static async searchPeople(query, filters = {}) {
    try {
      const searchPayload = {
        query,
        filters,
        size: 20,
        offset: 0,
        aggregate: false,
        excludeContacts: false,
      };

      const response = await fetch(`${this.BASE_URL}/entities/_searchStream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(searchPayload),
      });

      if (!response.ok) {
        throw new Error(
          `Torre.ai API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const transformedResults = this.transformSearchResults(data.results || []);

      return {
        results: transformedResults,
        total: