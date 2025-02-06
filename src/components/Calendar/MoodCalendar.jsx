import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { useMoodStore } from "../../store/useMoodStore";


const MoodCalendar = ({ userId }) => {
  const { moods, fetchMoods, addMood, fetchMostUsedEmoji, mostUsedEmoji } =
    useMoodStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [story, setStory] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  useEffect(() => {
    fetchMoods(userId, month, year);
    fetchMostUsedEmoji(userId, month, year);
  }, [userId, month, year, fetchMoods, fetchMostUsedEmoji]);

  const handleAddMood = async () => {
    if (!selectedEmoji) {
      toast.error("Please select an emoji!");
      return;
    }

    await addMood({
      userId,
      date: selectedDate.toISOString().split("T")[0],
      emoji: selectedEmoji,
      emojiValue: 1,
      story,
    });

    toast.success("Mood added successfully!");
    setStory("");
    setSelectedEmoji(null);
    fetchMoods(userId, month, year);
    fetchMostUsedEmoji(userId, month, year);
  };

  const getTileContent = ({ date }) => {
    const moodEntry = moods.find(
      (mood) => mood.date === date.toISOString().split("T")[0]
    );

    return moodEntry ? <span>{moodEntry.emoji}</span> : null;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Mood Calendar</h2>

          <div className="bg-base-200 rounded-lg p-4 mb-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={getTileContent}
              className="w-full"
            />
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg">
                Add Mood for {selectedDate.toDateString()}
              </h3>

              <div className="form-control w-full">
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="btn btn-outline"
                  >
                    {selectedEmoji || "Pick an Emoji"}
                  </button>
                </div>

                {showPicker && (
                  <div className="mt-4">
                    <EmojiPicker
                      onEmojiClick={(event, emojiObject) => {
                        setSelectedEmoji(emojiObject.emoji);
                        setShowPicker(false);
                      }}
                    />
                  </div>
                )}

                <textarea
                  className="textarea textarea-bordered w-full mt-4 h-24"
                  placeholder="Write your mood story..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                />

                <button
                  className="btn btn-primary mt-4 w-full"
                  onClick={handleAddMood}
                >
                  Save Mood
                </button>
              </div>
            </div>
          </div>

          {mostUsedEmoji && (
            <div className="stats shadow mt-6">
              <div className="stat">
                <div className="stat-title">Most Used Emoji This Month</div>
                <div className="stat-value text-center text-4xl py-2">
                  {mostUsedEmoji}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodCalendar;