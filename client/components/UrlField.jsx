import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const UrlField = ({ selectMethodDisplay }) => {
  const handleClick = (method) => () => {
    selectMethodDisplay(method);
  };

  return (
    <div className="flex flex-col gap-16 items-center justify-center">
      <div className="flex flex-col gap-3 items-center justify-center">
        <p className="font-monomaniac text-textGray">
          Drop a link to any website or article, and we'll transform it into an immersive, interactive video
        </p>
        <input
          type="text"
          placeholder="Enter URL"
          className="border-2 border-[#1A1D2D] bg-[#1A1D2D] p-2 text-textGray font-monomaniac text-[20px] rounded-lg w-[45vw] outline-none placeholder:text-textGray placeholder:font-monomaniac placeholder:text-[20px]"
        />
      </div>
      <div className="flex flex-row gap-8">
        <div 
          className="bg-transparent border-[2px] border-[#B1A6C0] p-3 flex flex-col justify-center items-center text-[#685680] rounded-full cursor-pointer hover:scale-95 hover:bg-[#685680] hover:text-white transition-all"
          onClick={handleClick('conversions')}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-8 w-8" />
        </div>
        <Link href="/video">
          <div className="bg-[#685680] h-[50px] px-8 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:scale-95 transition-all">
            <h1 className="text-[#B1A6C0] font-jaro text-3xl">Generate</h1>
          </div>
        </Link>
      </div>  
    </div>
  );
};

export default UrlField;