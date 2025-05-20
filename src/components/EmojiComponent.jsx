import { useState } from "react";

const moods = [
  { name: "Happy", image: "/emojis/happy.png" },
  { name: "Grateful", image: "/emojis/grateful.png" },
  { name: "Sad", image: "/emojis/sad.png" },
  { name: "Emotional", image: "/emojis/emotional.png" },
  { name: "Angry", image: "/emojis/angry.png" },
  { name: "Tired", image: "/emojis/tired.png" },
  { name: "Frustrated", image: "/emojis/frustrated.png" },
  { name: "Neutral", image: "/emojis/neutral.png" },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function EmojiComponent({ onSelectMood, selectedDate, month }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleClick = (moodName) => {
    if (!selectedDate) {
      alert("Please select a date first!");
      return;
    }
    setSelectedMood(moodName);
    onSelectMood(moodName);
  };

  let day = selectedDate;
  if (selectedDate && selectedDate.includes("-")) {
    const parts = selectedDate.split("-");
    day = parts[2];
  }

  const displayDate = selectedDate && month !== undefined ? `${day} ${monthNames[month]}` : "";

  return (
    <div className="w-full h-full p-4 md:p-12 flex flex-col items-center justify-start md:justify-center font-inter overflow-auto">
      <h2 className="text-lg md:text-4xl font-semibold md:font-bold mb-4 md:mb-12 text-center leading-snug">
        {selectedDate ? `Pick an emoji for ${displayDate}` : "Select a date first"}
      </h2>

      <div
        className="
          grid grid-cols-4 
          gap-x-4 gap-y-5
          md:gap-x-28 md:gap-y-20 md:-ml-8
        "
      >
        {moods.map((mood) => (
          <div
            key={mood.name}
            onClick={() => handleClick(mood.name)}
            className={`
              cursor-pointer flex flex-col items-center 
              p-1 md:p-6 rounded-2xl border-2 md:border-4
              ${selectedMood === mood.name ? "border-blue-500" : "border-transparent"}
              min-w-[56px] min-h-[80px] md:min-w-[120px] md:min-h-[160px]
              transition-shadow duration-300 ease-in-out hover:shadow-md
            `}
          >
            <img
              src={mood.image}
              alt={mood.name}
              className="w-8 h-8 md:w-24 md:h-24 object-contain"
            />
            <span className="mt-1 text-xs md:mt-4 md:text-xl font-medium text-center leading-tight">
              {mood.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
