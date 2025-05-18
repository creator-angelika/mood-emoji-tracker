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

export default function EmojiComponent({ onSelectMood, selectedDate }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleClick = (moodName) => {
    if (!selectedDate) {
      alert("Please select a date first!");
      return;
    }
    setSelectedMood(moodName);
    onSelectMood(moodName);
  };

  return (
    <div className="w-full h-full p-12 flex flex-col items-center justify-center font-inter overflow-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">
        {selectedDate ? `Pick an emoji for May ${selectedDate}` : "Select a date first"}
      </h2>

      <div className="grid grid-cols-4 gap-x-28 gap-y-20 -ml-8">
        {moods.map((mood) => (
          <div
            key={mood.name}
            onClick={() => handleClick(mood.name)}
            className={`cursor-pointer flex flex-col items-center p-6 rounded-2xl border-4 ${
              selectedMood === mood.name ? "border-blue-500" : "border-transparent"
            } min-w-[120px] min-h-[160px] transition-shadow duration-300 ease-in-out hover:shadow-lg`}
          >
            <img
              src={mood.image}
              alt={mood.name}
              className="w-24 h-24 object-contain"
            />
            <span className="mt-4 text-xl font-medium">{mood.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
