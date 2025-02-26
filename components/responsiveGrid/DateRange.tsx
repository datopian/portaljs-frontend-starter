import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateRange = ({ onSelect }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    onSelect([newValue.startDate, newValue.endDate]);
  };

  return (
    <Datepicker
      value={value}
      onChange={handleChange}
      asSingle={false} // Ensure the date picker is in range mode
      showShortcuts={false} // Optional: Show predefined date range shortcuts
      showFooter={false} // Optional: Show footer in the date picker
      containerClassName="relative"
      popoverDirection="down"
    />
  );
};

export default DateRange;
