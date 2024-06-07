<!-- <template>
 <div>
    <h2>Your Created Items</h2>
    <div v-if="items.length > 0">
      <div v-for="item in items" :key="item.id">
        <h3>{{ item.give }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <div v-else>
      <p>You haven't created any items yet.</p>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/stores/supabase';

const UserCreatedItems = {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetchUserCreatedItems();
  },
  methods: {
    async fetchUserCreatedItems() {
      try {
        const user = supabase.auth.user();
        if (!user) {
          alert('Please log in first.');
          return;
        }

        const { data, error } = await supabase
          .from('market')
          .select('id, give, description')
          .eq('uuid', user.id);

        if (error) {
          throw error;
        }

        this.items = data;
      } catch (error) {
        console.error('Error fetching user created items:', error.message);
      }
    }
  }
}; -->
<!-- </script> -->

<template>
      <div>
    <h2>Your Created Items</h2>
    <div v-for="item in createdItems" :key="item.id" class="items">
      <h3>Item: {{ item.give }}</h3>
      <p>Description: {{ item.description }}</p>
    </div>
    <button @click="goback">Go Back</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '@/stores/supabase';
import { sessionStore } from '@/stores/session';
import router from '@/router'

const createdItems = ref([]);

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('market').select().eq('uuid', sessionStore().session.id);
    if (error) throw error;
    createdItems.value = data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
});

function goback () {
  router.push('/market')
}

</script>

<style scoped>

h2 {
  text-align: center;
}
h3 {
  text-align: center;
}
.items {
    background-color: cadetblue;
}


</style>

