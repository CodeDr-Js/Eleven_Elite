import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css"; // Import the CSS file



const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="date-range-container">
      <label>Select Date Range:</label>
      <div className="date-picker-wrapper">
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          dateFormat="yyyy/MM/dd"
          placeholderText="Select a date range"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
