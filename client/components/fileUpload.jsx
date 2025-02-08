import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"

export default function FileUpload() {

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className=" font-monomaniac text-textGray text-md py-4">
                Drop a file (ex. PDF, Slideshow, Article) we'll transform it into an immersive, interactive video
            </h1>
            <div className="bg-[#414556] h-[150px] w-[150px] flex flex-col justify-center items-center rounded-xl cursor-pointer">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="h-[80px] w-auto text-background"/>
            </div>
            <div className="bg-[#685680] h-[40px] w-[150px] flex flex-col justify-center items-center rounded-lg cursor-pointer mt-12">
                <h1 className="text-[#B1A6C0] font-jaro text-2xl">Generate</h1>
            </div>
        </div>
    )
}