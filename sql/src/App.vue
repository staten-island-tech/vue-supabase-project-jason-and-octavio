<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Sign Up</RouterLink>
        <RouterLink to="/about">Sign In</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
