'use client'
import { useState, useEffect } from "react";
import UrlField from "@/components/UrlField";
import FileUpload from "@/components/fileUpload";
import Conversions from "@/components/conversions";
import Image from "next/image";

export default function Home() {

  const [methodDisplay,setMethodDisplay] = useState('conversions');
  const [animation, setAnimation] = useState(true);
  const animationDuration = 200;

  const selectMethodDisplay = (method) => {
    if (methodDisplay === method) return;
    setAnimation(false);
    
    setTimeout(() => {
      setMethodDisplay(method);
      setAnimation(true);
    }, animationDuration);
  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center h-screen bg-background">

      <div className="flex flex-col gap-1 items-center justify-center">
        <Image
          src="/rotify-logo.png"
          alt="Rotify Logo"
          width={144}
          height={32}
          crossOrigin="anonymous"
        />
        <h1 className="text-[48px] font-jaro text-white">Rotify</h1>
        <p className="font-jaro text-base text-textGray">
          Turn informaton into an engaging, brain-boosting video!
        </p>
      </div>

      {/* { methodDisplay === 'conversions' ? <Conversions selectMethodDisplay={selectMethodDisplay} /> : '' }
      { methodDisplay === 'upload' ? <FileUpload selectMethodDisplay={selectMethodDisplay} /> : '' }
      { methodDisplay === 'url' ? <UrlField selectMethodDisplay={selectMethodDisplay} /> : '' } */}

      <div className={`flex flex-col overflow-visible items-center transition-all duration-[${animationDuration}] ${animation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
        { methodDisplay === 'conversions' ? <Conversions selectMethodDisplay={selectMethodDisplay} /> : '' }
        { methodDisplay === 'upload' ? <FileUpload selectMethodDisplay={selectMethodDisplay} /> : '' }
        { methodDisplay === 'url' ? <UrlField selectMethodDisplay={selectMethodDisplay} /> : '' }
      </div>

      {/* {conversionsDisplay && <Conversions urlButton={urlButton} fileUploadButton={fileUploadButton} />}
      {urlDisplay && <UrlField urlButton={urlButton} fileUploadButton={fileUploadButton} backButton={backButton} />}
      {fileUploadDisplay && <FileUpload urlButton={urlButton} fileUploadButton={fileUploadButton} backButton={backButton} />} */}
       
    </div>
  );
}
