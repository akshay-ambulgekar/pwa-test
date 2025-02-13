import Link from 'next/link';


function StoreNavbar()
{
    return(
        <>
        <nav className={"flex items-center absolute top-7 left-6 z-[1] " }>
            <div className="flex items-cnter gap-4">
                <h3 className="heading-h3 custom-text-white">Store</h3>
                <div className="h-7 border w-[1px]"></div>
            </div>
            <div className="flex items-center gap-4 overflow-x-scroll">
                <Link href='/' className='flex-shrink-0'><div className="all-caps-10-bold custom-text-white pl-4">CyberPUNK</div></Link>
                <Link href='/' className='flex-shrink-0'><div className="all-caps-10 custom-text-white ">MAGMA</div></Link>
                <Link href='/' className='flex-shrink-0'><div className="all-caps-10 custom-text-white ">EthiKz</div></Link>


            </div>
        </nav>
        </>
    );
}

export default StoreNavbar;