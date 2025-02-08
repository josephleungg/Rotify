'use client'
import { useRouter } from "next/navigation";
import Image from "next/image";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {

    const router = useRouter();
    
    const handleLogoClick = () => {
        router.push('/');
    }
    return (
        <div className="flex flex-row justify-between items-center pt-4 w-full bg-background">
            {/* Logo and Title */}
            <div className="flex hover:opacity-70 transition-all items-center gap-2 ml-8 my-4 cursor-pointer "
                onClick={handleLogoClick}>
                <Image
                    src="/rotify-logo.png"
                    alt="Rotify Logo"
                    width={72}
                    height={16}
                    className="relative"
                />
                <h1 className="text-[#B1A6C0] font-jaro text-3xl">Rotify</h1>
            </div>
            {/* Search input */}
            <div>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border-2 border-[#1A1D2D] bg-[#1A1D2D] py-2 px-4 text-textGray font-monomaniac text-[20px] rounded-l-2xl w-[45vw] outline-none placeholder:text-textGray placeholder:font-monomaniac placeholder:text-[20px] placeholder:text-opacity-50"
                    />
                    <div>
                        <button className="bg-[#414558] h-[50px] px-8 flex flex-col justify-center items-center rounded-r-2xl cursor-pointer hover:opacity-80 transition-all">
                            <FontAwesomeIcon icon={faSearch} className="h-8 w-8 text-[#676976]" />
                        </button>
                    </div>
                </div>
            </div>
            {/* New button */}
            <div>
                <div className="mr-12">
                <button className="flex flex-row gap-2 bg-[#685680] h-[50px] px-4 justify-center items-center rounded-3xl cursor-pointer hover:scale-105 transition-all">
                    <h1 className="flex text-[#B1A6C0] font-jaro text-3xl">New</h1>
                    <FontAwesomeIcon icon={faPlus} className="flex h-6 w-6 text-[#B1A6C0]" />
                </button>
                </div>
            </div>
        </div>
    )
};
export default Navbar