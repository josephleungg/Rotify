"use client";

import React, { useRef, useEffect } from 'react';

const videoFiles = [
    "./videos/minecraft.mp4",
    "./videos/gta5.mp4"
]

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
          videoElement.pause();
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
    <div>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
          muted
          controls={false}
        >
          Your browser does not support the video tag.
        </video>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

export default VideoModule;