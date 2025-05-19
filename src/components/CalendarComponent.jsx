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

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstWeekday(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarComponent({ selectedDate, setSelectedDate, dateEmojis }) {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(4);

  const daysInMonth = getDaysInMonth(year, month);
  const firstWeekday = getFirstWeekday(year, month);
  const adjustedFirstWeekday = (firstWeekday + 6) % 7;

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null);
  };

  return (
    <div className="w-full px-4 py-4 font-inter">
      {/* Month and Year with navigation arrows */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <button onClick={handlePrevMonth} className="p-2 rounded hover:bg-gray-200 transition">
          <img src="/emojis/left-arrow.png" alt="Previous Month" className="w-12 h-12" />
        </button>

        <h2 className="text-3xl font-bold text-black select-none">
          {monthNames[month]} {year}
        </h2>

        <button onClick={handleNextMonth} className="p-2 rounded hover:bg-gray-200 transition">
          <img src="/emojis/right-arrow.png" alt="Next Month" className="w-12 h-12" />
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 text-center mb-4 text-gray-500 font-medium text-sm">
        {daysOfWeek.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid gap-3 grid-cols-7">
        {[...Array(adjustedFirstWeekday)].map((_, idx) => (
          <div key={`pad-${idx}`} />
        ))}

        {days.map((day) => {
          const dateKey = `${year}-${month + 1}-${day}`;
          const isSelected = selectedDate === dateKey;
          const assignedMood = dateEmojis[dateKey];

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(dateKey)}
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
