<template>
    <div class="event-filters-wrapper" role="region" aria-labelledby="filters-label">
        <custom-selectbox
            label="Locations" 
            :options="locations" 
            v-model="location" 
            aria-labelledby="location-select"
        />
        <custom-selectbox 
            label="Category" 
            :options="categories" 
            v-model="category"
            aria-labelledby="category-select" 
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CustomSelectbox from './CustomSelectbox.vue';

defineProps(['categories', 'locations']);

const emit = defineEmits();

const category = ref('');
const location = ref('');

const applyFilters = () => {
    emit('filter', { category: category.value, location: location.value });
};

watch([category, location], () => {
    applyFilters();
});
</script>

<style scoped>
.event-filters-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
}
select {
    border: none;
    border-bottom: 1px solid;
    padding: 6px 12px;
    outline: none !important;
}
</style>
