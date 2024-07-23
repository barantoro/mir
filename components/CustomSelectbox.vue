<template>
    <div class="custom-select" role="listbox" :aria-expanded="dropdownOpen" tabindex="0" @keydown="handleKeydown">
        <!-- Selected option display -->
        <div class="select-selected" @click="toggleDropdown" aria-haspopup="listbox" aria-labelledby="select-label">
            {{ selectedOption ? selectedOption : label }}
            <span class="arrow" :class="{ open: dropdownOpen }">
                <img src="../assets/images/chevron-down.svg" alt="Dropdown Arrow">
            </span>
        </div>
        <!-- Dropdown items -->
        <Transition name="slide-fade">
        <div class="select-items" v-show="dropdownOpen" role="listbox">
            <div 
                role="option"
                class="select-item" 
                @click="selectOption('')"
            >
              All {{ label }}
            </div>
            <div 
                v-for="option in options" 
                :key="option" 
                role="option"
                :aria-selected="selectedOption === option ? 'true' : 'false'"
                class="select-item" 
                @click="selectOption(option)"
            >
              {{ option }}
            </div>
        </div>
        </Transition>
        <div class="backdrop" v-if="dropdownOpen && isMobile" @click="dropdownOpen = false"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    options: {
        type: Array,
        default: () => [],
        required: true,
    },
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: 'Select an option'
    }
});

const emit = defineEmits(['update:modelValue']);

const dropdownOpen = ref(false);
const selectedOption = ref(props.options.find(option => option === props.modelValue) || null);

const isMobile = ref(false)

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 576
}

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const selectOption = (option) => {
    selectedOption.value = option;
    emit('update:modelValue', option);
    dropdownOpen.value = false;
};

const handleClickOutside = (event) => {
    if (!event.target.closest('.custom-select')) {
        dropdownOpen.value = false;
    }
};

const handleKeydown = (event) => {
    const currentIndex = props.options.indexOf(selectedOption.value);
    
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (currentIndex < props.options.length - 1) {
            selectedOption.value = props.options[currentIndex + 1];
        } else {
            selectedOption.value = props.options[0];
        }
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (currentIndex > 0) {
            selectedOption.value = props.options[currentIndex - 1];
        } else {
            selectedOption.value = props.options[props.options.length - 1]; 
        }
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (dropdownOpen.value) {
            selectOption(selectedOption.value);
        } else {
            toggleDropdown();
        }
    } else if (event.key === 'Escape') {
        event.preventDefault();
        dropdownOpen.value = false;
    }
};

onMounted(() => {
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', checkIfMobile)
});
</script>

<style lang="scss" scoped>
.custom-select {
  width: 170px;

  &:focus-visible {
    border: 1px solid $highlight-color;
    border-bottom: none;
    outline: none;
  }

  .select-selected {
    padding: 6px 12px;
    cursor: pointer;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid;
    font-size: 18px;
  }

  .arrow {
    display: flex;
    transition: transform $transition-duration ease;
    &.open {
      transform: rotate(180deg);
    }
  }

  .select-items {
    position: absolute;
    background-color: $secondary-color;
    box-shadow: $box-shadow;
    margin-top: 1px;
    z-index: 99999;
    width: 100%;
    max-width: 450px;
    font-size: 18px;

    .select-item {
      padding: 18px;
      cursor: pointer;
      transition: 0.5s;
      &:hover,
      &:focus {
        background-color: #ddd;
        transition: 0.5s;
      }
    }
  }

  @include respond-to('mobile') {
    width: 130px;

    .select-selected {
      padding: 8px 12px;
      font-size: 12px;
    }

    .select-items {
      width: 100%;
      max-width: 100%;
      bottom: 0;
      left: 0;
      font-size: 14px;
      position: fixed;
      padding: 12px 4px;

      .select-item {
        padding: 8px;
      }
    }
  }
}

.backdrop {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}

.slide-fade-enter-active {
  transition: all $transition-duration ease-out;
}

.slide-fade-leave-active {
  transition: all $transition-duration ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(0px);
  opacity: 0;
}

@include respond-to('mobile') {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(200px);
  }
}
</style>
