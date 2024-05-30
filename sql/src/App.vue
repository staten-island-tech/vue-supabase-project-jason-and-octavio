<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import Accounts from '@/components/Accounts.vue'
import SignUp from '@/components/SignUp.vue'
import { supabase } from '@/stores/supabase'

const session = ref()

onMounted(() => {
  supabase.SignUp.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.SignUp.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <div class="container" style="padding: 50px 0 100px 0">
    <Accounts v-if="session" :session="session" />
    <SignUp v-else />
  </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
