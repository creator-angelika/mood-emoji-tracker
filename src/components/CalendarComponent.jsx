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

export default function CalendarComponent({ selectedDate, setSelectedDate, dateEmojis }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="w-full px-4 py-2 font-inter">
      <h2 className="text-xl font-semibold mb-4 text-center text-black">May 2025</h2>

      <div className="grid gap-2 grid-cols-7">
        {days.map((day) => {
          const isSelected = day === selectedDate;
          const assignedMood = dateEmojis[day];

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`
                aspect-square rounded-full flex flex-col items-center justify-center
                text-sm font-medium
                ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-blue-200"}
                transition-colors duration-200
                focus:outline-none
              `}
            >
              <span>{day}</span>
              {assignedMood && (
                <img
                  src={moods.find((m) => m.name === assignedMood)?.image}
                  alt={assignedMood}
                  className="w-6 h-6 mt-1"
                />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
