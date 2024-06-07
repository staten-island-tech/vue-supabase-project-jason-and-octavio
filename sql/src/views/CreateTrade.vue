<template>
    <div>
        <h2>You are giving:</h2>
        <div>
            <input type="text" placeholder="Type to add item" v-model="giveItem">
            <!-- <input type="file" @change="onFileChange" accept="image/*">
            <img :src="imageData" alt="Upload Image"> -->
            <input type="text" placeholder="Type to add description" v-model="descriptionitem" />
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
const descriptionitem = ref("")

onMounted(() => {
    if (sessionStore().session.id == "") {
        router.push('/')
    }
})

async function createOffer () {
    if (!giveItem.value || !descriptionitem.value) return

    try {
        const { error } = await supabase.from('market').insert({
      uuid: sessionStore().session.id,
      give: giveItem.value,
      description: descriptionitem.value,
    })
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        }
    }

    router.push('/market')
}

// export default {
//   setup() {
//     const imageData = ref(null);

//     const onFileChange = (event) => {
//       const file = event.target.files[0];
//       if (file && file.type.startsWith('image/')) {
//         loadImage(file);
//       } else {
//         alert('Please upload a valid image file.');
//       }
//     };

//     const loadImage = (file) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         imageData.value = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     };

//     return {
//       imageData,
//       onFileChange
//     };
//   }
// };
</script>

<style scoped>

</style>