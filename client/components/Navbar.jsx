'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./Loader";

const Navbar = () => {
    const [topic,setTopic] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const maxTopicCount = 15;
    const router = useRouter();
    
    const handleLogoClick = () => {
        window.speechSynthesis.cancel();
        window.location.href = '/';
    };

    const handleTopicChange = (e) => {
        const value = e.target.value;
        setTopic(value);
    }

    useEffect(() => {
        if(topic.length >= maxTopicCount){
            setIsValid(true);
        }
        else{
            setIsValid(false);
        }
    },[topic])

    const handleTopicSubmit = async () => {
        if(!isValid) return;
        console.log(topic);

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:3000/summarize_text', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text:topic }),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log('Summary:', data);
                window.open(`/video?summary=${(JSON.stringify(data))}`, '_blank');
            } else {
              console.error('Failed to summarize URL');
            }
          } catch (error) {
            console.error('Error summarizing URL:', error);
          } finally {
            setIsSubmitting(false);
          }
    }
    
    return (
        <div className="flex flex-row justify-between items-center pt-4 w-full">
            {isSubmitting && <Loader />}
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
                <div className='flex items-center'>
                    <input
                        type="text"
                        placeholder={`Search for a topic (min ${maxTopicCount} chars)`}
                        value={topic}
                        onChange={handleTopicChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleTopicSubmit();
                            }
                        }}
                        className="border-2 border-[#1A1D2D] bg-[#1A1D2D] py-2 px-4 text-textGray font-monomaniac text-[20px] rounded-l-2xl w-[45vw] outline-none placeholder:text-textGray placeholder:font-monomaniac placeholder:text-[20px] placeholder:text-opacity-50"
                    />
                    <div className={`bg-[#414558] h-[50px] px-8 flex flex-col justify-center items-center rounded-r-2xl cursor-pointer hover:opacity-80 transition-all`}
                        onClick={handleTopicSubmit}>
                        <FontAwesomeIcon icon={faSearch} className="h-8 w-8 text-[#676976]" />
                    </div>
                </div>
            </div>
            {/* New button */}
            <div>
                <div className="mr-12">
                <button className="flex flex-row gap-2 bg-[#685680] h-[50px] px-4 justify-center items-center rounded-3xl cursor-pointer hover:scale-105 transition-all" onClick={handleLogoClick}>
                    <h1 className="flex text-[#B1A6C0] font-jaro text-3xl">New</h1>
                    <FontAwesomeIcon icon={faPlus} className="flex h-6 w-6 text-[#B1A6C0]" />
                </button>
                </div>
            </div>
        </div>
    )
};
export default Navbar