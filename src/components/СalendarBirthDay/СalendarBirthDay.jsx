import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarStyles from "./СalendarBirthDay.module.css";
import Icon from "../ComponIcon/Icon";

const CustomInput = forwardRef(
  ({ value, onClick, onChange, onKeyDown }, ref) => {
    const handleChange = (e) => {
      onChange(e.target.value);
    };

    return (
      <div style={{ backgroundColor: "black", color: "white" }}>
        <input
          ref={ref}
          className={CalendarStyles.datePicker}
          value={value}
          onClick={(e) => {
            onClick();
            // e.preventDefault();
            onClick(e);
          }}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          readOnly
          style={{ backgroundColor: "black", color: "white" }}
        />
      </div>
    );
  }
);

const DatePickerStyles = `
  .react-datepicker__header {
    background-color:  #e6533c;
    color: white;
  }
  .react-datepicker__year-option {
    background-color:  #e6533c;
    color: white;
  }

  .react-datepicker__year-dropdown {
    margin-top: 0.25rem;
    max-height: 20rem;
  }
`;

const CalendarComponent = ({ onBirthdayChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const dayClassName = (date) => {
    if (date.toDateString() === new Date().toDateString()) {
      return `${CalendarStyles.currentDate}`;
    }
    return null;
  };

  const handleCalendarChange = (date) => {
    const today = new Date();

    if (today.getFullYear() - date.getFullYear() < 18) {
      setSelectedDate(new Date("2000-01-01"));
    } else {
      setSelectedDate(date);
    }
    onBirthdayChange(date);
    toggleCalendar();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setCalendarOpen(false);
    }
  };
  const handleIconClick = () => {
    const inputElement = document.querySelector(
      `.${CalendarStyles.datePicker}`
    );
    inputElement.click();
  };

  return (
    <div>
      <style>{DatePickerStyles}</style>
      <div className={CalendarStyles.container}>
        <DatePicker
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          dateFormat="dd.MM.yyyy"
          selected={selectedDate}
          onChange={handleCalendarChange}
          onClickCapture={toggleCalendar}
          maxDate={new Date()}
          calendarClassName={CalendarStyles.customCalendar}
          dayClassName={dayClassName}
          customInput={<CustomInput onKeyDown={handleKeyDown} />}
        />
        <Icon
          className={CalendarStyles.iconCalendar}
          iconId="icon-calendar-white"
          onClick={handleIconClick}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
