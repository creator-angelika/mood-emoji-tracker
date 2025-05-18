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
    <div className="min-h-screen p-6 bg-gray-100 font-inter flex gap-4">
      {/* Left: Emoji component takes 3/5 */}
      <div className="flex-[0.6] rounded-3xl bg-white shadow-xl">
        <EmojiComponent onSelectMood={assignMoodToDate} selectedDate={selectedDate} />
      </div>

      {/* Right section (Calendar + Info) takes 2/5 */}
      <div className="flex-[0.4] flex flex-col gap-6">
        {/* Calendar: Takes 3/5 of the right column */}
        <div className="flex-[0.6] shadow-xl flex items-center justify-center bg-white rounded-2xl cursor-pointer select-none">
          <CalendarComponent
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dateEmojis={dateEmojis}
          />
        </div>

       
      </div>
    </div>
  );
}
