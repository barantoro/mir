<template>
    <div class="list-wrapper" v-if="events.length > 0">
        <div class="single-event" v-for="(event, index) in events" :key="event.id">
            <div class="date">
                    <span v-html="formatDate(event.date)" aria-label="Event date"></span>
                    <strong class="time" aria-label="Event time">{{ convertTo12HourFormat(event.time) }}</strong>
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
                <button class="btn" :aria-label="'Buy Ticket for '+event.title" :tabindex="index">
                    Buy Ticket
                    <img src="../assets/images/shop.svg" alt="Shopping Cart Icon">
                </button>
                <p class="price">{{ event.price }}€</p>
            </div>
        </div>
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
defineProps(['events']);

const convertTo12HourFormat = (time24) => {
    let [hours, minutes] = time24.split(':').map(Number);

    let period = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; //

    return `${hours}${minutes > 0 ? ':' + minutes.toString().padStart(2, '0') : ''} ${period}`;
}

const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split('-').map(Number);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    const date = new Date(year, month - 1, day);
    const dayName = days[date.getDay()];

    const monthName = months[month - 1];

    return `<strong>${dayName}</strong>, ${day}. ${monthName} ${year}`;
}
</script>

<style scoped>
.list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4rem;
}
.single-event {
    display: flex;
    gap: 2rem;
    width: 100%;
}
.date {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 18px;
    min-width: 15%;
}
.event {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.event-name {
    color: #000;
    font-size: 48px;
    font-weight: bold;
    margin: 0px;
}
.event-description {
    color: #000;
    font-size: 36px;
    margin: 0;
    padding-right: 1rem;
}
.event-location {
    color: #000;
    font-size: 18px;
    margin: 0;
}
.type-badge {
    background: #000;
    color: #fff;
    font-size: 14px;
    padding: 4px 12px;
    width: fit-content;
}
.actions {
    text-align: -webkit-right;
    min-width: 15%;
}
.price {
    color: #000;
    font-size: 18px;
    margin: 10px 0px;
}
.btn {
    position: relative;
    overflow: hidden;
    background: #000;
    color: #fff;
    font-size: 18px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #000;
    z-index: 9999;
}
.btn:focus {
    /* Accessible focus and keyboard interaction */
    outline: 1px solid #36454F;
    outline-offset: 2px;
}
.btn::before{
  background: #36454F;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 0%;
  transform: translate(-50%,-50%) rotate(-45deg);
  z-index: -1;
  transition: all 0.6s ease;
}
.btn:hover {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, .2);
    cursor: pointer;
}
.btn:hover::before{
  height: 200%;
}
.no-data h3 {
    font-size: 36px;
}
.no-data p {
    font-size: 18px;
    line-height: 1.5;
}

/* Mobile */
@media (max-width: 576px) {
    .list-wrapper {
        gap: 2.5rem;
    }
    .single-event {
        flex-direction: column;
        gap: 1.5rem;
    }
    .date {
        max-width: 100%;
        flex-direction: row;
    }
    .event-name {
        font-size: 32px;
    }
    .event-description {
        font-size: 24px;
    }
    .event-location {
        font-size: 16px;
    }
    .actions {
        text-align: left;
    }
    .btn {
        font-size: 16px;
        padding: .75rem 1.25rem;
    }
    .price {
        font-size: 16px;
    }
    .no-data h3 {
        font-size: 24px;
    }
    .no-data p {
        font-size: 14px;
    }
}
</style>
