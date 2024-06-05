<template>
    <div>
        <h2>You are giving:</h2>
        <div>
            <input type="text" placeholder="Type to add item" v-model="giveItem">
        </div>
                <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image"
      :style="{ height: size + 'em', width: size + 'em' }"
    />
        </div>
        <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
    
    <button @click="createOffer">Create offer</button>
</template>

<script setup>


import { onMounted, ref, render, watch, toRefs } from 'vue';
import { sessionStore } from '@/stores/session';
import { supabase } from '@/stores/supabase';
import router from '@/router';

const prop = defineProps(['path', 'size'])
const { path, size } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

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

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

watch(path, () => {
  if (path.value) downloadImage()
})

</script>

<style scoped>

</style>