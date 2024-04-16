<template>
  <div>

  </div>
</template>

<script setup>


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://shoxgvzvnshjjblidrda.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNob3hndnp2bnNoampibGlkcmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjMxNTgsImV4cCI6MjAyNzg5OTE1OH0.5Ixgcj16B0S8pklU2ZSUZRrVCjXvrY6EBbULeXOpr5Y"
const supabase = createClient(supabaseUrl, supabaseKey)

console.log(supabase)

const { insert } = await supabase
.from('Posts')
.insert({id:1, user_name:'jake'})

console.log({insert})

const { data } = await supabase.auth.signUp({
  email: 'example@gmail.com',
})

console.log({data})
</script>

<style lang="scss" scoped>

</style>