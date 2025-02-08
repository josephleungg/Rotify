import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faLink } from '@fortawesome/free-solid-svg-icons';

function Conversions({ selectMethodDisplay }) {
  const handleClick = (method) => () => {
    selectMethodDisplay(method);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-monomaniac text-textGray text-md">
        Select content conversion method
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