<template>
    <div class="single-event" v-if="event">
        <div class="date">
                <span v-html="formatDate(event.date)" aria-label="Event date"></span>
                <strong class="time" aria-label="Event time">{{ convertTo12HourFormat(event.date, event.time) }}</strong>
        </div>
        <div class="event">
            <span class="type-badge" aria-label="Event category">
                {{ event.category }}
            </span>
            <h3 class="event-name">{{ event.title }}</h3>
            <p class="event-description">{{ event.description }}</p>
            <p class="event-location">{{ event.location }}</p>
        </div>
        <div class="actions">
            <button class="btn" :aria-label="'Buy Ticket for '+event.title" :tabindex="index" @click="buyTicket">
                Buy Ticket
                <img src="../assets/images/shop.svg" alt="Shopping Cart Icon">
            </button>
            <p class="price">{{ event.price }}€</p>
        </div>
    </div>
</template>

<script setup>
import dayjs from 'dayjs'

const emit = defineEmits(['buy-ticket']);

const props = defineProps({
    event: {
        type: Object,
        default: () => {},
        required: true,
    },
    index: {
        type: Number,
        default: 0
    },
});

const buyTicket = () => {
    emit('buy-ticket', props.event);
}

const convertTo12HourFormat = (date, time) => {
    const dateTime = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
    const formattedTime = dateTime.format('h:mm a');

    return formattedTime.replace(/:00 /, ' ');
}

const formatDate = (inputDate) => {
    const date = dayjs(inputDate);
    return `<strong>${date.format('ddd')}</strong>, ${date.format('D')}. ${date.format('MMMM')} ${date.format('YYYY')}`;
}
</script>


<style lang="scss" scoped>
.single-event {
    display: flex;
    gap: 2rem;
    width: 100%;

    @include respond-to('mobile') {
        flex-direction: column;
        gap: 1.5rem;
    }
}

.date {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 18px;
    min-width: 15%;

    @include respond-to('mobile') {
        max-width: 100%;
        flex-direction: row;
    }
}

.event {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.event-name {
    color: $primary-color;
    font-size: 48px;
    font-weight: bold;
    margin: 0;

    @include respond-to('mobile') {
        font-size: 32px;
    }
}

.event-description {
    color: $primary-color;
    font-size: 36px;
    margin: 0;
    padding-right: 1rem;

    @include respond-to('mobile') {
        font-size: 24px;
    }
}

.event-location {
    color: $primary-color;
    font-size: 18px;
    margin: 0;

    @include respond-to('mobile') {
        font-size: 16px;
    }
}

.type-badge {
    background: $primary-color;
    color: $secondary-color;
    font-size: 14px;
    padding: 4px 12px;
    width: fit-content;
}

.actions {
    text-align: -webkit-right;
    min-width: 15%;
    margin-left: auto;

    @include respond-to('mobile') {
        text-align: left;
        margin-left: 0;
    }
}

.price {
    color: $primary-color;
    font-size: 18px;
    margin: 10px 0;

    @include respond-to('mobile') {
        font-size: 16px;
    }
}

.btn {
    position: relative;
    // overflow: hidden;
    background: $primary-color;
    color: $secondary-color;
    font-size: 18px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $primary-color;
    // z-index: 9999;
    transition: .5s;
    &:focus {
        outline: 1px solid $highlight-color;
        outline-offset: 2px;
    }
    // &::before {
    //     background: $highlight-color;
    //     content: "";
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     width: 100%;
    //     height: 0%;
    //     transform: translate(-50%, -50%) rotate(-45deg);
    //     z-index: -1;
    //     transition: all 0.6s ease;
    // }
    &:hover {
        box-shadow: $box-shadow;
        cursor: pointer;
        transition: .5s;
        // &::before {
        //     height: 200%;
        // }
    }

    @include respond-to('mobile') {
        font-size: 16px;
        padding: .75rem 1.25rem;
    }
}
</style>