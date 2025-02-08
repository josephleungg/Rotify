"use client";
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart, faBookmark, faQuestion, faShare, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

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
  const [togglePlay, setTogglePlay] = useState(true);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    if (!isSpeaking && utteranceRef.current) {
      if (synth.paused) {
        synth.resume(); // Resume TTS if paused
      } else {
        synth.speak(utteranceRef.current); // Start TTS if not already speaking
      }
      setIsSpeaking(true);
    }
    setTogglePlay(true);
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (isSpeaking) {
      synth.pause(); // Pause TTS instead of canceling
      setIsSpeaking(false);
    }
    setTogglePlay(false);
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

    return () => {
      synth.cancel(); // Clean up TTS on component unmount
    };
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
    <div className="bg-background h-screen">
      <div className="flex flex-row gap-2 items-end justify-center relative w-screen pt-16 bg-background">
        <div
          className="relative w-[23%] h-auto max-w-[100%] rounded-3xl overflow-hidden cursor-pointer"
          onClick={togglePlay ? handlePause : handlePlay}
        >
          <div
            className={`${
              togglePlay
                ? "hidden"
                : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center z-50 p-8 h-fit w-fit rounded-full bg-black bg-opacity-25"
            }`}
          >
            <FontAwesomeIcon icon={togglePlay ? faPause : faPlay} className="h-6 w-6 text-white opacity-75" />
          </div>
          <video
            ref={videoRef}
            className="w-full h-full overflow-hidden"
            muted
            controls={false}
            loop
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