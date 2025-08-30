import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function uploadCertification(
  file: File, 
  userId: string, 
  role: string
): Promise<string | null> {
  try {
    console.log('Starting file upload:', { fileName: file.name, fileSize: file.size, userId, role })
    
    // Validate file
    if (!file || file.size === 0) {
      console.error('Invalid file provided')
      return null
    }

    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      console.error('File too large:', file.size)
      return null
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase()
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileName = `${userId}_${timestamp}_${randomString}.${fileExt}`
    const filePath = `certifications/${role.toLowerCase()}/${fileName}`

    console.log('Uploading to path:', filePath)

    // Convert File to ArrayBuffer for better compatibility
    const fileBuffer = await file.arrayBuffer()
    
    const { data, error } = await supabase.storage
      .from('user-documents')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return null
    }

    console.log('Upload successful:', data)

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-documents')
      .getPublicUrl(data.path)

    console.log('Public URL generated:', publicUrl)
    return publicUrl

  } catch (error) {
    console.error('File upload error:', error)
    return null
  }
}