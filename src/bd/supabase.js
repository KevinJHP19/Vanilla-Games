
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dgekifitmxoptnyvpprw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZWtpZml0bXhvcHRueXZwcHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMzk1NDcsImV4cCI6MjA1NDcxNTU0N30.yUexRUqIX0XYZYhPRVR0zXRiGeL0eOi8JNOwWoiFciI'
const supabase = createClient(supabaseUrl, supabaseKey)
export { supabase}