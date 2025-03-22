"use client";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Grid2,
  IconButton,
  Rating,
  styled,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import carDetailService from "@/modules/share/services/cars/carDetailService";
import { CarDetails } from "@/modules/share/services/cars/carsService";
import bookingService, {
  BookingRequest,
} from "@/modules/share/services/cars/bookingService";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Grid from "@mui/material/Grid2";
const GoogleMap = dynamic(
  () => import("@/modules/share/components/GoogleMap"),
  { ssr: false }
);

import Header from "@/modules/landing/layouts/Header";
import Footer from "@/modules/landing/layouts/Footer";
import { CarCardType1 } from "@/modules/landing/pages/Home";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useAuthStore } from "@/modules/auth/store/auth";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PricingTabContent = ({
  priceDetails,
  type,
}: {
  priceDetails: any;
  type: "daily" | "weekly" | "monthly";
}) => {
  const details = priceDetails[type];

  return (
    <div className="bg-[#97AFDE] w-full text-white p-5 flex flex-col gap-3">
      <div className="flex justify-between">
        <span>Included mileage limit</span>
        <span>{details.mileageLimit}</span>
      </div>
      <Divider variant="fullWidth" flexItem className="bg-white" />
      <div className="flex justify-between">
        <span>Insurance</span>
        <span>{details.insurance}</span>
      </div>
      <Divider variant="fullWidth" flexItem className="bg-white" />
      <div className="flex justify-between">
        <span>Additional mileage charge</span>
        <span>AED {details.additionalMileageCharge} / Per km</span>
      </div>
    </div>
  );
};

const CarCardWithData = ({ car }: { car: any }) => {
  return <CarCardType1 car={car} />;
};

const CarDetail = () => {
  const searchParams = useSearchParams();
  const carId = searchParams.get("id") || "1";

  const [isLoading, setIsLoading] = useState(true);
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [openAdd, setOpenAdd] = React.useState(false);
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: 25.2048,
    lng: 55.2708,
  });
  const { isAuthenticated: isLoggedIn } = useAuthStore();

  const [isClient, setIsClient] = useState(false);
  const [origin, setOrigin] = useState("");

  const [pickUpDate, setPickUpDate] = useState<any>(null);
  const [dropOffDate, setDropOffDate] = useState<any>(null);
  const [pickUpTime, setPickUpTime] = useState<string>("");
  const [dropOffTime, setDropOffTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleBooking = async () => {
    if (!pickUpDate || !dropOffDate || !pickUpTime || !dropOffTime) {
      alert("Please select all date and time fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData: BookingRequest = {
        carId,
        pickUpDate: dayjs(pickUpDate).format("YYYY-MM-DD"),
        dropOffDate: dayjs(dropOffDate).format("YYYY-MM-DD"),
        pickUpTime,
        dropOffTime,
      };

      const response = await bookingService.createMockBooking(bookingData);
      console.log("Booking created:", response);

      alert(
        `Booking confirmed! Your booking ID is: ${response.id}\nTotal price: AED ${response.totalPrice}`
      );

      setPickUpDate(null);
      setDropOffDate(null);
      setPickUpTime("");
      setDropOffTime("");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error processing your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true);
      try {
        const details = await carDetailService.getMockCarDetailsById(carId);
        setCarDetails(details);

        if (details?.mapLocation) {
          setMapPosition({
            lat: details.mapLocation.lat,
            lng: details.mapLocation.lng,
          });
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    setIsClient(true);
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (isClient) {
      const galleryElements = document.querySelectorAll(".gallery");
      if (galleryElements.length > 0) {
        import("flickr-justified-gallery").then((fjGalleryModule) => {
          const fjGallery = fjGalleryModule.default;
          fjGallery(galleryElements, {
            itemSelector: ".gallery__item",
            rowHeight: 180,
            lastRow: "start",
            maxRowsCount: 2,
            gutter: 2,
            rowHeightTolerance: 0,
            calculateItemsHeight: false,
          });
        });
      }
    }
  }, [isClient, carDetails]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="my-24">
          <Container maxWidth="lg">
            <div className="flex justify-center items-center min-h-[50vh]">
              <p>Loading car details...</p>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }

  if (!carDetails) {
    return (
      <>
        <Header />
        <div className="my-24">
          <Container maxWidth="lg">
            <div className="flex justify-center items-center min-h-[50vh]">
              <p>Car not found!</p>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />
      <div className="my-24">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid size={8}>
              <div>
                <div className="mt-5">
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/testLogo.png"
                        alt={carDetails.brand}
                        width={30}
                        height={30}
                      />
                      <h2 className="text-[22px] font-bold">
                        {carDetails.name}
                      </h2>
                      <span className="text-[20]">{carDetails.year}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="cursor-pointer text-[#0A84FF] underline">
                        Review
                      </span>
                      <span>{carDetails.rating}</span>
                      <span>
                        <svg
                          className="w-6 h-6 text-[#EAAB4E]"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="py-4">
                    <LightGallery
                      speed={500}
                      plugins={[lgZoom, lgThumbnail]}
                      mode="lg-fade"
                      selector=".gallery-item"
                      pager={false}
                      thumbnail={true}
                      galleryId="nature"
                    >
                      <div className="grid grid-cols-3 gap-2">

                        <div className="col-span-2 row-span-2">
                          <a
                            className="gallery-item"
                            href={carDetails.images[0]}
                            data-src={carDetails.images[0]}
                          >
                            <img
                              src={carDetails.images[0]}
                              alt={`${carDetails.brand} ${carDetails.model}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </a>
                        </div>
    
                        <div className="grid gap-2">
                          {carDetails.images.slice(1).map((image, index) => (
                            <a
                              key={index}
                              className="gallery-item"
                              href={image}
                              data-src={image}
                            >
                              <img
                                alt={`${carDetails.brand} ${
                                  carDetails.model
                                } view ${index + 1}`}
                                src={image}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    </LightGallery>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[20px]">Description</h3>
                      <div className="flex gap-3">
                        <a href="#">
                          <svg
                            className="w-6 h-6 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
                          </svg>
                        </a>
                        <a href="#">
                          <svg
                            className="w-6 h-6 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <p>{carDetails.description}</p>
                  </div>
                  <Divider />
                  <div className="my-3">
                    <h3 className="font-bold text-[20px]">Features & Specs</h3>
                    <div className="flex gap-14 mt-6 justify-between">
                      <ul className="space-y-5 ul-feat">
                        <li>
                          <img src="/svg/car(8).svg" alt="icon" />
                          <span>{carDetails.vehicleType}</span>
                        </li>
                        <li>
                          <img src="/svg/car-seat1).svg" alt="icon" />
                          <span>{carDetails.seats} Seat</span>
                        </li>
                        <li>
                          <img src="/svg/car-door(3).svg" alt="icon" />
                          <span>{carDetails.doors} Doors</span>
                        </li>
                        <li>
                          <img src="/svg/gearbox)1.svg" alt="icon" />
                          <span>{carDetails.transmission}</span>
                        </li>
                      </ul>
                      <ul className="space-y-5 ul-feat">
                        <li>
                          <img src="/svg/speed-meter(1).svg" alt="icon" />
                          <span>Mileage: {carDetails.mileage}</span>
                        </li>
                        <li>
                          <img src="/svg/inspection1.svg" alt="icon" />
                          <span>
                            GCC Specs: {carDetails.gccSpecs ? "Yes" : "No"}
                          </span>
                        </li>
                        <li>
                          <img src="/svg/insurance1.svg" alt="icon" />
                          <span>
                            insurance: {carDetails.insurance ? "Yes" : "No"}
                          </span>
                        </li>
                        <li>
                          <img src="/svg/luggage)1.svg" alt="icon" />
                          <span>{carDetails.luggageCapacity} luggage bag</span>
                        </li>
                      </ul>
                      <ul className="space-y-5 ul-feat">
                        <li>
                          <img src="/svg/car(8).svg" alt="icon" />
                          <span>Fuel: {carDetails.fuelType}</span>
                        </li>
                        <li>
                          <img src="/svg/car-seat1).svg" alt="icon" />
                          <span>Color: {carDetails.color}</span>
                        </li>
                        <li>
                          <img src="/svg/car-door(3).svg" alt="icon" />
                          <span>Model: {carDetails.model}</span>
                        </li>
                        <li>
                          <img src="/svg/gearbox)1.svg" alt="icon" />
                          <span>Brand: {carDetails.brand}</span>
                        </li>
                      </ul>
                      <ul className="space-y-5 ul-feat">
                        <li>
                          <img src="/svg/speed-meter(1).svg" alt="icon" />
                          <span>Year: {carDetails.year}</span>
                        </li>
                        <li>
                          <img src="/svg/inspection1.svg" alt="icon" />
                          <span>Price: AED {carDetails.pricePerDay}/day</span>
                        </li>
                        <li>
                          <img src="/svg/insurance1.svg" alt="icon" />
                          <span>
                            Available: {carDetails.available ? "Yes" : "No"}
                          </span>
                        </li>
                        <li>
                          <img src="/svg/luggage)1.svg" alt="icon" />
                          <span>Location: {carDetails.location}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Divider />
                  {isLoggedIn && (
                    <>
                      <div className="my-3">
                        <h3 className="font-bold text-[20px] mb-3">
                          Delivery & Pick-up
                        </h3>
                        <div className="w-full border-[#A0A0A0] border-[2px] rounded flex gap-4 justify-center items-center">
                          <div className="flex p-4 gap-4 flex-1">
                            <img src="/svg/carIcon.svg" alt="car" />
                            <DatePicker
                              value={pickUpDate}
                              onChange={(newValue) => setPickUpDate(newValue)}
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
                                    "& .MuiInput-underline:after": {
                                      borderBottom: "none",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      color: "#A0A0A0",
                                    },
                                  },
                                },
                              }}
                            />
                            <Divider
                              orientation="vertical"
                              variant="fullWidth"
                              flexItem
                            />
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
                          <Divider
                            orientation="vertical"
                            variant="fullWidth"
                            flexItem
                          />
                          <div className="flex p-4 gap-4 flex-1">
                            <img src="/svg/backCar.svg" alt="car" />
                            <DatePicker
                              value={dropOffDate}
                              onChange={(newValue) => setDropOffDate(newValue)}
                              minDate={
                                pickUpDate ? dayjs(pickUpDate) : undefined
                              }
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
                                    "& .MuiInput-underline:after": {
                                      borderBottom: "none",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      color: "#A0A0A0",
                                    },
                                  },
                                },
                              }}
                            />
                            <Divider
                              orientation="vertical"
                              variant="fullWidth"
                              flexItem
                            />
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
                            onClick={handleBooking}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Book Now"}
                          </Button>
                        </div>
                      </div>
                      <Divider />
                    </>
                  )}
                </div>
              </div>
            </Grid>
            <Grid size={4}>
              <Card variant="outlined">
                <div className="flex items-center justify-center gap-5 p-6">
                  <Image
                    src={carDetails.companyLogo}
                    alt={carDetails.companyName}
                    className="rounded-full border-[#928B83] border-[2px]"
                    width={110}
                    height={110}
                  />
                  <div>
                    <h3 className="font-bold text-[22px]">
                      {carDetails.companyName}
                    </h3>
                    <img
                      src="/svg/shield.svg"
                      alt="shield"
                      className="inline-block"
                    />
                    <p className="ml-1 inline-block">
                      {carDetails.companyVerified ? "Verified" : "Not Verified"}
                    </p>

                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(carDetails.companyRating)
                              ? "text-yellow-300"
                              : "text-gray-300"
                          } ms-1`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <ul className="flex text-center text-gray-500 border-b border-gray-200 mt-3 w-full">
                  <li className="me-2 w-full">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("daily");
                      }}
                      className={`inline-block w-full p-4 ${
                        activeTab === "daily"
                          ? "text-white bg-[#97AFDE]"
                          : "hover:text-gray-600 hover:bg-gray-50"
                      } rounded-t-lg`}
                    >
                      Daily
                    </a>
                  </li>
                  <li className="me-2 w-full">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("weekly");
                      }}
                      className={`inline-block w-full p-4 ${
                        activeTab === "weekly"
                          ? "text-white bg-[#97AFDE]"
                          : "hover:text-gray-600 hover:bg-gray-50"
                      } rounded-t-lg`}
                    >
                      Weekly
                    </a>
                  </li>
                  <li className="me-2 w-full">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("monthly");
                      }}
                      className={`inline-block w-full p-4 ${
                        activeTab === "monthly"
                          ? "text-white bg-[#97AFDE]"
                          : "hover:text-gray-600 hover:bg-gray-50"
                      } rounded-t-lg`}
                    >
                      Monthly
                    </a>
                  </li>
                </ul>

                {activeTab === "daily" && (
                  <PricingTabContent
                    priceDetails={carDetails.priceDetails}
                    type="daily"
                  />
                )}
                {activeTab === "weekly" && (
                  <PricingTabContent
                    priceDetails={carDetails.priceDetails}
                    type="weekly"
                  />
                )}
                {activeTab === "monthly" && (
                  <PricingTabContent
                    priceDetails={carDetails.priceDetails}
                    type="monthly"
                  />
                )}
              </Card>
              <div className="text-center w-full my-5">
                <span>BOOK DIRECTLY FROM SUPPLIER</span>
                <ButtonGroup size="large" fullWidth>
                  <Button key="one">
                    <EmailOutlinedIcon />
                    Email
                  </Button>
                  <Button key="two" color="success">
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                        clipRule="evenodd"
                      />
                      <path
                        fill="currentColor"
                        d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                      />
                    </svg>
                    Whats app
                  </Button>
                </ButtonGroup>
              </div>
              <div>
                <h3 className="font-bold text-[20px]">Message</h3>
                <TextField
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "100%",
                      backgroundColor: "#F0F2F6",
                      borderRadius: "8px",
                      border: "1px solid #A0A0A0",
                    },
                  }}
                  fullWidth
                  placeholder="Write your message ..."
                  multiline
                  rows={10}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Message
                </Button>
              </div>
              <div className="flex justify-end mt-4">
                <a
                  href="/report"
                  className="text-[#BC1508] flex gap-2 text-[14px]"
                >
                  <svg
                    className="w-6 h-6 text-[#BC1508]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z"
                    />
                  </svg>
                  Report Ad
                </a>
              </div>
            </Grid>
          </Grid>
          <div>
            <div className="flex gap-1 items-center mt-4">
              <svg
                className="w-3 h-3 text-[#b61919]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-[#928B83] text-[12px]">
                {carDetails.location}
              </span>
            </div>
            {isClient && (
              <GoogleMap
                apiKey="AIzaSyDq4XgMsUz8WFY5VCbkwsJwgZ5ZbpPGnHA"
                center={{
                  lat: carDetails.mapLocation?.lat || 25.2048,
                  lng: carDetails.mapLocation?.lng || 55.2708,
                }}
                zoom={14}
                style={{ width: "100%", height: "220px" }}
              />
            )}
          </div>
          <div className="mt-24">
            <div className="flex justify-between mb-5">
              <div className="flex gap-2 items-center">
                <span className="font-bold">Review & rating</span>
                <span>{carDetails.rating}</span>
                <span>
                  <svg
                    className="w-6 h-6 text-[#EAAB4E]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                </span>
                <span className="cursor-pointer text-[#0A84FF] underline">
                  rating details
                </span>
              </div>
              <span className="cursor-pointer text-[14px] text-[#8313B2]">
                View more reviews
              </span>
            </div>
            <Grid2 container spacing={2}>
              {carDetails.reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </Grid2>
            {isLoggedIn && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ color: "#fff", px: 6 }}
                  onClick={handleClickOpenAdd}
                >
                  Write Review & Rating
                </Button>
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-start flex-col mt-8">
              <h1 className="text-[20px]">Similar Car Rental Options</h1>
              <span className="text-[16px]">
                Are you interested in a similar leasing model?
              </span>
            </div>
            <Grid2
              container
              rowSpacing={3}
              columnSpacing={{ xs: 2, sm: 3, md: 8 }}
              className="mt-4"
            >
              {carDetails.similarCars.map((car) => (
                <Grid2 key={car.id} size={4}>
                  <CarCardType1 car={car} />
                </Grid2>
              ))}
            </Grid2>
          </div>
        </Container>
      </div>
      <Footer />

      <BootstrapDialog
        onClose={handleCloseAdd}
        open={openAdd}
        maxWidth={"sm"}
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseAdd}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex flex-col gap-5">
            <div className="flex gap-10">
              <span className="w-[200px]">Value for price</span>
              <Rating name="size-medium" defaultValue={0} />
            </div>
            <div className="flex gap-10">
              <span className="w-[200px]">Easy to find</span>
              <Rating name="size-medium" defaultValue={0} />
            </div>
            <div className="flex gap-10">
              <span className="w-[200px]">Car cleanliness</span>
              <Rating name="size-medium" defaultValue={0} />
            </div>
            <div className="flex gap-10">
              <span className="w-[200px]">Helpfulness</span>
              <Rating name="size-medium" defaultValue={0} />
            </div>
            <div className="flex gap-10">
              <span className="w-[200px]">Car condition</span>
              <Rating name="size-medium" defaultValue={0} />
            </div>
            <span>Write Your Review</span>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  height: "100%",
                  backgroundColor: "#F0F2F6",
                  borderRadius: "8px",
                  border: "1px solid #A0A0A0",
                },
              }}
              fullWidth
              placeholder="Write your viewpoint here..."
              multiline
              rows={10}
            />
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button variant="contained" color="secondary">
              Send
            </Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </LocalizationProvider>
  );
};

export default CarDetail;

interface ReviewItemProps {
  review: {
    id: number;
    userId: number;
    userName: string;
    userImage: string;
    rating: number;
    comment: string;
    date: string;
  };
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <Grid2 size={3}>
      <div className="bg-[#F0F2F6] border border-[#A0A0A0] rounded-lg py-6 px-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={review.userImage}
            alt={`${review.userName} profile`}
            className="rounded-full w-[100px] h-[100px]"
          />
          <div>
            <h4 className="text-[20px]">{review.userName}</h4>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? "text-yellow-300" : "text-gray-300"
                  } ms-1`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <p>{review.comment}</p>
        <div className="text-right mt-5">
          <span className="text-[#A0A0A0]">{review.date}</span>
        </div>
      </div>
    </Grid2>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
