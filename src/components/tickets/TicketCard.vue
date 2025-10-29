<template>
  <div
    class="bg-secondary/20 rounded-lg shadow-md p-6 relative hover:shadow-lg transition-shadow duration-300"
  >
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-xl font-semibold text-secondary flex-1 mr-2">
        {{ ticket.title }}
      </h3>
      <div class="flex gap-2 shrink-0">
        <span
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium uppercase',
            getStatusClasses(ticket.status),
          ]"
        >
          {{ ticket.status.replace("_", " ") }}
        </span>
        <span
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium uppercase',
            getPriorityClasses(ticket.priority),
          ]"
        >
          {{ ticket.priority }}
        </span>
      </div>
    </div>

    <p class="text-foreground mb-4 min-h-12">
      {{ ticket.description || "" }}
    </p>

    <div
      class="flex justify-between items-center pt-4 border-t border-gray-200"
    >
      <span class="text-xs text-foreground/70">
        Created: {{ new Date(ticket.createdAt).toLocaleDateString("en-NG") }}
      </span>
      <span class="text-xs bg-secondary/20 px-1 py-0.5 rounded-md">
        ticket_{{ ticket.id }}
      </span>
      <div class="flex space-x-2">
        <button
          class="px-3 py-1 border border-secondary text-secondary rounded-md hover:bg-primary hover:text-white transition-colors text-sm font-medium cursor-pointer"
          @click="emit('onEdit', ticket)"
        >
          Edit
        </button>
        <button
          class="border border-red-300 px-3 py-1 cursor-pointer text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
          @click="showConfirm = true"
        >
          Delete
        </button>
      </div>
    </div>

    <article
      v-if="showConfirm"
      class="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center bg-black/60"
    >
      <div
        class="bg-secondary bg-opacity-95 rounded-lg flex flex-col items-center justify-center p-6 animate-fade-in min-h-30 w-80 shadow-2xl"
      >
        <p class="text-gray-800 mb-4 text-center">
          Are you sure you want to delete this ticket?
        </p>
        <div class="flex space-x-3">
          <button
            class="px-4 py-2 bg-primary text-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            @click="showConfirm = false"
          >
            Cancel
          </button>
          <button
            class="border px-4 py-2 bg-error text-white rounded-md hover:bg-red-600 transition-colors font-medium"
            @click="handleDelete"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref } from "vue";
// NOTE: Type import removed as it's no longer needed in a JS file.

// === 1. PROPS ===
// The interface and type annotation are removed, leaving a runtime validation object.
const props = defineProps({
  ticket: {
    type: Object, // Best guess for the 'Ticket' object
    required: true,
  },
});

// === 2. EMITS ===
// The type annotation is removed, leaving a runtime declaration array/object.
const emit = defineEmits(["onEdit", "onDelete"]);

// === 3. STATE ===
// Type annotation removed from ref()
const showConfirm = ref(false);

// === 4. METHODS ===

/**
 * Handles the confirmation and emits the onDelete event.
 */
// Type annotation removed from function
const handleDelete = () => {
  // Access the prop value using props.ticket.id
  emit("onDelete", props.ticket.id);
  showConfirm.value = false;
};

/**
 * Returns the Tailwind CSS classes for the ticket status.
 */
// Type annotation removed from function
const getStatusClasses = (status) => {
  switch (status) {
    case "OPEN":
      return "bg-green-100 text-green-900";
    case "IN_PROGRESS":
      return "bg-amber-100 text-amber-900";
    case "CLOSED":
      // Using gray to imply resolution/closure, as green can conflict with OPEN
      return "bg-gray-300 text-gray-800";
    default:
      return "bg-foreground text-gray-600";
  }
};

/**
 * Returns the Tailwind CSS classes for the ticket priority.
 */
// Type annotation removed from function
const getPriorityClasses = (priority) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-error";
    case "MEDIUM":
      return "bg-amber-100 text-amber-950";
    case "LOW":
      return "bg-secondary/60 text-foreground";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
</script>
