"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Button, Divider, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import useUrlParams from "@/modules/share/hooks/useUrlParams";

interface DateTimeFilterProps {
  onSearch?: (filters: {
    pickUpDate: string | null;
    dropOffDate: string | null;
    pickUpTime: string;
    dropOffTime: string;
  }) => void;
  className?: string;
}

const DateTimeFilter = ({ onSearch, className = "" }: DateTimeFilterProps) => {
  const { getUrlParam, setUrlParams } = useUrlParams();

  const initialPickUpDate = getUrlParam("pickUpDate")
    ? dayjs(getUrlParam("pickUpDate"))
    : null;
  const initialDropOffDate = getUrlParam("dropOffDate")
    ? dayjs(getUrlParam("dropOffDate"))
    : null;
  const initialPickUpTime = getUrlParam("pickUpTime") || "";
  const initialDropOffTime = getUrlParam("dropOffTime") || "";

  const [pickUpDate, setPickUpDate] = useState<any>(initialPickUpDate);
  const [dropOffDate, setDropOffDate] = useState<any>(initialDropOffDate);
  const [pickUpTime, setPickUpTime] = useState<string>(initialPickUpTime);
  const [dropOffTime, setDropOffTime] = useState<string>(initialDropOffTime);

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  const handleSearch = () => {
    const filters = {
      pickUpDate: pickUpDate ? dayjs(pickUpDate).format("YYYY-MM-DD") : null,
      dropOffDate: dropOffDate ? dayjs(dropOffDate).format("YYYY-MM-DD") : null,
      pickUpTime,
      dropOffTime,
    };

    setUrlParams({
      pickUpDate: filters.pickUpDate,
      dropOffDate: filters.dropOffDate,
      pickUpTime: pickUpTime || null,
      dropOffTime: dropOffTime || null,
    });

    if (onSearch) {
      onSearch(filters);
    }
  };

  useEffect(() => {
    if (
      pickUpDate &&
      dropOffDate &&
      dayjs(pickUpDate).isAfter(dayjs(dropOffDate))
    ) {
      setDropOffDate(null);
    }
  }, [pickUpDate, dropOffDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className={`w-full border-[#A0A0A0] border-[1px] rounded-md flex gap-4 justify-between items-center pr-5 ${className}`}
      >
        <div className="flex p-4 gap-4 flex-1">
          <img src="/svg/carIcon.svg" alt="car" />
          <DatePicker
            value={pickUpDate}
            onChange={(newValue: any) => setPickUpDate(newValue)}
            slotProps={{
              textField: {
                variant: "standard",
                placeholder: "Pick up date",
                sx: {
                  "& input": {
                    color: "#A0A0A0",
                    border: "none",
                  },
                  "& fieldset": { border: "none" },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": { borderBottom: "none" },
                  "& .MuiSvgIcon-root": {
                    color: "#A0A0A0",
                  },
                },
              },
            }}
          />
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          <img src="/svg/time.svg" alt="time" />
          <Select
            value={pickUpTime}
            onChange={(e) => setPickUpTime(e.target.value)}
            variant="standard"
            displayEmpty
            sx={{
              color: "#A0A0A0",
              "&:before": { borderBottom: "none" },
              "&:after": { borderBottom: "none" },
              "& .MuiSelect-icon": {
                color: "#A0A0A0",
              },
              "& .MuiSelect-select": {
                minHeight: "auto !important",
              },
            }}
          >
            <MenuItem disabled value="">
              Time
            </MenuItem>
            {timeSlots.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Divider orientation="vertical" variant="fullWidth" flexItem />
        <div className="flex p-4 gap-4 flex-1">
          <img src="/svg/backCar.svg" alt="car" />
          <DatePicker
            value={dropOffDate}
            onChange={(newValue: any) => setDropOffDate(newValue)}
            minDate={pickUpDate ? dayjs(pickUpDate) : undefined}
            slotProps={{
              textField: {
                variant: "standard",
                placeholder: "Drop off date",
                sx: {
                  "& input": {
                    color: "#A0A0A0",
                    border: "none",
                  },
                  "& fieldset": { border: "none" },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": { borderBottom: "none" },
                  "& .MuiSvgIcon-root": {
                    color: "#A0A0A0",
                  },
                },
              },
            }}
          />
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          <img src="/svg/time.svg" alt="time" />
          <Select
            value={dropOffTime}
            onChange={(e) => setDropOffTime(e.target.value)}
            variant="standard"
            displayEmpty
            sx={{
              color: "#A0A0A0",
              "&:before": { borderBottom: "none" },
              "&:after": { borderBottom: "none" },
              "& .MuiSelect-icon": {
                color: "#A0A0A0",
              },
              "& .MuiSelect-select": {
                minHeight: "auto !important",
              },
            }}
          >
            <MenuItem disabled value="">
              Time
            </MenuItem>
            {timeSlots.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default DateTimeFilter;
