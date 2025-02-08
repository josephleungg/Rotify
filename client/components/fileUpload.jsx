import React,{ useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudArrowUp, faFile } from "@fortawesome/free-solid-svg-icons";

export default function FileUpload({ selectMethodDisplay }) {
    const [file,setFile] = useState(null);
    const [isValid,setIsValid] = useState(false);

    const handleClick = (method) => () => {
    selectMethodDisplay(method);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && validateFileType(selectedFile)) {
          setFile(selectedFile);
          setIsValid(true);
        } else {
          setFile(null);
          setIsValid(false);
        }
    };
    
    const validateFileType = (file) => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return validTypes.includes(file.type);
    };

    const handleSubmit = () => {
        if(!isValid) return;
        console.log(file);
    }

    return (
    <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="font-monomaniac text-textGray text-md">
        Drop a file (ex. PDF, Slideshow, Article) we'll transform it into an immersive, interactive video
        </h1>
        <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        />
        <label htmlFor="file-upload" className={`${isValid ? 'bg-[#95BA84]' : 'bg-[#414556]' } overflow-visible h-[150px] w-[150px] p-2 flex flex-col text-center justify-center items-center rounded-xl cursor-pointer`}>
            {file ? <FontAwesomeIcon icon={faFile} className="h-[80px] w-auto text-background" /> : <FontAwesomeIcon icon={faCloudArrowUp} className="h-[80px] w-auto text-background" />}
            {file && (
            <p className={`font-monomaniac text-sm mx-2 `}>
                {isValid ? `${file.name}` : 'Invalid file type. Please upload a PDF or DOC file.'}
            </p>
        )}
        </label>
        <div className="flex flex-row gap-8 items-center justify-center">
            <div
                className="bg-transparent border-[2px] border-[#B1A6C0] p-3 flex flex-col justify-center items-center text-[#685680] rounded-full cursor-pointer hover:scale-95 hover:bg-[#685680] hover:text-white transition-all"
                onClick={handleClick('conversions')}
            >
                <FontAwesomeIcon icon={faArrowLeft} className="h-8 w-8" />
            </div>
            <div className={`h-[50px] px-8 flex flex-col justify-center items-center rounded-lg ${isValid ? 'bg-[#685680] cursor-pointer hover:scale-95 transition-all text-[#B1A6C0]' : ' border border-1 border-[#685680] text-textGray text-opacity-50' }`}
                onClick={handleSubmit}>
                <h1 className=" font-jaro text-3xl">Generate</h1>
            </div>
        </div>
    </div>
  );
}