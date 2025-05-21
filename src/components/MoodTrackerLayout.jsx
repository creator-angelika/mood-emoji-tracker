import { useState, useEffect } from "react";
import EmojiComponent from "./EmojiComponent";
import CalendarComponent from "./CalendarComponent";
// InfoComponent import kept, in case you add it back later
import InfoComponent from "./InfoComponent";

export default function MoodTrackerLayout() {
  const [dateEmojis, setDateEmojis] = useState(() => {
    try {
      const saved = localStorage.getItem("dateEmojis");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);

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

  let month = undefined;
  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    if (!isNaN(dateObj)) {
      month = dateObj.getMonth();
    }
  }

  return (
    <div className="h-screen p-6 bg-gray-100 font-inter flex flex-col">
      {/* Main content fills available space */}
      <div className="flex flex-1 gap-4 flex-col lg:flex-row">
        {/* Emoji component */}
        <div className="lg:flex-[0.6] w-full rounded-3xl bg-white shadow-xl order-2 lg:order-1">
          <EmojiComponent
            onSelectMood={assignMoodToDate}
            selectedDate={selectedDate}
            month={month}
          />
        </div>

        {/* Calendar component */}
        <div className="lg:flex-[0.4] w-full flex flex-col gap-6 order-1 lg:order-2">
          <div className="flex-[1.2] min-h-[60vh] shadow-xl flex items-center justify-center bg-white rounded-2xl cursor-pointer select-none">
            <CalendarComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              dateEmojis={dateEmojis}
            />
          </div>

          {/* Optional InfoComponent */}
          {/* <div className="flex-[0.8] shadow-xl flex items-center justify-center bg-white rounded-2xl cursor-pointer select-none">
            <InfoComponent />
          </div> */}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1 h-6">
        Version 1.0 made with
        <img src="/emojis/heart.png" alt="hearty" className="w-4 h-4 inline-block" />
        by Angelika
      </footer>
    </div>
  );
}
