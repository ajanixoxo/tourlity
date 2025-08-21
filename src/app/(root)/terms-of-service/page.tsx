import CTA from '@/components/landing/cta'
import TOS_Content from '@/components/terms-of-service/content'
import TOS_Hero from '@/components/terms-of-service/hero'
import React from 'react'

function TermsOfService() {
  return (
    <div>
        <TOS_Hero/>
        <TOS_Content/>
        <CTA/>
    </div>
  )
}

export default TermsOfService