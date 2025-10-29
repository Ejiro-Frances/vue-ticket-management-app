<template>
  <header
    data-testid="test-header"
    aria-label="Main site header"
    class="fixed left-0 top-0 w-full z-50 h-20 flex justify-between items-center px-5 bg-primary text-foreground"
  >
    <!-- Logo / Brand -->
    <RouterLink
      to="/"
      data-testid="test-logo"
      aria-label="Ticket Zen home"
      class="bg-secondary rounded-md px-2 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
    >
      Ticket Zen
    </RouterLink>
    <!-- Navigation -->
    <nav data-testid="test-nav" role="navigation" aria-label="Main navigation">
      <ul data-testid="test-nav-links" class="flex gap-7">
        <!-- Login link -->
        <li>
          <RouterLink
            to="/auth/login"
            data-testid="test-nav-login"
            :aria-current="$route.path === '/auth/login' ? 'page' : undefined"
            class="cursor-pointer border border-transparent hover:border-foreground py-2 px-5 rounded-md transition-all duration-150 ease-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          >
            Login
          </RouterLink>
        </li>

        <!-- Signup link -->
        <li>
          <RouterLink
            to="/auth/signup"
            data-testid="test-nav-signup"
            :aria-current="$route.path === '/auth/signup' ? 'page' : undefined"
            class="bg-foreground hover:bg-foreground/90 cursor-pointer text-primary px-5 py-2 rounded-md transition-all duration-150 ease-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          >
            Get Started
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>
