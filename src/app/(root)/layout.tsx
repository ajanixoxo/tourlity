import Navbar from "@/components/root/root_navbar"
import FooterWrapper from '@/components/root/footer_wrapper'

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full px-4 lg:px-7 pt-2'>
            <div className='lg:px-6'>
                <Navbar />
            </div>
            <div className='px-2 lg:px-7 py-2'>
                {children}
            </div>
            <div className='lg:px-6'>
                <FooterWrapper />
            </div>
        </div>
    )
}

export default LayoutPage