<template>
    <div>
        <h2>You want: {{ wantItemChose?.name }}</h2>
        <img :src="wantItemChose?.img" :alt="'Image of '+ wantItemChose?.name">
        <div>
            <h2>Choices</h2>
            <h3>Click to select</h3>
            <div v-for="item in items" @click="wantItemChose = item">
                <h3>{{ item.name }}</h3>
                <img :src="item.img" :alt="'Image of ' + item.name">
            </div>
        </div>
    </div>

    <div>
        <h2>You are giving: {{ giveItemChose?.name }}</h2>
        <img :src="giveItemChose?.img" :alt="'Image of '+ giveItemChose?.name">
        <div>
            <h2>Choices</h2>
            <h3>Click to select</h3>
            <div v-for="item in items" @click="giveItemChose = item">
                <h3>{{ item.name }}</h3>
                <img :src="item.img" :alt="'Image of ' + item.name">
            </div>
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

const wantItemChose = ref()
const giveItemChose = ref()

onMounted(() => {
    if (sessionStore().session.id == "") {
        router.push('/')
    }
})

async function createOffer () {
    if (!wantItemChose || !giveItemChose) return

    try {
        const { error } = await supabase.from('market').insert({
      uuid: sessionStore().session.id,
      give: giveItemChose.value.name,
      want: wantItemChose.value.name
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