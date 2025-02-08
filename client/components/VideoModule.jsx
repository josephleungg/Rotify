"use client";

import React, { useRef, useEffect, useState } from 'react';

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

const splitTextIntoBlocks = (text, blockSize = 4) => {
  const words = text.split(/\s+/); // Split text into words
  const blocks = [];
  for (let i = 0; i < words.length; i += blockSize) {
    blocks.push(words.slice(i, i + blockSize).join(' '));
  }
  return blocks;
};

const VideoModule = ({ text, isSpeaking, setIsSpeaking }) => {
  const synth = window.speechSynthesis;
  const videoRef = useRef(null);
  const utteranceRef = useRef(null);
  const [currentWord, setCurrentWord] = useState('');
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const textBlocks = splitTextIntoBlocks(text);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    if (!isSpeaking && utteranceRef.current) {
      synth.speak(utteranceRef.current);
      setIsSpeaking(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    const randomVideo = getRandomVideo();
    videoElement.src = randomVideo;

    videoElement.onloadedmetadata = () => {
      const startTime = getRandomStartTime(videoElement.duration);
      videoElement.currentTime = startTime;
      videoElement.play();
    };

    videoElement.onerror = (error) => {
      console.error('Error loading video:', error);
    };

    const utterance = new SpeechSynthesisUtterance(textBlocks.join(' '));
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentBlockIndex(0); // Reset to the first block
      if (videoRef.current) {
        videoRef.current.currentTime = 0; // Reset video to the start
        videoRef.current.play(); // Play the video again
      }
      synth.speak(utterance); // Restart TTS
      setIsSpeaking(true);
    };
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const spokenWord = textBlocks.join(' ').substring(event.charIndex, event.charIndex + event.charLength);
        setCurrentWord(spokenWord);
      }
    };
    utteranceRef.current = utterance;

    // Start TTS on page load
    handlePlay();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // Compare the current word with the last word in the current block
    const currentBlock = textBlocks[currentBlockIndex];
    const lastWordInBlock = currentBlock.split(/\s+/).pop();
    console.log(`Current block's last word: ${lastWordInBlock}`);
    if (currentWord === lastWordInBlock) {
      // Move to the next block
      setCurrentBlockIndex((prevIndex) => (prevIndex + 1) % textBlocks.length);
    }
  }, [currentWord, currentBlockIndex, textBlocks]);

  return (
    <div className="flex flex-col items-center justify-center relative w-screen h-screen">
      <div style={{ width: '30%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Use 'contain' to ensure the entire video is visible
          }}
          muted
          controls={false}
          loop // Add the loop attribute for seamless looping
          disablePictureInPicture
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          width: '100%',
          textAlign: 'center',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '10px',
          fontSize: '24px',
        }}
      >
        {textBlocks[currentBlockIndex]}
      </div>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

export default VideoModule;