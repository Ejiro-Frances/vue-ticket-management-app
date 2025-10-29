<template>
  <div>
    <DashboardHeader />
    <main class="mt-30 px-5 md:px-7">
      <section>
        <h1
          class="text-xl md:text-3xl text-foreground font-bold tracking-wide mb-3 mt-50 md:mt-0"
        >
          Ticket Management
        </h1>
        <p class="text-foreground">
          Create, view, edit and manage all your tickets
        </p>

        <button
          class="fixed top-30 right-10 bg-secondary text-white py-2 px-6 rounded-md hover:bg-primary-hover transition-colors font-medium"
          @click="openCreateForm"
        >
          Create New Ticket
        </button>
      </section>

      <TicketForm
        v-if="showForm"
        :ticket="selectedTicket"
        @onSubmit="handleCreateOrUpdate"
        @onCancel="closeForm"
      />

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
        />
        <p
          v-if="tickets.length === 0"
          class="col-span-full text-center text-foreground"
        >
          No tickets found. Click "Create New Ticket" to get started!
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardHeader from "../components/shared/DashboardHeader.vue";
import TicketForm from "../components/tickets/TicketForm.vue";
import TicketCard from "../components/tickets/TicketCard.vue";
// Assuming this utility is the plain JS version from previous conversions
import { createTicket } from "../utils/ticketservice.js";

// Import a toast utility (assuming a library like vue-toastification or similar)
// For simplicity, we'll use a simple console log placeholder for 'toast'
const toast = {
  success: (message) => console.log(`SUCCESS: ${message}`),
  error: (message) => console.error(`ERROR: ${message}`),
};

const showForm = ref(false);
const tickets = ref([]);
const selectedTicket = ref(null); // Holds the ticket object if editing

// === LIFECYCLE (Replaced useEffect for initial load) ===
onMounted(() => {
  const stored = localStorage.getItem("tickets");
  if (stored) {
    tickets.value = JSON.parse(stored);
  }
});

// === HELPER FUNCTION ===
const saveTicketsToLocalStorage = (updatedTickets) => {
  localStorage.setItem("tickets", JSON.stringify(updatedTickets));
};

// === HANDLERS ===

const openCreateForm = () => {
  selectedTicket.value = null; // Ensure we are creating, not editing
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  selectedTicket.value = null; // Reset selected ticket on cancel/close
};

const handleDelete = (id) => {
  const updated = tickets.value.filter((t) => t.id !== id);
  tickets.value = updated;
  saveTicketsToLocalStorage(updated);
  toast.success("Ticket deleted successfully.");
};

const handleEdit = (ticket) => {
  selectedTicket.value = ticket;
  showForm.value = true;
};

// ✅ Create or update ticket dynamically
const handleCreateOrUpdate = (data) => {
  if (selectedTicket.value) {
    // 1. Editing existing ticket
    const updatedTickets = tickets.value.map((t) =>
      // Check for ID and merge new data
      t.id === selectedTicket.value.id
        ? { ...t, ...data, updatedAt: new Date().toISOString() }
        : t
    );
    tickets.value = updatedTickets;
    saveTicketsToLocalStorage(updatedTickets);
    toast.success("Ticket updated successfully");
  } else {
    // 2. Creating new ticket
    // NOTE: We assume createTicket handles the ID/timestamp, but we need
    // to call it and ensure it also saves to localStorage or update our logic here.
    // Given the React code called createTicket and then updated localStorage here,
    // we'll stick to the Vue state update here and re-save the array.

    // We'll use a local function equivalent to the previous 'createTicket' function
    // to get a new ID and timestamps for the new ticket object.
    const generateId = () => Date.now();
    const newTicket = {
      id: generateId(),
      title: data.title,
      description: data.description ?? "",
      status: data.status,
      priority: data.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTickets = [...tickets.value, newTicket];
    tickets.value = updatedTickets;
    saveTicketsToLocalStorage(updatedTickets);
    toast.success("Ticket created successfully");
  }

  // Close and reset form
  closeForm();
};
</script>
