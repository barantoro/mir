import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useEventStore } from '../store/index.js';

beforeEach(() => {
    setActivePinia(createPinia());
    // Reset fetch mocks
    global.fetch = vi.fn();
});

describe('Event Store', () => {
    it('should initialize with empty state', () => {
        const store = useEventStore();
        expect(store.events).toEqual([]);
        expect(store.categories).toEqual([]);
        expect(store.locations).toEqual([]);
    });

    it('should fetch and set events, categories, and locations', async () => {
        const mockEvents = [
            { id: 1, category: 'Jazz', location: 'Großer Saal' },
            { id: 2, category: 'Rock', location: 'Kleiner Saal' },
            { id: 3, category: 'Jazz', location: 'Open-Air Bühne' }
        ];

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ events: mockEvents })
        });

        const store = useEventStore();
        await store.fetchEvents();

        expect(store.events).toEqual(mockEvents);
        expect(store.categories).toEqual(['Jazz', 'Rock']);
        expect(store.locations).toEqual(['Großer Saal', 'Kleiner Saal', 'Open-Air Bühne']);
    });

    it('should handle fetch errors', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Fetch error'));

        const store = useEventStore();
        await store.fetchEvents();

        expect(store.events).toEqual([]);
        expect(store.categories).toEqual([]);
        expect(store.locations).toEqual([]);
    });
});
