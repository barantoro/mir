import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
        events: [],
        categories: [],
        locations: [],
    }),
    actions: {
        async fetchEvents() {
            try {
                const response = await fetch('/events.json');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                this.events = data.events;

                // Set to collect unique categories and locations
                const categoriesSet = new Set();
                const locationsSet = new Set();

                // Iterate through events to populate sets
                data.events.forEach(event => {
                    categoriesSet.add(event.category);
                    locationsSet.add(event.location);
                });

                // Convert sets to arrays and update state
                this.categories = Array.from(categoriesSet);
                this.locations = Array.from(locationsSet);

            } catch (err) {
                console.error('Fetch error:', err);
            }
        }
    }
});
