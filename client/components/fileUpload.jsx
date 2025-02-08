import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"

export default function FileUpload({ urlButton, backButton }) {

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className=" font-monomaniac text-textGray text-md ">
                Drop a file (ex. PDF, Slideshow, Article) we'll transform it into an immersive, interactive video
            </h1>
            <div className="bg-[#414556] h-[150px] w-[150px] flex justify-center items-center rounded-xl cursor-pointer">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="h-[80px] w-auto text-background"/>
            </div>
            <div className="flex flex-row gap-8">
                <div className="bg-[#685680] h-[50px] flex px-8 justify-center items-center rounded-lg cursor-pointer hover:scale-95 transition-all">
                    <h1 className="text-[#B1A6C0] font-jaro text-3xl">Generate</h1>
                </div>
                <div 
                    className="bg-transparent border-[2px] border-[#B1A6C0] h-[50px] px-8 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:scale-95 transition-all"
                    onClick={backButton}
                >
                    <h1 className="text-[#685680] font-jaro text-3xl">Back</h1>
                </div>
            </div>
            
        </div>
    )
}