import { useState, useEffect } from "react";
import EmojiComponent from "./EmojiComponent";
import CalendarComponent from "./CalendarComponent";
// InfoComponent import kept, in case you add it back later
import InfoComponent from "./InfoComponent";

export default function MoodTrackerLayout() {
  // Load saved emojis from localStorage on first render (lazy initializer)
  const [dateEmojis, setDateEmojis] = useState(() => {
    try {
      const saved = localStorage.getItem("dateEmojis");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);

  // Save dateEmojis to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dateEmojis", JSON.stringify(dateEmojis));
  }, [dateEmojis]);

  const assignMoodToDate = (moodName) => {
    if (!selectedDate) {
      alert("Please select a date first!");
      return;
    }
    setDateEmojis((prev) => ({
      ...prev,
      [selectedDate]: moodName,
    }));
  };

  // Extract month from selectedDate if available
  let month = undefined;
  if (selectedDate) {
    // Parse date string as a Date object
    const dateObj = new Date(selectedDate);
    if (!isNaN(dateObj)) {
      month = dateObj.getMonth(); // 0-based month index
    }
  }

  return (
    <div className="h-screen p-6 bg-gray-100 font-inter flex flex-col">
      {/* Main content fills available space */}
      <div className="flex flex-1 gap-4">
        {/* Left: Emoji component takes 3/5 */}
        <div className="flex-[0.6] rounded-3xl bg-white shadow-xl">
          <EmojiComponent
            onSelectMood={assignMoodToDate}
            selectedDate={selectedDate}
            month={month} // Pass month here!
          />
        </div>

        {/* Right: Calendar takes full 2/5 */}
        <div className="flex-[0.4] flex flex-col gap-6">
          {/* Calendar with increased vertical flex */}
          <div className="flex-[1.2] shadow-xl flex items-center justify-center bg-white rounded-2xl cursor-pointer select-none">
            <CalendarComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              dateEmojis={dateEmojis}
            />
          </div>

          {/* Optional: If you want InfoComponent back, uncomment below and adjust flex */}
          {/* <div className="flex-[0.8] shadow-xl flex items-center justify-center bg-white rounded-2xl cursor-pointer select-none">
            <InfoComponent />
          </div> */}
        </div>
      </div>

      {/* Footer stays at bottom but takes minimal space */}
      <footer className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1 h-6">
        Version 1.0 made with
        <img src="/emojis/heart.png" alt="hearty" className="w-4 h-4 inline-block" />
        by Angelika
      </footer>
    </div>
  );
}
