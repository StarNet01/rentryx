"use client";
import { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid2,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const Home = () => {
  const [pickUpDate, setPickUpDate] = useState(null);
  const [dropOffDate, setDropOffDate] = useState(null);
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const router = useRouter();

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (pickUpDate) {
      searchParams.append("pickUpDate", dayjs(pickUpDate).format("YYYY-MM-DD"));
    }

    if (dropOffDate) {
      searchParams.append(
        "dropOffDate",
        dayjs(dropOffDate).format("YYYY-MM-DD")
      );
    }

    if (pickUpTime) {
      searchParams.append("pickUpTime", pickUpTime);
    }

    if (dropOffTime) {
      searchParams.append("dropOffTime", dropOffTime);
    }

    const queryString = searchParams.toString();
    router.push(`/cars${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <div className="top-img flex items-end justify-start">
          <div>
            <div className="w-full border-[#A0A0A0] border-[2px] rounded flex gap-4 justify-center items-center pr-5">
              <div className="flex p-4 gap-4">
                <img src="/svg/carIcon.svg" alt="car" />
                <DatePicker
                  value={pickUpDate}
                  onChange={(newValue: any) => setPickUpDate(newValue)}
                  slotProps={{
                    textField: {
                      variant: "standard",
                      placeholder: "pick up date",
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
              <div className="flex p-4 gap-4">
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <Container className="mt-24">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-[36px]">Suvs for Rent in Emirate</h1>
              <a href="#" className="text-[#0A84FF] underline">
                View All
              </a>
            </div>
            <Grid2
              container
              rowSpacing={3}
              columnSpacing={{ xs: 2, sm: 3, md: 8 }}
            >
              <Grid2 size={4}>
                <CarCardType1 />
              </Grid2>
              <Grid2 size={4}>
                <CarCardType1 />
              </Grid2>
              <Grid2 size={4}>
                <CarCardType1 />
              </Grid2>
            </Grid2>
          </div>
        </Container>

        <div className="bg-[#ECF2F3] w-full py-10 px-5 flex justify-center items-center gap-24 my-24">
          <img src="/car/logo/lambo.png" alt="logo" />
          <img src="/car/logo/3.png" alt="logo" />
          <img src="/car/logo/4.png" alt="logo" />
          <img src="/car/logo/5.png" alt="logo" />
          <img src="/car/logo/6.png" alt="logo" />
          <img src="/car/logo/7.png" alt="logo" />
        </div>
        <Container className="my-24">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-[36px]">Luxuty Cars</h1>
              <a href="#" className="text-[#0A84FF] underline">
                View All
              </a>
            </div>
            <Grid2
              container
              rowSpacing={3}
              columnSpacing={{ xs: 2, sm: 3, md: 8 }}
            >
              <Grid2 size={4}>
                <CarCardType1 />
              </Grid2>
              <Grid2 size={4}>
                <CarCardType1 />
              </Grid2>
              <Grid2 size={4}>
                <CarCardType1 />
              </Grid2>
            </Grid2>
          </div>
        </Container>
      </>
    </LocalizationProvider>
  );
};

export default Home;

export const CarCardType1 = ({ car }: { car?: any }) => {
  const router = useRouter();
  return (
    <>
      <div
        className="bg-[#ECF2F3] border border-[#A0A0A0] rounded-xl cursor-pointer"
        onClick={() => {
          router.push(`cars/detail?id=${car?.id || 1}`);
        }}
      >
        <img
          src={car?.images?.[0] || "/car/test32.jpg"}
          alt="car img"
          className="w-full"
        />
        <div className="py-4 px-5">
          <span>{car?.name || "Mercedes-Benz G63 AMG"} </span>
          <span>{car?.year || 2022}</span>
          <Typography variant="caption" component="h6" mb={2} color="gray">
            {car?.location || "1 Street 8A, Za'abeel 2, Dubai, ARE"}
          </Typography>
          <Divider />
          <div className="flex gap-1 items-center py-3">
            <Typography variant="subtitle1">Price: </Typography>
            <Typography variant="subtitle2">AED</Typography>
            <Typography variant="subtitle2">
              {car?.pricePerDay * 25 || 36000}
            </Typography>
            <Typography variant="caption" color="gray">
              /mo
            </Typography>
            <Typography variant="subtitle2">AED</Typography>
            <Typography variant="subtitle2">
              {car?.pricePerDay * 6 || 10800}
            </Typography>
            <Typography variant="caption" color="gray">
              /wk
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
