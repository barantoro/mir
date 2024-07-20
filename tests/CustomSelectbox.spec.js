import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomSelectbox from '../components/CustomSelectbox.vue'
const options = ['Option 1', 'Option 2', 'Option 3']; // Reuqired

describe('CustomSelectbox.vue', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(CustomSelectbox, {
            props: { options }
        });
    });

    afterEach(() => {
        wrapper.unmount();
        vi.clearAllMocks();
    });

    it('renders props.label when passed', async () => {
        const label = 'Test Label';
        await wrapper.setProps({ label });
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain(label);
    });

    // Confirms that clicking on the select element alternates the visibility of the dropdown
    it('toggles dropdown visibility on select click', async () => {
        const vm = wrapper.vm;
        // Verify initial dropdown state
        expect(wrapper.find('.select-items').exists()).toBe(true);
        expect(vm.dropdownOpen).toBe(false);
        // Open dropdown
        await wrapper.find('.select-selected').trigger('click');
        await wrapper.vm.$nextTick();
        expect(vm.dropdownOpen).toBe(true);
        // Close dropdown
        await wrapper.find('.select-selected').trigger('click');
        await wrapper.vm.$nextTick();
        expect(vm.dropdownOpen).toBe(false);
    });

    // Ensures that selecting an option updates the displayed value and triggers the `update:modelValue` event with the correct payload
    it('updates selected option on click and emits event', async () => {
        const selectDisplay = wrapper.find('.select-selected');
        // Open dropdown
        await selectDisplay.trigger('click');
        const optionItem = wrapper.findAll('.select-item').at(1);
        // Click option
        await optionItem.trigger('click');
        expect(wrapper.text()).toContain('Option 1');
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Option 1']);
    });

    // Tests that clicking the "All" option sets the selected value to an empty string and displays the correct label
    it('selects "All" option correctly', async () => {
        const label = 'Test Label';
        await wrapper.setProps({ label });
        await wrapper.vm.$nextTick();
        const selectDisplay = wrapper.find('.select-selected');
        // Open dropdown
        await selectDisplay.trigger('click');
        const allOption = wrapper.findAll('.select-item').at(0);
        // Click "All" option
        await allOption.trigger('click');
        expect(wrapper.text()).toContain(`All ${label}`);
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['']);
    });

    // Verifies that keyboard navigation (arrow keys and Enter key) correctly changes the selected option and triggers the appropriate events
    it('handles keyboard navigation', async () => {
        const selectDisplay = wrapper.find('.select-selected');
        // Open dropdown using keyboard
        await selectDisplay.trigger('keydown', { key: 'Enter' });
        // Navigate options using keyboard
        await selectDisplay.trigger('keydown', { key: 'ArrowDown' });
        // Verify navigation to next option
        expect(wrapper.vm.selectedOption).toBe('Option 1');
        await selectDisplay.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.selectedOption).toBe('Option 2');
        await selectDisplay.trigger('keydown', { key: 'ArrowUp' });
        // Verify navigation to previous option
        expect(wrapper.vm.selectedOption).toBe('Option 1');
        // Select the current option
        await selectDisplay.trigger('keydown', { key: 'Enter' });
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Option 1']);
    });

    // Checks that the dropdown closes when clicking outside the component, specifically in mobile view
    it('closes dropdown on outside click in mobile view', async () => {
        global.innerWidth = 500;
        const wrapper = mount(CustomSelectbox, {
            props: { options }
        });
        const vm = wrapper.vm;
        await wrapper.find('.select-selected').trigger('click');
        await vm.$nextTick();
        expect(vm.dropdownOpen).toBe(true);
        // Simulate outside click
        await wrapper.find('.backdrop').trigger('click');
        expect(vm.dropdownOpen).toBe(false);
    });

    // Confirms that the correct ARIA attributes are set for accessibility when the dropdown is open
    it('sets correct aria attributes', async () => {
        const selectDisplay = wrapper.find('.select-selected');
        await selectDisplay.trigger('click');
        expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
        expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
        expect(wrapper.find('[aria-haspopup="listbox"]').exists()).toBe(true);
    });

    // Validates that the component correctly identifies and reacts to mobile viewports
    it('detects mobile view correctly', async () => {
        global.innerWidth = 500;
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isMobile).toBe(true);
        global.innerWidth = 800;
        window.dispatchEvent(new Event('resize'));
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isMobile).toBe(false);
    });

    // Ensures that event listeners are properly added when the component mounts and removed when it unmounts
    it('adds and removes event listeners on mount and unmount', () => {
        const addEventListenerSpy = vitest.spyOn(document, 'addEventListener');
        const removeEventListenerSpy = vitest.spyOn(document, 'removeEventListener');
        const wrapper = mount(CustomSelectbox, {
            props: { options }
        });
        // Verify that event listener is added on mount
        expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
        // Unmount component and verify event listener is removed
        wrapper.unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

});
