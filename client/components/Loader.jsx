import React, { useEffect } from 'react';

const Loader = () => {
  // Disable scrolling when the loader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when the loader is removed
    };
  }, []);

  return (
    <div className='fixed flex-col top-0 left-0 w-full h-full bg-background flex justify-center items-center z-[9999] pointer-events-none'>
      <img src='/loader.gif' alt='Loading...' className='pointer-events-auto ' />
      <div className="text-4xl font-jaro text-white animate-bounce">Rotifying content...</div>
    </div>
  );
};

export default Loader;