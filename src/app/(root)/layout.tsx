import Navbar from "@/components/root/root_navbar"

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full px-4 lg:px-7 py-2'>

            <div className='  '>
                <Navbar />
            </div>
            <div className='px-2 lg:px-7 py-2'>
                {children}
            </div>

        </div>
    )
}

export default LayoutPage
