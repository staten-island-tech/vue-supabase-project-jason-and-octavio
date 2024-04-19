<template>
<form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
        </div>
        </div>
</form>
</template>

<script setup>

import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

const supabaseUrl = 'https://shoxgvzvnshjjblidrda.supabase.co'
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNob3hndnp2bnNoampibGlkcmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjMxNTgsImV4cCI6MjAyNzg5OTE1OH0.5Ixgcj16B0S8pklU2ZSUZRrVCjXvrY6EBbULeXOpr5Y"

const supabase = createClient(supabaseUrl, supabasekey);

console.log(supabase)

// const { insert } = await supabase
// .from('Posts')
// .insert({id:1, user_name:'jake'})

// console.log({insert})

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>

</style>