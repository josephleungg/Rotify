'use client'
import { useState } from "react";
import UrlField from "@/components/UrlField";
import FileUpload from "@/components/fileUpload";
import Conversions from "@/components/conversions";

import Image from "next/image";

export default function Home() {

  const [conversionsDisplay, setConversionsDisplay] = useState(true);
  const [urlDisplay, setUrlDisplay] = useState(false);
  const [fileUploadDisplay, setFileUploadDisplay] = useState(false);

  const fileUploadButton = () => {
    setConversionsDisplay(false);
    setUrlDisplay(false);
    setFileUploadDisplay(true);
  }

  const urlButton = () => {
    setConversionsDisplay(false);
    setUrlDisplay(true);
    setFileUploadDisplay(false);
  }

  const backButton = () => {
    setConversionsDisplay(true);
    setUrlDisplay(false);
    setFileUploadDisplay(false);
  }

  return (
    <div className="flex flex-col gap-24 items-center justify-center h-screen bg-slate-950">

      <div className="flex flex-col gap-1 items-center justify-center">
        <Image
          src="/rotify-logo.png"
          alt="Rotify Logo"
          width={144}
          height={32}
          crossOrigin="anonymous"
        />
        <h1 className="text-[48px] font-jaro">Rotify</h1>
        <p className="font-jaro text-base text-[#8A8A8A]">
          Turn informaton into an engaging, brain-boosting video!
        </p>
      </div>

      {conversionsDisplay && <Conversions urlButton={urlButton} fileUploadButton={fileUploadButton} />}
      {urlDisplay && <UrlField urlButton={urlButton} fileUploadButton={fileUploadButton} backButton={backButton} />}
      {fileUploadDisplay && <FileUpload urlButton={urlButton} fileUploadButton={fileUploadButton} backButton={backButton} />}
       
    </div>
  );
}
