import react from "react";

const UrlField = ({ urlButton, fileUploadButton, backButton }) => {

    return (
        <>
            <div className="flex flex-col gap-16 items-center justify-center">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <p className="font-monomaniac text-textGray">
                        Drop a link to any website or article, and we'll transform it into an immersive, interactive video
                    </p>
                    <input
                        type="text"
                        placeholder="Enter URL"
                        className="border-2 border-[#1A1D2D] bg-[#1A1D2D] p-2 text-textGray font-monomaniac text-[20px] rounded-lg w-[45vw] outline-none placeholder:text-textGray placeholder:font-monomaniac placeholder:text-[20px]">
                    </input>
                </div>
                <div className="flex flex-row gap-8">
                    <div className="bg-[#685680] h-[50px] px-8 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:scale-95 transition-all">
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
        </>
    )
}

export default UrlField;