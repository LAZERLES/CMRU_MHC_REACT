import React, { useState, useEffect } from "react";

import { getMostFrequentEmoji } from "../services/moodService"; // Service to call API for stats
import { useMoodStore } from "../../store/useMoodStore";

const MonthlyStats = () => {
  const { userId } = useMoodStore();
  const [mostFrequentEmoji, setMostFrequentEmoji] = useState(null);

  useEffect(() => {
    const fetchMostFrequentEmoji = async () => {
      const response = await fetch(`/api/mood/stats/${userId}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
      const data = await response.json();
      setMostFrequentEmoji(data);
    };

    fetchMostFrequentEmoji();
  }, [userId]);

  return (
    <div>
      <h2>Most Frequent Emoji for the Month</h2>
      {mostFrequentEmoji ? (
        <div>
          <span>{mostFrequentEmoji.moodEmoji}</span>
          <p>{mostFrequentEmoji.count} times this month</p>
        </div>
      ) : (
        <p>No mood data yet</p>
      )}
    </div>
  );
};

export default MonthlyStats;
