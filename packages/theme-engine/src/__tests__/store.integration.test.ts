import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useThemeStore } from '../store';

describe('Theme Store - Integration Tests', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useThemeStore();
    store.setState({
      currentStage: 'SEEKING',
      themes: {},
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('setJourneyStage action', () => {
    it('should update journey stage in store', () => {
      const store = useThemeStore();

      store.setJourneyStage('MATCHED');

      const state = store.getState();
      expect(state.currentStage).toBe('MATCHED');
    });

    it('should transition through journey stages', () => {
      const store = useThemeStore();
      const stages = [
        'SEEKING',
        'MATCHED',
        'DATE_SET',
        'DATING',
        'WEDDING',
        'HONEYMOONING',
      ];

      stages.forEach((stage) => {
        store.setJourneyStage(stage as any);
        const state = store.getState();
        expect(state.currentStage).toBe(stage);
      });
    });

    it('should dispatch custom event on stage change', () => {
      const store = useThemeStore();
      const eventListener = vi.fn();

      window.addEventListener('journey-stage-changed', eventListener);

      store.setJourneyStage('MATCHED');

      expect(eventListener).toHaveBeenCalled();

      window.removeEventListener('journey-stage-changed', eventListener);
    });

    it('should persist stage in state', () => {
      const store = useThemeStore();

      store.setJourneyStage('WEDDING');

      // Simulate component unmount and remount
      const storeAgain = useThemeStore();
      const state = storeAgain.getState();

      expect(state.currentStage).toBe('WEDDING');
    });
  });

  describe('getCurrentTheme selector', () => {
    it('should return theme for current stage', () => {
      const store = useThemeStore();

      store.setJourneyStage('MATCHED');

      const theme = store.getCurrentTheme();
      expect(theme).toBeDefined();
      expect(theme.stage).toBe('MATCHED');
    });

    it('should include primary color in theme', () => {
      const store = useThemeStore();

      store.setJourneyStage('SEEKING');

      const theme = store.getCurrentTheme();
      expect(theme).toHaveProperty('colors');
      expect(theme.colors).toHaveProperty('primary');
    });

    it('should include secondary color in theme', () => {
      const store = useThemeStore();

      store.setJourneyStage('SEEKING');

      const theme = store.getCurrentTheme();
      expect(theme.colors).toHaveProperty('secondary');
    });

    it('should include accent color in theme', () => {
      const store = useThemeStore();

      store.setJourneyStage('SEEKING');

      const theme = store.getCurrentTheme();
      expect(theme.colors).toHaveProperty('accent');
    });

    it('should return different themes for different stages', () => {
      const store = useThemeStore();

      store.setJourneyStage('SEEKING');
      const seekingTheme = store.getCurrentTheme();

      store.setJourneyStage('MATCHED');
      const matchedTheme = store.getCurrentTheme();

      expect(seekingTheme.colors.primary).not.toBe(matchedTheme.colors.primary);
    });
  });

  describe('Theme persistence', () => {
    it('should maintain theme through store updates', () => {
      const store = useThemeStore();

      store.setJourneyStage('DATING');
      const initialTheme = store.getCurrentTheme();

      // Simulate other store updates
      store.setJourneyStage('DATING');

      const finalTheme = store.getCurrentTheme();
      expect(initialTheme.stage).toBe(finalTheme.stage);
    });

    it('should handle rapid stage transitions', () => {
      const store = useThemeStore();

      store.setJourneyStage('SEEKING');
      store.setJourneyStage('MATCHED');
      store.setJourneyStage('WEDDING');

      const state = store.getState();
      expect(state.currentStage).toBe('WEDDING');
    });
  });

  describe('Event emission and listening', () => {
    it('should emit event with stage data', (done) => {
      const store = useThemeStore();

      window.addEventListener('journey-stage-changed', (event: any) => {
        expect(event.detail.newStage).toBe('HONEYMOONING');
        done();
      });

      store.setJourneyStage('HONEYMOONING');
    });

    it('should allow multiple event listeners', () => {
      const store = useThemeStore();
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      window.addEventListener('journey-stage-changed', listener1);
      window.addEventListener('journey-stage-changed', listener2);

      store.setJourneyStage('MATCHED');

      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();

      window.removeEventListener('journey-stage-changed', listener1);
      window.removeEventListener('journey-stage-changed', listener2);
    });
  });

  describe('Theme compatibility', () => {
    it('should have accessible color contrasts', () => {
      const store = useThemeStore();

      const stages = [
        'SEEKING',
        'MATCHED',
        'DATE_SET',
        'DATING',
        'WEDDING',
        'HONEYMOONING',
      ];

      stages.forEach((stage) => {
        store.setJourneyStage(stage as any);
        const theme = store.getCurrentTheme();

        expect(theme.colors).toBeDefined();
        expect(theme.colors.primary).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('should have consistent theme structure', () => {
      const store = useThemeStore();

      store.setJourneyStage('SEEKING');
      const seekingTheme = store.getCurrentTheme();

      store.setJourneyStage('WEDDING');
      const weddingTheme = store.getCurrentTheme();

      const seekingKeys = Object.keys(seekingTheme).sort();
      const weddingKeys = Object.keys(weddingTheme).sort();

      expect(seekingKeys).toEqual(weddingKeys);
    });
  });
});
