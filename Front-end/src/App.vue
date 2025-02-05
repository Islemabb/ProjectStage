<template>
  <div id="app">
    <Navbar />
    <div class="content">
      <!-- This is where the routed components will be injected -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
/* Global styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
}

.content {
  margin-top: 90px; /* Space between navbar and routed content */
}
</style>
