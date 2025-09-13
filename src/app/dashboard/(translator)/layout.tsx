import React from 'react'
import { TranslatorOnly } from "@/components/auth/ProtectedRoute"
function TranslatorLayout({ children }: { children: React.ReactNode }) {
    return (
        <TranslatorOnly>{children}</TranslatorOnly>
    )
}

export default TranslatorLayout