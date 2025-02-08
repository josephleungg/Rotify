import React, { useEffect, useState } from 'react';
import VideoModule from './VideoModule';

const removePunctuation = (text) => {
  return text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();
};

const VideoGenerator = ({ summary }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (summary) {
      try {
        const parsedSummary = JSON.parse(summary);
        const summaryText = parsedSummary.summary;
        const cleanedText = removePunctuation(summaryText);
        console.log('Cleaned text:', cleanedText);
        setText(cleanedText);
      } catch (error) {
        console.error('Error parsing summary:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [summary]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <VideoModule text={text} isSpeaking={false} setIsSpeaking={() => {}} />
    </div>
  );
};

export default VideoGenerator;