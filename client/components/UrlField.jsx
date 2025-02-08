import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Loader from './Loader';

const UrlField = ({ selectMethodDisplay }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleClick = (method) => () => {
    selectMethodDisplay(method);
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValid(validateUrl(value));
  };

  const validateUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/summarize_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Summary:', data);
        // Navigate to the /video page with the resulting information
        router.push(`/video?summary=${encodeURIComponent(JSON.stringify(data))}`);
      } else {
        console.error('Failed to summarize URL');
      }
    } catch (error) {
      console.error('Error summarizing URL:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-16 items-center justify-center">
      {isSubmitting && <Loader />}
        <div className="flex flex-col gap-3 items-center justify-center">
            <p className="font-monomaniac text-textGray">
                Drop a link to any website or article, and we'll transform it into an immersive, interactive video
            </p>
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={handleUrlChange}
                className="border-2 border-[#1A1D2D] bg-[#1A1D2D] p-2 text-textGray font-monomaniac text-[20px] rounded-lg w-[45vw] outline-none placeholder:text-textGray placeholder:font-monomaniac placeholder:text-[20px] placeholder:text-opacity-25"
            />
        </div>
        <div className="flex flex-row gap-8 items-center justify-center">
            <div 
                className="bg-transparent border-[2px] border-[#B1A6C0] p-3 flex flex-col justify-center items-center text-[#685680] rounded-full cursor-pointer hover:scale-95 hover:bg-[#685680] hover:text-white transition-all"
                onClick={handleClick('conversions')}
            >
                <FontAwesomeIcon icon={faArrowLeft} className="h-8 w-8" />
            </div>
            <div className={`h-[50px] px-8 flex flex-col justify-center items-center rounded-lg ${isValid ? 'bg-[#685680] cursor-pointer hover:scale-95 transition-all text-[#B1A6C0]' : ' border border-1 border-[#685680] text-textGray text-opacity-50' }`}
                onClick={handleSubmit}>
                <h1 className="font-jaro text-3xl">{isSubmitting ? 'Submitting...' : 'Generate'}</h1>
            </div>
        </div> 
      </div> 
  );
};

export default UrlField;