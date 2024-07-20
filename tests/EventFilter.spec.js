import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import EventFilter from '../components/EventFilter.vue'
import CustomSelectbox from '../components/CustomSelectbox.vue';

describe('EventFilter.vue', () => {

    // Ensures that CustomSelectbox components are rendered with the correct props
    it('renders child CustomSelectbox components with correct props', () => {
        const categories = ['Category1', 'Category2'];
        const locations = ['Location1', 'Location2'];
        const wrapper = mount(EventFilter, {
            props: { categories, locations }
        });

        const CustomSelectboxs = wrapper.findAllComponents(CustomSelectbox);

        // There should be 2 CustomSelectbox components
        expect(CustomSelectboxs).toHaveLength(2);

        // Verify props for first CustomSelectbox (Locations)
        const locationSelect = CustomSelectboxs[0];
        expect(locationSelect.props().label).toBe('Locations');
        expect(locationSelect.props().options).toEqual(locations);

        // Verify props for second CustomSelectbox (Category)
        const categorySelect = CustomSelectboxs[1];
        expect(categorySelect.props().label).toBe('Category');
        expect(categorySelect.props().options).toEqual(categories);
    });

    // Verifies initial values of category and location are empty
    it('initializes category and location values correctly', () => {
        const wrapper = mount(EventFilter);
        const vm = wrapper.vm;
        expect(vm.category).toBe('');
        expect(vm.location).toBe('');
    });

    // Confirms that changing CustomSelectbox updates the category and location values
    it('updates category and location values when CustomSelectbox changes', async () => {
        const wrapper = mount(EventFilter);
        const CustomSelectboxs = wrapper.findAllComponents(CustomSelectbox);

        // Trigger changes in the CustomSelectbox components
        await CustomSelectboxs[0].vm.$emit('update:modelValue', 'Location1');
        await CustomSelectboxs[1].vm.$emit('update:modelValue', 'Category1');

        expect(wrapper.vm.location).toBe('Location1');
        expect(wrapper.vm.category).toBe('Category1');
    });

    // Ensures the filter event is emitted with correct payload when values change
    it('emits filter event with correct payload on value change', async () => {
        const wrapper = mount(EventFilter);
        const CustomSelectboxs = wrapper.findAllComponents(CustomSelectbox);

        // Trigger changes in the CustomSelectbox components
        await CustomSelectboxs[0].vm.$emit('update:modelValue', 'Location1');
        await CustomSelectboxs[1].vm.$emit('update:modelValue', 'Category1');

        // Allow Vue to process updates and emit events
        await wrapper.vm.$nextTick();

        // Assert the 'filter' event is emitted with the correct payload
        expect(wrapper.emitted()).toHaveProperty('filter');
        expect(wrapper.emitted().filter).toEqual([
            [{ category: '', location: 'Location1' }], // First
            [{ category: 'Category1', location: 'Location1' }] // Second
        ]);
    });


    // Verifies correct ARIA attributes for accessibility
    it('sets correct aria attributes', () => {
        const wrapper = mount(EventFilter);
        expect(wrapper.find('[aria-labelledby="filters-label"]').exists()).toBe(true);
        const CustomSelectboxs = wrapper.findAllComponents(CustomSelectbox);
        expect(CustomSelectboxs[0].attributes('aria-labelledby')).toBe('location-select');
        expect(CustomSelectboxs[1].attributes('aria-labelledby')).toBe('category-select');
    });
});
