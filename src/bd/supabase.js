
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://mpdauguwzeydzpotbnrf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wZGF1Z3V3emV5ZHpwb3RibnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzE0NTAsImV4cCI6MjA1NzIwNzQ1MH0.xr8T_4LXwOsXuYJOeAmF1Wr0I6LfbG2BYuW4v-hajdM'
export const supabase = createClient(supabaseUrl, supabaseKey)
// Mostramos por consola la conexión establecida
console.log('conexión', supabase)






