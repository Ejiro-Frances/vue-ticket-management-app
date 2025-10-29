<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
// Assuming you have 'lucide-vue-next' or similar for icons
// Replace with your actual icon imports if different
import { Menu, X } from "lucide-vue-next";

// Initialize the router
const router = useRouter();

// State for the mobile menu
const menuOpen = ref(false);

/**
 * Handles the user logout process.
 * Clears local storage and redirects to the login page.
 */
const handleLogout = () => {
  // Clear authentication state from local storage
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("currentUser");

  // Navigate the user to the login route
  router.push("/auth/login");
};

/**
 * Closes the mobile menu.
 * Used after clicking a navigation link or the logout button.
 */
const closeMenu = () => {
  menuOpen.value = false;
};

/**
 * Toggles the mobile menu open/closed state.
 */
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-20 z-50 border-b border-secondary backdrop-blur-2xl shadow-md"
  >
    <div
      class="max-w-[1440px] mx-auto h-full flex items-center justify-between px-5"
    >
      <RouterLink to="/dashboard" class="text-2xl font-bold text-secondary">
        Ticket Zen
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8 text-secondary">
        <RouterLink
          to="/dashboard"
          class="text-lg font-medium hover:text-bprimary transition"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          to="/tickets"
          class="text-lg font-medium hover:text-bprimary transition"
        >
          Ticket Management
        </RouterLink>

        <button
          @click="handleLogout"
          class="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition"
        >
          Logout
        </button>
      </nav>

      <button
        class="md:hidden text-secondary"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <component :is="menuOpen ? X : Menu" :size="28" />
      </button>
    </div>

    <div
      v-if="menuOpen"
      class="md:hidden absolute top-20 left-0 w-full bg-white border-t border-secondary shadow-lg"
    >
      <nav class="flex flex-col items-center gap-4 py-4 text-secondary">
        <RouterLink
          to="/dashboard"
          @click="closeMenu"
          class="text-lg font-medium hover:text-bprimary transition"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          to="/tickets"
          @click="closeMenu"
          class="text-lg font-medium hover:text-bprimary transition"
        >
          Ticket Management
        </RouterLink>

        <button
          @click="
            handleLogout();
            closeMenu();
          "
          class="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition"
        >
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>
