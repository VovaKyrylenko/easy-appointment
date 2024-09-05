import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./date-picker-with-range";
import { Button } from "~/components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";

interface DateSelectionSectionProps {
  onChange: (range: DateRange | undefined) => void;
  selectedDates: DateRange | undefined;
  bookedDates: DateRange[] | undefined;
}

export const DateSelectionSection = ({
  onChange,
  selectedDates,
  bookedDates,
}: DateSelectionSectionProps) => {
  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-md flex flex-col max-h-[75vh] overflow-hidden">
      <div className="w-full flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Select Your Dates
        </h2>
        <Button size="lg" onClick={() => onChange(undefined)}>
          Reset
          <ResetIcon className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DatePickerWithRange
          onChange={onChange}
          selectedDates={selectedDates}
          bookedDates={bookedDates}
        />
      </div>
    </div>
  );
};
