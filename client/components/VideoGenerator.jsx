import React, { useEffect, useState } from 'react';
import VideoModule from './VideoModule';


const VideoGenerator = ({ summary }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (summary) {
      try {
        const parsedSummary = JSON.parse(summary);
        const summaryText = parsedSummary.summary;
        setText(summaryText);
      } catch (error) {
        console.error('Error parsing summary:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

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