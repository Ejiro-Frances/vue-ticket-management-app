<template>
  <!-- <div> -->
  <!-- <nav class="p-4 bg-primary text-white flex gap-4"> -->
  <!-- <RouterLink to="/">Home</RouterLink> -->
  <!-- <RouterLink to="/tickets">Tickets</RouterLink> -->
  <!-- <RouterLink to="/login">Login</RouterLink> -->
  <!-- </nav> -->

  <!-- Active page -->
  <RouterView />
  <!-- </div> -->
</template>

<script setup lang="ts"></script>

<style scoped>
nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
