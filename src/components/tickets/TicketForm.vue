<template>
  <article
    class="fixed top-0 left-0 z-50 w-full h-screen bg-primary/70 backdrop-blur-xs flex justify-center items-center"
  >
    <div
      class="max-w-2xl w-full border border-foreground rounded-md px-10 py-3 backdrop-blur-2xl shadow-2xl bg-primary"
    >
      <h2 class="text-2xl font-bold text-foreground text-center mb-6">
        {{ ticket ? "Edit Ticket" : "Create New Ticket" }}
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Title
            <span class="text-error">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            v-model="formData.title"
            @input="handleChange"
            :class="[
              'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
              errors.title ? 'border-error' : 'border-gray-300',
            ]"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-error">
            {{ errors.title }}
          </p>
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Description
            <span class="italic text-foreground/70">(Optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            v-model="formData.description"
            @input="handleChange"
            rows="4"
            :class="[
              'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
              errors.description ? 'border-error' : 'border-gray-300',
            ]"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-error">
            {{ errors.description }}
          </p>
        </div>

        <div>
          <label
            for="status"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Status
            <span class="text-error">*</span>
          </label>
          <select
            id="status"
            name="status"
            v-model="formData.status"
            @change="handleChange"
            :class="[
              'bg-primary/90 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
              errors.status ? 'border-error' : 'border-gray-300',
            ]"
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
          <p v-if="errors.status" class="mt-1 text-sm text-error">
            {{ errors.status }}
          </p>
        </div>

        <div>
          <label
            for="priority"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            v-model="formData.priority"
            @change="handleChange"
            class="bg-primary/90 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-7 pt-4">
          <button
            type="button"
            @click="emit('onCancel')"
            class="border border-secondary text-secondary py-2 px-6 rounded-md hover:bg-secondary/40 cursor-pointer transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-secondary text-foreground py-2 px-6 rounded-md hover:bg-secondary/40 cursor-pointer transition-colors font-medium"
          >
            {{ ticket ? "Update Ticket" : "Create Ticket" }}
          </button>
        </div>
      </form>
    </div>
  </article>
</template>

<script setup>
import { ref, watch } from "vue";
// React's useEffect combined behavior is covered by watch and the initial setup

// === PROPS ===
const props = defineProps({
  ticket: {
    type: Object, // Represents the optional Ticket object for editing
    default: null,
  },
});

// === EMITS ===
const emit = defineEmits(["onSubmit", "onCancel"]);

// === STATE ===
// Replaced useState with ref()
const formData = ref({
  title: "",
  description: "",
  status: "OPEN",
  priority: "LOW",
});

const errors = ref({}); // FormErrors equivalent

// === LIFECYCLE/WATCHER (Replaced useEffect for pre-fill) ===
// Watch the 'ticket' prop, and update formData when it changes
watch(
  () => props.ticket,
  (newTicket) => {
    if (newTicket) {
      formData.value = {
        title: newTicket.title || "",
        description: newTicket.description || "",
        status: newTicket.status || "OPEN",
        priority: newTicket.priority || "LOW",
      };
    }
  },
  { immediate: true } // Run immediately once with the current prop value
);

// === HANDLERS ===
const handleChange = (e) => {
  const { name, value } = e.target;

  // Update formData using ref.value
  formData.value = {
    ...formData.value,
    [name]: value,
  };

  // Clear error for this field
  if (errors.value[name]) {
    errors.value = {
      ...errors.value,
      [name]: undefined, // Clearing the specific error
    };
  }
};

const validate = () => {
  const newErrors = {};

  if (!formData.value.title.trim()) {
    newErrors.title = "Title is required";
  }

  if (!formData.value.status) {
    newErrors.status = "Status is required";
  } else if (
    !["OPEN", "IN_PROGRESS", "CLOSED"].includes(formData.value.status)
  ) {
    newErrors.status = "Status must be one of: open, in_progress, closed";
  }

  if (formData.value.description && formData.value.description.length > 500) {
    newErrors.description = "Description must be less than 500 characters";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  // e.preventDefault() is handled by @submit.prevent in the template

  if (validate()) {
    // Pass a copy of the current form data to the parent component
    emit("onSubmit", formData.value);
  }
};
</script>
