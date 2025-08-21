// Create a separate client component: components/root/footer_wrapper.tsx
'use client'
import { usePathname } from 'next/navigation'
import Footer from './footer'
import DarkFooter from './dark-footer'

const FooterWrapper = () => {
    const pathname = usePathname()
    
    // Check if the current route should use dark footer
    const shouldUseDarkFooter = pathname === '/cookies' || pathname === '/terms-of-service'
    
    return shouldUseDarkFooter ? <DarkFooter /> : <Footer />
}

export default FooterWrapper