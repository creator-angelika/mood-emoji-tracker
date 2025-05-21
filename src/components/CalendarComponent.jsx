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
    <div className="w-full h-full px-4 py-4 font-inter">

      {/* Month and Year with navigation arrows */}
      <div className="relative w-full mb-6 md:mb-12 select-none">

        <button
          onClick={handlePrevMonth}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 md:p-1 rounded hover:bg-gray-200 transition z-10"
          style={{ touchAction: "manipulation" }}
          aria-label="Previous Month"
        >
          <img
            src="/emojis/left-arrow.png"
            alt="Previous Month"
            className="w-6 h-6 md:w-12 md:h-12"
          />
        </button>

        <h2 className="text-xl md:text-3xl font-bold text-black text-center mx-16 md:mx-20">
          {monthNames[month]} {year}
        </h2>

        <button
          onClick={handleNextMonth}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 md:p-1 rounded hover:bg-gray-200 transition z-10"
          style={{ touchAction: "manipulation" }}
          aria-label="Next Month"
        >
          <img
            src="/emojis/right-arrow.png"
            alt="Next Month"
            className="w-6 h-6 md:w-12 md:h-12"
          />
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 text-center mb-4 md:mb-8 text-gray-500 font-medium text-xs md:text-sm">
        {daysOfWeek.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid gap-x-1 gap-y-6 md:gap-x-3 md:gap-y-5 grid-cols-7">
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
                text-xs md:text-sm font-medium
                
                ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-blue-200"}
                transition-colors duration-200
                focus:outline-none
              `}
              style={{ minWidth: "0" }} // prevent flex-grow weirdness on mobile if needed
            >
              <span>{day}</span>
              {assignedMood && (
                <img
                  src={moods.find((m) => m.name === assignedMood)?.image}
                  alt={assignedMood}
                  className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-6 lg:h-6 mt-1"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
