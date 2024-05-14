<template>
<form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Sign Up</h1>
      <p class="description">Sign up via magic link with your email and password below</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
        <input class="inputField" required type="password" placeholder="Your password" v-model="password" />
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

import { ref } from 'vue';
import { supabase } from '@/stores/supabase';

console.log(supabase)

// const { insert } = await supabase
// .from('Posts')
// .insert({id:1, user_name:'jake'})

// console.log({insert})

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
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