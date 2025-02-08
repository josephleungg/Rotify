"use client";

import React, { useEffect, useState } from 'react';
import VideoModule from './VideoModule';

const VideoWithText = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Hardcoded text about how to play blackjack
  const blackjackInstructions = `
    Blackjack is a popular card game. The goal is to get a hand value as close to 21 as possible without exceeding it.
    Each player is dealt two cards, and the dealer also gets two cards, with one card face up and one face down.
    Players can choose to "hit" to receive another card or "stand" to keep their current hand.
    Face cards are worth 10 points, aces can be worth 1 or 11 points, and all other cards are worth their face value.
    If a player's hand exceeds 21, they "bust" and lose the game.
    The dealer must hit until their hand is at least 17 points.
    The player with the highest hand value that does not exceed 21 wins the game.
  `;

  useEffect(() => {
    setText(blackjackInstructions);
  }, []);

  return (
    <div>
      <VideoModule text={blackjackInstructions} isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} />
    </div>
  );
};

export default VideoWithText;