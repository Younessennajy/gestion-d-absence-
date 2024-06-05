// Calendar.jsx
import { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Calendar({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDate(day);
    onDateSelect(format(day, 'yyyy-MM-dd'));
  };

  return (
    <div>
      <DayPicker
        selected={selectedDate}
        onDayClick={handleDayClick}
        showOutsideDays
      />
      {selectedDate && (
        <p>
          Selected Date: {format(selectedDate, 'dd/MM/yyyy')}
        </p>
      )}
    </div>
  );
}
