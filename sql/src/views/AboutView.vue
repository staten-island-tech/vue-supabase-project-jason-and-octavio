<template>
  <div>
    <div v-for="item in currentMarket">
      <h2>Item: {{ item.give }}</h2>
      <h3>{{ item.description }}</h3>
      <h3>{{ item.price }}</h3>
      <button @click="acceptTrade(item)">Purchase</button>
    </div>
  </div>
  
  <button @click="createTrade">Create new trade</button>
  <button @click="checkProfile">Check Profile</button>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '@/stores/supabase';
import router from '@/router'
import { sessionStore } from '@/stores/session';

const currentMarket = ref([])

onMounted(async () => {
  if (sessionStore().session.id == "") {
    router.push('/')
  }

  try {
    const { data, error } = await supabase.from('market').select()
    if (error) throw error

    currentMarket.value = data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
})

function createTrade () {
  router.push('/create-trade')
}

function checkProfile () {
  router.push('/check-profile')
}

</script>

<style lang="scss" scoped>

</style>