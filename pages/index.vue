<template>
    <main class="container">
        <h1>Program and tickets</h1>
        <section aria-labelledby="filter-section">
            <EventFilter 
                :categories="categories" 
                :locations="locations" 
                @filter="applyFilter" 
                aria-labelledby="filter-section"
            />
        </section>
        <section aria-labelledby="event-list-section">
            <EventList 
                :events="filteredEvents" 
                class="mt-5" 
                aria-labelledby="event-list-section"
            />
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useEventStore } from '~/store';
import EventFilter from '~/components/EventFilter.vue';
import EventList from '~/components/EventList.vue';

const store = useEventStore();
const filteredEvents = ref([]);
const categories = ref([])
const locations = ref([])

const applyFilter = (filters) => {
  filteredEvents.value = store.events.filter(event => {
    return (!filters.category || event.category === filters.category) &&
           (!filters.location || event.location === filters.location);
  });
};

onMounted(async () => {
  await store.fetchEvents();
  filteredEvents.value = store.events;
  categories.value = store.categories;
  locations.value = store.locations;
});
</script>

<style scoped>
h1 {
  font-size: 60px;
  margin: 5rem 0 2rem 0;
}
.mt-5 {
  margin-top: 1.5rem;
}
@media (max-width: 576px) {
  h1 {
    font-size: 40px;
  }
}
</style>
