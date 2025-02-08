import React, { useState, useEffect, use } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faForward, faLink } from '@fortawesome/free-solid-svg-icons';

function Conversions({ selectMethodDisplay }) {
    const [topic,setTopic] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleClick = (method) => () => {
        selectMethodDisplay(method);
    };

    const handleTopicChange = (e) => {
        const value = e.target.value;
        setTopic(value);
    }

    useEffect(() => {
        if(topic.length > 30){
            setIsValid(true);
        }
        else{
            setIsValid(false);
        }
    },[topic])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className='flex items-center justify-center'>
                <input
                    type="text"
                    placeholder="What should we learn today? (min 30 chars)"
                    value={topic}
                    onChange={handleTopicChange}
                    className="border-2 border-[#1A1D2D] bg-[#1A1D2D] p-2 text-textGray font-monomaniac text-[20px] rounded-l-lg w-[35vw] outline-none placeholder:text-textGray placeholder:font-monomaniac placeholder:text-[20px] placeholder:text-opacity-25"
                />
                <div className={`py-3 px-6 rounded-r-lg transition-all ${isValid ? 'bg-[#685680] cursor-pointer hover:bg-[#b3a3c8] text-white' : ' border border-1 border-[#685680] text-textGray text-opacity-50' }`}>
                    <FontAwesomeIcon icon={faForward} className='h-4 w-4' />
                </div>
            </div>
        <h1 className="font-monomaniac text-textGray text-md my-4">
            or select content conversion method
        </h1>
        <div className="flex gap-32">
            {/* File upload button */}
            <div
            className="bg-[#95BA84] h-[150px] w-[150px] flex flex-col justify-center items-center rounded-xl hover:scale-95 transition-all cursor-pointer"
            onClick={handleClick('upload')}
            >
            <FontAwesomeIcon icon={faCloudArrowUp} className="h-[80px] w-auto text-[#4D6343]" />
            <h1 className="text-background font-monomaniac py-1 text-xl">File Upload</h1>
            </div>
            {/* URL input field */}
            <div
            className="bg-[#7B649B] h-[150px] w-[150px] flex flex-col justify-center items-center rounded-xl hover:scale-95 transition-all cursor-pointer"
            onClick={handleClick('url')}
            >
            <FontAwesomeIcon icon={faLink} className="h-[80px] w-auto text-[#4F3E66]" />
            <h1 className="text-background font-monomaniac py-1 text-xl">URL</h1>
            </div>
        </div>
        </div>
    );
}

export default Conversions;