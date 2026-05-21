import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@great-indian-wedding/auth';
import { useThemeStore, JourneyStage } from '@great-indian-wedding/theme-engine';
import { mockApi } from '@great-indian-wedding/mock-backend';
import type { MockCouple, MockUser } from '@great-indian-wedding/mock-backend';

export interface AppBootstrapState {
  isReady: boolean;
  user: MockUser | null;
  couple: MockCouple | null;
  refresh: () => void;
}

export function useAppBootstrap(): AppBootstrapState {
  const [isReady, setIsReady] = useState(false);
  const [user, setLocalUser] = useState<MockUser | null>(null);
  const [couple, setCouple] = useState<MockCouple | null>(null);
  const { setUser } = useAuthStore();
  const { setCouple: setThemeCouple, setJourneyStage } = useThemeStore();

  const load = useCallback(() => {
    const currentUser = mockApi.getCurrentUser();
    if (!currentUser) {
      setLocalUser(null);
      setCouple(null);
      setIsReady(true);
      return;
    }
    const c = mockApi.getCouple(currentUser.coupleId);
    setLocalUser(currentUser);
    setCouple(c);
    setUser({
      id: currentUser.id,
      email: currentUser.email,
      coupleId: currentUser.coupleId,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (c) {
      setThemeCouple(c.id);
      const desired = c.journeyStage as JourneyStage;
      const current = useThemeStore.getState().journeyStage;
      if (desired !== current) {
        setJourneyStage(desired);
      }
    }
    setIsReady(true);
  }, [setUser, setThemeCouple, setJourneyStage]);

  useEffect(() => {
    load();
  }, [load]);

  // Re-sync when this tab regains focus (another tab may have advanced the journey).
  useEffect(() => {
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onFocus);
    };
  }, [load]);

  return { isReady, user, couple, refresh: load };
}

export function syncJourneyStage(coupleId: string): void {
  const stage = mockApi.getJourneyStage(coupleId);
  const current = useThemeStore.getState().journeyStage;
  if (stage !== current) {
    useThemeStore.getState().setJourneyStage(stage);
  }
}
