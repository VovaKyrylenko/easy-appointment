import { DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { useState } from "react";

interface DatePickerWithRangeProps {
  onChange: (start: Date | null, end: Date | null) => void;
  selectedDates: DateRange | null;
  bookedDates: DateRange[] | undefined;
}

export const DatePickerWithRange = ({
  onChange,
  selectedDates,
  bookedDates,
}: DatePickerWithRangeProps) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const today = new Date();

  const isDateDisabled = (date: Date) => {
    if (date < today) return true;
    if (bookedDates) {
      for (const bookedRange of bookedDates) {
        if (bookedRange.from && bookedRange.to) {
          if (
            date >= new Date(bookedRange.from) &&
            date <= new Date(bookedRange.to)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      onChange(newDate.from, newDate.to);
    } else {
      onChange(null, null);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center p-4 bg-white shadow-md rounded-lg w-full h-full"
      )}
    >
      <div className="w-full h-full max-w-md mb-4">
        <Calendar
          mode="range"
          className="h-full w-full flex"
          defaultMonth={date?.from}
          selected={selectedDates ?? date}
          onSelect={handleDateChange}
          disabled={isDateDisabled}
          classNames={{
            months:
              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-4 w-full flex flex-col",
            table: "w-full h-full border-collapse space-y-1",
            head_row: "",
            row: "w-full mt-2",
          }}
        />
      </div>
    </div>
  );
};
