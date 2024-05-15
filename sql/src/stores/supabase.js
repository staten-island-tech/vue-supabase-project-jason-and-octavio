import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://shoxgvzvnshjjblidrda.supabase.co'
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNob3hndnp2bnNoampibGlkcmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjMxNTgsImV4cCI6MjAyNzg5OTE1OH0.5Ixgcj16B0S8pklU2ZSUZRrVCjXvrY6EBbULeXOpr5Y"

export const supabase = createClient(supabaseUrl, supabasekey);