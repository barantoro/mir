<template>
    <div class="list-wrapper" v-if="events.length > 0">
        <EventItem 
            v-for="(event, index) in events" 
            :key="event.id" 
            :event="event" 
            :index="index" 
            @buy-ticket="handleBuyTicket"
        />
    </div>
    <div class="no-data" v-else role="alert">
        <h3>No Events Found 🎵</h3>
        <p>
            It looks like there are no events matching your search criteria right now. Don't worry, the music scene is always buzzing with new and exciting events!
            <br><br>
            Here are a few things you can try:
            <br><br>
            <strong>Check Back Later:</strong> New events are added all the time, so be sure to come back and see what's new. 
            <br>
            <strong>Adjust Your Filters:</strong> Try broadening your search or using different filters to find more events. 
            <br>
            <strong>Explore Popular Events:</strong> Take a look at some of our most popular events currently happening.
            <br><br>
            Still can't find what you're looking for? Reach out to us, and we'll help you discover the perfect event for you!
        </p>
    </div>
</template>

<script setup>
import EventItem from './EventItem.vue';

const props = defineProps({
    events: {
        type: Array,
        default: () => [],
        required: true,
    },
});

const handleBuyTicket = (event) => {
    console.log(`Ticket bought for: ${event.title}`);
}
</script>

<style lang="scss" scoped>
.list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    @include respond-to('mobile') {
        gap: 2.5rem;
    }
}

.no-data h3 {
    font-size: 36px;

    @include respond-to('mobile') {
        font-size: 24px;
    }
}

.no-data p {
    font-size: 18px;
    line-height: 1.5;

    @include respond-to('mobile') {
        font-size: 14px;
    }
}
</style>
