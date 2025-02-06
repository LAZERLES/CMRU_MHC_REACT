import React from "react";
import { Picker } from "emoji-picker-react";

const EmojiPicker = ({ selectedEmoji, setSelectedEmoji }) => {
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji.emoji);
  };

  return (
    <div>
      <h4>Select your emoji:</h4>
      <Picker onEmojiClick={handleEmojiClick} />
      <div>{selectedEmoji && <span>{selectedEmoji}</span>}</div>
    </div>
  );
};

export default EmojiPicker;
