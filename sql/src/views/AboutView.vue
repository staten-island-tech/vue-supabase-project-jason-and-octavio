<template>
  <div>
    <div v-for="item in currentMarket">
      <h2>Giving: {{ item.give }}</h2>
      <h2>Want: {{ item.want }}</h2>
      <button @click="acceptTrade(item)">Accept</button>
    </div>
  </div>

  <button @click="createTrade">Create new trade</button>
</template>

<script setup>
import Accounts from '@/components/Accounts.vue';
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

async function acceptTrade (item) {
  try {
    const { error } = await supabase.from("market").delete().eq("want", item.want).eq("give", item.give)
    if (error) throw error
    const index = currentMarket.value.findIndex((item2) => item2.want == item.want && item2.give == item.give)
    currentMarket.value.splice(index, 1)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }

}

</script>

<style lang="scss" scoped>

</style>