<template>
  <div class="flex flex-col items-center">
    <DashboardHeader />

    <main class="flex-1 w-full max-w-[1440px] mx-auto mt-20 px-6 py-10">
      <h2 class="text-xl font-semibold mb-6">Summary Statistics</h2>

      <article class="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div class="bg-secondary/20 shadow p-6 rounded-lg text-center">
          <div
            class="w-16 h-16 rounded-full bg-secondary/50 text-secondary flex items-center justify-center mr-4 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              ></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-foreground/80">Total Tickets</h3>
          <p class="text-3xl font-bold text-secondary mt-2">
            {{ totalTickets }}
          </p>
        </div>

        <div class="bg-secondary/20 shadow p-6 rounded-lg text-center">
          <div
            class="w-16 h-16 rounded-full bg-green-100 text-green-950 flex items-center justify-center mr-4 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-foreground/80">Open Tickets</h3>
          <p class="text-3xl font-bold text-green-500 mt-2">
            {{ openTickets }}
          </p>
        </div>

        <div class="bg-secondary/20 shadow p-6 rounded-lg text-center">
          <div
            class="w-16 h-16 rounded-full bg-amber-100 text-amber-950 flex items-center justify-center mr-4 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-foreground">In Progress</h3>
          <p class="text-3xl font-bold text-amber-500 mt-2">
            {{ inProgressTickets }}
          </p>
        </div>

        <div class="bg-secondary/20 shadow p-6 rounded-lg text-center">
          <div
            class="w-16 h-16 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center mr-4 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-foreground">Closed Tickets</h3>
          <p class="text-3xl font-bold text-gray-500 mt-2">
            {{ closedTickets }}
          </p>
        </div>
      </article>

      <div class="flex justify-center mt-10">
        <RouterLink
          to="/tickets"
          class="border border-secondary py-2 px-4 rounded-md text-secondary hover:bg-secondary/20 font-medium hover:text-secondary/90 cursor-pointer transition ease-in"
        >
          Manage Tickets
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
// Import the converted Vue version of the header
import DashboardHeader from "../components/shared/DashboardHeader.vue";
// Import the converted JavaScript utility function
import { getTickets } from "../utils/ticketservice.js";

// === STATE ===
// Replaced useState with ref()
const tickets = ref([]);

// === LIFECYCLE HOOK ===
// Replaced useEffect with onMounted()
onMounted(() => {
  const stored = getTickets();
  tickets.value = stored; // Update the ref's value
});

// === DERIVED STATE / COMPUTED PROPERTIES ===
// Replaced derived variables with computed properties for reactivity
const totalTickets = computed(() => tickets.value.length);

const openTickets = computed(
  () => tickets.value.filter((t) => t.status === "OPEN").length
);

const inProgressTickets = computed(
  () => tickets.value.filter((t) => t.status === "IN_PROGRESS").length
);

const closedTickets = computed(
  () => tickets.value.filter((t) => t.status === "CLOSED").length
);
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
