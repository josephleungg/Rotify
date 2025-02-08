import React, { useEffect, useState } from 'react';
import VideoModule from './VideoModule';

const VideoGenerator = ({ summary }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (summary) {
      try {
        const decodedSummary = decodeURIComponent(summary);
        const parsedSummary = JSON.parse(decodedSummary);
        const summaryText = parsedSummary.summary;
        console.log(summaryText);
        setText(summaryText);
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