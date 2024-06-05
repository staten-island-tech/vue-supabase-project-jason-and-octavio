<template>
    <div>
        <h2>You are giving:</h2>
        <div>
            <input type="text" placeholder="Type to add item" v-model="giveItem">
            <input type="file" @change="onFileChange" accept="image/*">
        </div>
    </div>

    <button @click="createOffer">Create offer</button>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { sessionStore } from '@/stores/session';
import { items } from '@/stores/items';
import { supabase } from '@/stores/supabase';
import router from '@/router';

const giveItem = ref("")

onMounted(() => {
    if (sessionStore().session.id == "") {
        router.push('/')
    }
})

async function createOffer () {
    if (!giveItem) return

    try {
        const { error } = await supabase.from('market').insert({
      uuid: sessionStore().session.id,
      give: giveItem.value,
    })
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        }
    }

    router.push('/market')
}

</script>

<style scoped>

</style>