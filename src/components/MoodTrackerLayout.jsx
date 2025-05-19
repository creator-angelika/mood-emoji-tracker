import { useState } from "react";
import EmojiComponent from "./EmojiComponent";
import CalendarComponent from "./CalendarComponent";
import InfoComponent from "./InfoComponent";

export default function MoodTrackerLayout() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateEmojis, setDateEmojis] = useState({}); // Map date -> mood name

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

  return (
    <div className="h-screen p-6 bg-gray-100 font-inter flex flex-col">
      {/* Main content fills available space */}
      <div className="flex flex-1 gap-4">
        {/* Left: Emoji component takes 3/5 */}
        <div className="flex-[0.6] rounded-3xl bg-white shadow-xl">
          <EmojiComponent onSelectMood={assignMoodToDate} selectedDate={selectedDate} />
        </div>

        {/* Right: Calendar + Info take 2/5 */}
        <div className="flex-[0.4] flex flex-col gap-6">
          {/* Calendar */}
          <div className="flex-[0.6] shadow-xl flex items-center justify-center bg-white rounded-2xl cursor-pointer select-none">
            <CalendarComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              dateEmojis={dateEmojis}
            />
          </div>

          {/* Info */}
          <div className="flex-[0.4] shadow-xl flex items-center justify-center bg-white rounded-2xl cursor-pointer select-none">
            <InfoComponent />
          </div>
        </div>
      </div>

      {/* Footer stays at bottom but takes minimal space */}
      <footer className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1 h-6">
        Version 1.0 and made with
        <img src="/emojis/heart.png" alt="heart" className="w-4 h-4 inline-block" />
        by Angelika
      </footer>
    </div>
  );
}
