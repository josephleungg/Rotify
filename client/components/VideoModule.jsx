"use client";
import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart, faBookmark, faQuestion, faShare } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

const videoFiles = [
  "./videos/minecraft.mp4",
  "./videos/minecraft2.mp4",
  "./videos/subwaysurfers.mp4"
];

const getRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * videoFiles.length);
  return videoFiles[randomIndex];
};

const getRandomStartTime = (duration) => {
  return Math.max(0, Math.floor(Math.random() * (duration - 30)));
};

const VideoModule = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const randomVideo = getRandomVideo();
    videoElement.src = randomVideo;

    videoElement.onloadedmetadata = () => {
      const startTime = getRandomStartTime(videoElement.duration);
      videoElement.currentTime = startTime;
      videoElement.play();

      const endTime = startTime + 30;
      const checkTime = () => {
        if (videoElement.currentTime >= endTime) {
          // Reset to startTime and play again
          videoElement.currentTime = startTime;
          videoElement.play();
        } else {
          requestAnimationFrame(checkTime);
        }
      };
      requestAnimationFrame(checkTime);
    };
  }, []);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  return (
    <div className="bg-background h-screen">
        <div className="flex flex-row gap-2 items-end justify-center relative w-screen pt-16 bg-background">
          <div className="w-[23%] h-auto max-w-[100%]">
            <video
              ref={videoRef}
              className="w-full h-full overflow-hidden rounded-3xl"
              style={{
                // objectFit: 'contain', // Use 'contain' to ensure the entire video is visible
              }}
              muted
              controls={false}
              loop // Add the loop attribute for seamless looping
              disablePictureInPicture
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col gap-4 top-0 items-center justify-center mr-8">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faHeart} className="h-7 w-7 text-white" />
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
              <FontAwesomeIcon icon={faBookmark} className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
              <FontAwesomeIcon icon={faMessage} className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
              <FontAwesomeIcon icon={faQuestion} className="h-7 w-7 text-white" />
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
              <FontAwesomeIcon icon={faShare} className="h-6 w-6 text-white" />
            </div>
          </div>
      </div>
    </div>
    
  );
};

export default VideoModule;