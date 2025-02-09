import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudArrowUp, faFile } from "@fortawesome/free-solid-svg-icons";

const FileUpload = ({ selectMethodDisplay }) => {
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
    const validTypes = ['application/pdf'];
    return validTypes.includes(file.type);
  };

  // Handle form submission to upload file and receive summarized content
  const handleSubmit = async () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('pdfFile', file);
      const response = await fetch('http://localhost:3000/summarize_file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Summary:', data);
        // Navigate to the /video page with the resulting information
        router.push(`/video?summary=${encodeURIComponent(JSON.stringify(data))}`);
      } else {
        console.error('Failed to summarize file');
      }
    } catch (error) {
      console.error('Error summarizing file:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="font-monomaniac text-textGray text-md">
        Drop a file (ex. PDF, Slideshow, Article) we'll transform it into an immersive, interactive video
      </h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className={`${isValid ? 'bg-[#95BA84]' : 'bg-[#414556]' } overflow-visible h-[150px] w-[150px] p-2 flex flex-col text-center justify-center items-center rounded-xl cursor-pointer`}>
        {file ? <FontAwesomeIcon icon={faFile} className="h-[80px] w-auto text-background" /> : <FontAwesomeIcon icon={faCloudArrowUp} className="h-[80px] w-auto text-background" />}
        {file && (
          <p className={`font-monomaniac text-sm mx-2 `}>
            {isValid ? `${file.name}` : 'Invalid file type. Please upload a PDF file.'}
          </p>
        )}
      </label>
      <div className="flex flex-row gap-8 items-center justify-center">
        <div
          className="bg-transparent border-[2px] border-[#B1A6C0] p-3 flex flex-col justify-center items-center text-[#685680] rounded-full cursor-pointer hover:scale-95 hover:bg-[#685680] hover:text-white transition-all"
          onClick={() => selectMethodDisplay('conversions')}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-8 w-8" />
        </div>
        <div
          className={`h-[50px] px-8 flex flex-col justify-center items-center rounded-lg ${isValid ? 'bg-[#685680] cursor-pointer hover:scale-95 transition-all text-[#B1A6C0]' : ' border border-1 border-[#685680] text-textGray text-opacity-50'}`}
          onClick={handleSubmit}
        >
          <h1 className="font-jaro text-3xl">{isSubmitting ? 'Submitting...' : 'Generate'}</h1>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;