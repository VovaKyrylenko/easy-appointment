import { DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";

interface DatePickerWithRangeProps {
  onChange: (range: DateRange | undefined) => void;
  selectedDates: DateRange | undefined;
  bookedDates: DateRange[] | undefined;
}

export const DatePickerWithRange = ({
  onChange,
  selectedDates,
  bookedDates,
}: DatePickerWithRangeProps) => {

  const handleDateChange = (newDate: DateRange | undefined) => {
    if (!newDate) {
      onChange(undefined);
      return;
    }
    const { from, to } = newDate;
    if (from && isDateDisabled(from)) {
      return;
    }

    let adjustedTo = to;
    if (to && from) {
      let current = new Date(from);
      current.setDate(current.getDate() + 1); 

      while (current <= to) {
        if (isDateDisabled(current)) {
          adjustedTo = new Date(current);
          adjustedTo.setDate(adjustedTo.getDate() - 1);
          break;
        }
        current.setDate(current.getDate() + 1);
      }
    }
    if (from && adjustedTo && adjustedTo < from) {
      return;
    }
    onChange({ from, to: adjustedTo });
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    if (date < today) return true;

    if (bookedDates) {
      for (const bookedRange of bookedDates) {
        if (bookedRange.from && bookedRange.to) {
          const bookedFrom = new Date(bookedRange.from);
          const bookedTo = new Date(bookedRange.to);
          if (date >= bookedFrom && date <= bookedTo) {
            return true;
          }
        }
      }
    }
    return false;
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
          defaultMonth={selectedDates?.from}
          selected={selectedDates}
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
