"use client";
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart, faBookmark, faQuestion, faShare, faPlay, faPause, faComment } from "@fortawesome/free-solid-svg-icons";
import WebSocketComponent from './WebSocketComponent';
import Loader from './Loader';

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

const VideoModule = ({ text }) => {
  const synth = window.speechSynthesis;
  const videoRef = useRef(null);
  const utteranceRef = useRef(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [togglePlay, setTogglePlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Internal TTS state
  const [pausedWordIndex, setPausedWordIndex] = useState(0); // Track paused position
  const textBlocks = splitTextIntoBlocks(text);

  // Track whether the captions should update
  const shouldUpdateCaptions = useRef(true);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  
    if (synth.paused) {
      synth.resume(); // Resume speech if paused
    } else if (!isSpeaking) {
      console.log('Resuming TTS from paused position');
      const utterance = new SpeechSynthesisUtterance(
        textBlocks.slice(currentBlockIndex * 4).join(' ')
      );
      utterance.rate = 1;
      utterance.onboundary = utteranceRef.current.onboundary;
      utterance.onend = utteranceRef.current.onend;
      utteranceRef.current = utterance;
      synth.speak(utterance);
    }
  
    setTogglePlay(true);
    setIsSpeaking(true);
    shouldUpdateCaptions.current = true;
  };
  

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  
    if (synth.speaking) {
      synth.pause(); // Pause TTS
    }
  
    setTogglePlay(false);
    setIsSpeaking(false);
    shouldUpdateCaptions.current = false;
  };
  

  const toggleChat = () => {
    setChatOpen(!chatOpen);
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

    // Handle video loop
    videoElement.onended = () => {
      console.log('Video ended, restarting...');
      videoElement.currentTime = 0; // Reset video to the start
      videoElement.play(); // Restart video
      synth.cancel(); // Stop TTS
      synth.speak(utteranceRef.current); // Restart TTS
      setCurrentBlockIndex(0); // Reset captions to the first block
    };

    const utterance = new SpeechSynthesisUtterance(textBlocks.join(' '));
    utterance.rate = 1; // Adjust TTS speed

    let wordIndex = 0; // Track the current word index

    utterance.onend = () => {
      console.log('TTS ended');
      setIsSpeaking(false);
      setCurrentBlockIndex(0); // Reset to the first block
      wordIndex = 0; // Reset word index
      if (videoRef.current) {
        videoRef.current.currentTime = 0; // Reset video to the start
        videoRef.current.play(); // Play the video again
      }
      synth.speak(utterance); // Restart TTS
      setIsSpeaking(true);
    };

    utterance.onboundary = (event) => {
      if (event.name === "word" && shouldUpdateCaptions.current) {
        // Calculate the current block index based on the word index
        const newIndex = Math.floor(wordIndex / 4); // Assuming block size is 4 words

        // Update the block index slightly earlier by checking if we're near the end of the current block
        if (wordIndex % 4 === 2) { // Update when the 3rd word of the block is spoken
          setCurrentBlockIndex(newIndex + 1);
        }

        wordIndex++;

        // If we've reached the end of the text, reset wordIndex and block index
        if (wordIndex >= textBlocks.length * 4) {
          wordIndex = 0;
          setCurrentBlockIndex(0);
        }
      }
    };

    utteranceRef.current = utterance;

    // Start TTS on page load
    handlePlay();

    return () => {
      synth.cancel(); // Clean up TTS on component unmount
    };
  }, []);

  const handleQuizOpen = async () => {
    try {
      handlePause(); // Pause video and TTS
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/create_quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }

      const quizData = await response.json();

      const queryString = encodeURIComponent(JSON.stringify(quizData));

      // Open the quiz page in a new tab with the quiz data as a query parameter
      window.open(`/quiz?data=${queryString}`, '_blank');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-background h-screen">
      {isLoading && <Loader />}
      <div className="flex flex-row gap-2 items-end justify-center relative w-screen pt-16 bg-background">
        {/* Video and Caption */}
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
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full overflow-hidden rounded-3xl"
            muted
            controls={false}
            loop // Add the loop attribute for seamless looping
            disablePictureInPicture
          >
            Your browser does not support the video tag.
          </video>
          {/* Captions */}
          <div className="absolute bottom-[25%] w-full text-center text-white bg-transparent padding-[10px] text-[48px] font-bangers [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)] [-webkit-text-stroke:1px_black]">
            {textBlocks[currentBlockIndex]}
          </div>
        </div>

        {/* Video Buttons */}
        <div className="flex flex-col gap-4 top-0 items-center justify-center mr-8">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer" onClick={handleLike}>
            <FontAwesomeIcon icon={faHeart} className={`h-7 w-7 transition-all ${isLiked ? 'text-red-500 animate-heartbeat' : 'text-white'}`} />
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer" onClick={handleSave}>
            <FontAwesomeIcon icon={faBookmark} className={`h-7 w-7 transition-all ${isSaved ? 'text-yellow-500 animate-heartbeat' : 'text-white'}`} />
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer" onClick={toggleChat}>
            <FontAwesomeIcon icon={faComment} className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer" onClick={handleQuizOpen}>
            <FontAwesomeIcon icon={faQuestion} className="h-7 w-7 text-white" />
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faShare} className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Chat menu */}
        {chatOpen && <WebSocketComponent summaryContext={text} />}
      </div>
    </div>
  );
};

export default VideoModule;