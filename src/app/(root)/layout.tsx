import Navbar from "@/components/root/root_navbar"

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full px-4 py-2'>

            <div className='relative  '>
                <Navbar />
            </div>
            <div className=''>
                {children}
            </div>

        </div>
    )
}

export default LayoutPage
