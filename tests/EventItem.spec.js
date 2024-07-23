import { mount } from '@vue/test-utils';
import EventItem from '../components/EventItem.vue';

describe('EventItem.vue', () => {
    const event = {
        id: 1,
        date: '2024-08-15',
        time: '14:30',
        category: 'Concert',
        title: 'Summer Music Festival',
        description: 'Enjoy the best summer hits!',
        location: 'Main Stage',
        price: '30'
    };

    // Checks if event rendered correctly
    it('renders events correctly', () => {
        const wrapper = mount(EventItem, {
            props: { event }
        });

        const item = wrapper.find('.single-event');
        expect(item.exists()).toBe(true);
        expect(item.find('.date span').html()).toContain('<strong>Thu</strong>, 15. August 2024');
        expect(item.find('.date strong').text()).toBe('Thu');
        expect(item.find('.event .type-badge').text()).toBe('Concert');
        expect(item.find('.event-name').text()).toBe('Summer Music Festival');
        expect(item.find('.event-description').text()).toBe('Enjoy the best summer hits!');
        expect(item.find('.event-location').text()).toBe('Main Stage');
        expect(item.find('.price').text()).toBe('30€');
        expect(item.find('.btn').attributes('aria-label')).toBe('Buy Ticket for Summer Music Festival');
    });


    // Validates formatDate method
    it('formats date correctly', () => {
        const wrapper = mount(EventItem, {
            props: { event }
        });
        const instance = wrapper.vm;
        const formattedDate = instance.formatDate('2024-08-15');
        expect(formattedDate).toBe('<strong>Thu</strong>, 15. August 2024');
    });

    // Validates convertTo12HourFormat method
    it('converts time to 12-hour format correctly', () => {
        const wrapper = mount(EventItem, {
            props: { event }
        });
        const instance = wrapper.vm;
        const formattedTime = instance.convertTo12HourFormat('14:30');
        expect(formattedTime).toBe('2:30 pm');
    });

    // Checks ARIA attributes
    it('sets correct aria attributes for accessibility', () => {
        const wrapper = mount(EventItem, {
            props: { event }
        });

        const item = wrapper.find('.single-event');
        expect(item.find('.date span').attributes('aria-label')).toBe('Event date');
        expect(item.find('.time').attributes('aria-label')).toBe('Event time');
        expect(item.find('.type-badge').attributes('aria-label')).toBe('Event category');
        expect(item.find('.btn').attributes('aria-label')).toBe('Buy Ticket for Summer Music Festival');
    });

    // Test case to check button tabindex
    it('sets correct tabindex on the buy ticket button', () => {
        const wrapper = mount(EventItem, {
            props: { event }
        });

        const button = wrapper.find('.btn');
        expect(button.attributes('tabindex')).toBe('0');
    });
});
