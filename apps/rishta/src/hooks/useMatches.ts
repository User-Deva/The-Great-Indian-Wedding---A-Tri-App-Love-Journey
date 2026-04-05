import { useState, useCallback, useEffect } from 'react';
import { Match, UserProfile } from '../types';
import { useRishtaStore } from '../store/rishtaStore';
import { supabase } from '@great-indian-wedding/auth';
import { calculateCompatibilityScore } from '../utils/kismatEngine';

export function useMatches(userId: string | null, userProfile: UserProfile | null) {
  const { matches, setMatches, setLoading, setError } = useRishtaStore();
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);

  /**
   * Fetch potential matches based on filters
   */
  const fetchMatches = useCallback(
    async (filters?: {
      religion?: string;
      city?: string;
      ageRange?: [number, number];
    }) => {
      if (!userId || !userProfile) {
        setError('User profile required');
        return;
      }

      setIsLoadingMatches(true);
      setError(null);

      try {
        let query = supabase
          .from('user_profiles')
          .select('*, horoscopes(*)');

        // Exclude user's own profile
        query = query.neq('user_id', userId);

        // Apply filters
        if (filters?.religion) {
          query = query.eq('religion', filters.religion);
        }
        if (filters?.city) {
          query = query.eq('city', filters.city);
        }

        const { data: potentialProfiles, error } = await query;

        if (error) throw error;

        // Calculate compatibility for each profile
        const matchesWithScores = potentialProfiles
          .map((profile: any) => ({
            id: `${userId}_${profile.user_id}`,
            user1Id: userId,
            user2Id: profile.user_id,
            compatibilityScore: calculateCompatibilityScore(
              userProfile,
              profile as UserProfile
            ),
            status: 'pending' as const,
            user1Interest: false,
            user2Interest: false,
            mutualInterest: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
          .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
          .slice(0, 20);

        setMatches(matchesWithScores);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch matches';
        setError(message);
      } finally {
        setIsLoadingMatches(false);
      }
    },
    [userId, userProfile, setMatches, setError]
  );

  /**
   * Express interest in a match
   */
  const expressInterest = useCallback(
    async (matchId: string, targetUserId: string) => {
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      try {
        // Check if match already exists
        const { data: existingMatch, error: fetchError } = await supabase
          .from('matches')
          .select('*')
          .or(`and(user1_id.eq.${userId},user2_id.eq.${targetUserId}),and(user1_id.eq.${targetUserId},user2_id.eq.${userId})`)
          .single();

        if (existingMatch) {
          // Update existing match
          await supabase
            .from('matches')
            .update({
              user1_interest: existingMatch.user1_id === userId,
              mutual_interest:
                (existingMatch.user1_id === userId && existingMatch.user2_interest) ||
                (existingMatch.user2_id === userId && existingMatch.user1_interest),
            })
            .eq('id', existingMatch.id);
        } else {
          // Create new match
          await supabase.from('matches').insert([
            {
              user1_id: userId,
              user2_id: targetUserId,
              user1_interest: true,
              status: 'pending',
            },
          ]);
        }

        // Re-fetch matches
        await fetchMatches();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to express interest';
        setError(message);
      }
    },
    [userId, fetchMatches, setError]
  );

  /**
   * Reject a match
   */
  const rejectMatch = useCallback(
    async (matchId: string) => {
      try {
        await supabase
          .from('matches')
          .update({ status: 'rejected' })
          .eq('id', matchId);

        // Re-fetch matches
        await fetchMatches();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to reject match';
        setError(message);
      }
    },
    [fetchMatches, setError]
  );

  return {
    matches,
    isLoadingMatches,
    fetchMatches,
    expressInterest,
    rejectMatch,
  };
}
