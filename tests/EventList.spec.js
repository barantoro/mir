import { mount } from '@vue/test-utils';
import EventList from '../components/EventList.vue';

describe('EventList.vue', () => {

    // Checks if events are rendered correctly
    it('renders events correctly', () => {
        const events = [
            {
                id: 1,
                date: '2024-08-15',
                time: '14:30',
                category: 'Concert',
                title: 'Summer Music Festival',
                description: 'Enjoy the best summer hits!',
                location: 'Main Stage',
                price: '30'
            }
        ];
        const wrapper = mount(EventList, {
            props: { events }
        });

        const event = wrapper.find('.single-event');
        expect(event.exists()).toBe(true);
        expect(event.find('.date span').html()).toContain('<strong>Thu</strong>, 15. August 2024');
        expect(event.find('.date strong').text()).toBe('Thu');
        expect(event.find('.event .type-badge').text()).toBe('Concert');
        expect(event.find('.event-name').text()).toBe('Summer Music Festival');
        expect(event.find('.event-description').text()).toBe('Enjoy the best summer hits!');
        expect(event.find('.event-location').text()).toBe('Main Stage');
        expect(event.find('.price').text()).toBe('30€');
        expect(event.find('.btn').attributes('aria-label')).toBe('Buy Ticket for Summer Music Festival');
    });

    // Test case for no events scenario
    it('displays no events message when events array is empty', () => {
        const wrapper = mount(EventList, {
            props: { events: [] }
        });

        const noData = wrapper.find('.no-data');
        expect(noData.exists()).toBe(true);
        expect(noData.text()).toContain('No Events Found 🎵');
        expect(noData.text()).toContain('It looks like there are no events matching your search criteria right now.');
    });
});
