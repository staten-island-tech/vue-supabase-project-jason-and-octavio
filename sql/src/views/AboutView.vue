<template>
  <div>
    <div v-for="item in currentMarket" class="items">
      <h2>Item: {{ item.give }}</h2>
      <h3>{{ item.description }}</h3>
      <img :src="item.imageUrl" alt="Item Image" v-if="item.imageUrl" class="img"> <!-- Display image if URL exists -->
    </div>
  </div>
  
  <button @click="createItem">Create new trade</button>
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

function createItem () {
  router.push('/create-trade')
}

function checkProfile () {
  router.push('/check-profile')
}
</script>

<style scope>

h2 {
  text-align: center;
}
h3 {
  text-align: center;
}
.items {
  background-color: cadetblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2vh;
  justify-content: space-evenly;
  border-radius: 5%;
  width: 40%;
  height: 80vh;
  align-content: center;
  padding-left: 50%;
  padding-right: 50%;
  padding-bottom: 10%;
}
body {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-bottom: 2vh;
  justify-content: space-evenly;
  border-radius: 5%;
  width: 40%;
  align-content: center;
}
.img {
  height: 50%;
  width: 50%;
}

</style>