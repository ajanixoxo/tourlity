
import SignUpContent from '@/components/auth/sign-up/content'
import React from 'react'
import { UnauthenticatedOnly } from '@/components/auth/ProtectedRoute'

function SignUp() {
  return (
    <UnauthenticatedOnly>
      <div>
        <SignUpContent />
      </div>
    </UnauthenticatedOnly>
  )
}

export default SignUp