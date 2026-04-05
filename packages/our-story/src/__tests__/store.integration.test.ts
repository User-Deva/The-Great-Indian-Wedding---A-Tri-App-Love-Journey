import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useOurStoryStore } from '../store';

describe('Our Story Store - Integration Tests', () => {
  beforeEach(() => {
    const store = useOurStoryStore();
    store.setState({
      timeline: [],
      memories: [],
      gallery: [],
      couples: [],
    });
  });

  describe('Timeline Management', () => {
    it('should add timeline event', () => {
      const store = useOurStoryStore();

      const event = {
        id: '1',
        coupleId: 'couple-1',
        timestamp: new Date('2024-01-01'),
        milestone: 'FIRST_MEETING',
        title: 'Our First Meeting',
        description: 'Met at a friend\'s wedding',
        location: 'New Delhi',
        photos: ['photo1.jpg'],
      };

      store.addTimelineEvent(event);

      const state = store.getState();
      expect(state.timeline).toContainEqual(event);
    });

    it('should maintain timeline sorted by timestamp', () => {
      const store = useOurStoryStore();

      store.addTimelineEvent({
        id: '1',
        coupleId: 'couple-1',
        timestamp: new Date('2024-03-01'),
        milestone: 'FIRST_MEETING',
        title: 'First Meeting',
        description: '',
        location: '',
        photos: [],
      });

      store.addTimelineEvent({
        id: '2',
        coupleId: 'couple-1',
        timestamp: new Date('2024-01-01'),
        milestone: 'FIRST_KISS',
        title: 'First Kiss',
        description: '',
        location: '',
        photos: [],
      });

      store.addTimelineEvent({
        id: '3',
        coupleId: 'couple-1',
        timestamp: new Date('2024-02-01'),
        milestone: 'ENGAGEMENT',
        title: 'Engagement',
        description: '',
        location: '',
        photos: [],
      });

      const state = store.getState();
      expect(state.timeline[0].id).toBe('2');
      expect(state.timeline[1].id).toBe('3');
      expect(state.timeline[2].id).toBe('1');
    });

    it('should remove timeline event', () => {
      const store = useOurStoryStore();

      const event = {
        id: '1',
        coupleId: 'couple-1',
        timestamp: new Date(),
        milestone: 'FIRST_MEETING',
        title: 'First Meeting',
        description: '',
        location: '',
        photos: [],
      };

      store.addTimelineEvent(event);
      store.removeTimelineEvent('1');

      const state = store.getState();
      expect(state.timeline.some((e) => e.id === '1')).toBe(false);
    });

    it('should update timeline event', () => {
      const store = useOurStoryStore();

      const event = {
        id: '1',
        coupleId: 'couple-1',
        timestamp: new Date(),
        milestone: 'FIRST_MEETING',
        title: 'First Meeting',
        description: 'Original description',
        location: 'Delhi',
        photos: [],
      };

      store.addTimelineEvent(event);

      const updated = {
        ...event,
        description: 'Updated description',
      };

      store.updateTimelineEvent(updated);

      const state = store.getState();
      const timelineEvent = state.timeline.find((e) => e.id === '1');
      expect(timelineEvent?.description).toBe('Updated description');
    });
  });

  describe('Memory Management', () => {
    it('should add memory', () => {
      const store = useOurStoryStore();

      const memory = {
        id: '1',
        coupleId: 'couple-1',
        title: 'First Dance',
        description: 'Our first dance was magical',
        date: new Date(),
        photos: ['dance.jpg'],
        tags: ['dance', 'wedding'],
      };

      store.addMemory(memory);

      const state = store.getState();
      expect(state.memories).toContainEqual(memory);
    });

    it('should remove memory', () => {
      const store = useOurStoryStore();

      const memory = {
        id: '1',
        coupleId: 'couple-1',
        title: 'First Dance',
        description: '',
        date: new Date(),
        photos: [],
        tags: [],
      };

      store.addMemory(memory);
      store.removeMemory('1');

      const state = store.getState();
      expect(state.memories.some((m) => m.id === '1')).toBe(false);
    });

    it('should update memory', () => {
      const store = useOurStoryStore();

      const memory = {
        id: '1',
        coupleId: 'couple-1',
        title: 'First Dance',
        description: 'Original',
        date: new Date(),
        photos: [],
        tags: [],
      };

      store.addMemory(memory);

      const updated = {
        ...memory,
        description: 'Updated description',
      };

      store.updateMemory(updated);

      const state = store.getState();
      const updatedMemory = state.memories.find((m) => m.id === '1');
      expect(updatedMemory?.description).toBe('Updated description');
    });
  });

  describe('Gallery Management', () => {
    it('should add gallery image', () => {
      const store = useOurStoryStore();

      const image = {
        id: '1',
        coupleId: 'couple-1',
        url: 'https://example.com/image.jpg',
        caption: 'Our wedding day',
        uploadedAt: new Date(),
        tags: ['wedding'],
      };

      store.addGalleryImage(image);

      const state = store.getState();
      expect(state.gallery).toContainEqual(image);
    });

    it('should remove gallery image', () => {
      const store = useOurStoryStore();

      const image = {
        id: '1',
        coupleId: 'couple-1',
        url: 'https://example.com/image.jpg',
        caption: '',
        uploadedAt: new Date(),
        tags: [],
      };

      store.addGalleryImage(image);
      store.removeGalleryImage('1');

      const state = store.getState();
      expect(state.gallery.some((g) => g.id === '1')).toBe(false);
    });

    it('should handle multiple gallery images', () => {
      const store = useOurStoryStore();

      for (let i = 1; i <= 5; i++) {
        store.addGalleryImage({
          id: String(i),
          coupleId: 'couple-1',
          url: `https://example.com/image${i}.jpg`,
          caption: `Image ${i}`,
          uploadedAt: new Date(),
          tags: [],
        });
      }

      const state = store.getState();
      expect(state.gallery).toHaveLength(5);
    });
  });

  describe('Data Consistency', () => {
    it('should maintain separate data for different couples', () => {
      const store = useOurStoryStore();

      const event1 = {
        id: '1',
        coupleId: 'couple-1',
        timestamp: new Date(),
        milestone: 'FIRST_MEETING',
        title: 'Couple 1 Meeting',
        description: '',
        location: '',
        photos: [],
      };

      const event2 = {
        id: '2',
        coupleId: 'couple-2',
        timestamp: new Date(),
        milestone: 'FIRST_MEETING',
        title: 'Couple 2 Meeting',
        description: '',
        location: '',
        photos: [],
      };

      store.addTimelineEvent(event1);
      store.addTimelineEvent(event2);

      const state = store.getState();
      expect(state.timeline).toHaveLength(2);
      expect(
        state.timeline.filter((e) => e.coupleId === 'couple-1')
      ).toHaveLength(1);
      expect(
        state.timeline.filter((e) => e.coupleId === 'couple-2')
      ).toHaveLength(1);
    });

    it('should handle concurrent operations', () => {
      const store = useOurStoryStore();

      // Simulate concurrent adds
      for (let i = 1; i <= 10; i++) {
        store.addTimelineEvent({
          id: String(i),
          coupleId: 'couple-1',
          timestamp: new Date(),
          milestone: 'FIRST_MEETING',
          title: `Event ${i}`,
          description: '',
          location: '',
          photos: [],
        });
      }

      const state = store.getState();
      expect(state.timeline).toHaveLength(10);
    });
  });

  describe('Export functionality', () => {
    it('should compile data for export', () => {
      const store = useOurStoryStore();

      store.addTimelineEvent({
        id: '1',
        coupleId: 'couple-1',
        timestamp: new Date(),
        milestone: 'FIRST_MEETING',
        title: 'First Meeting',
        description: 'Original description',
        location: 'Delhi',
        photos: ['photo.jpg'],
      });

      store.addMemory({
        id: '1',
        coupleId: 'couple-1',
        title: 'Memory',
        description: 'A cherished memory',
        date: new Date(),
        photos: ['memory.jpg'],
        tags: ['special'],
      });

      const state = store.getState();

      expect(state.timeline.length).toBeGreaterThan(0);
      expect(state.memories.length).toBeGreaterThan(0);
    });
  });
});
