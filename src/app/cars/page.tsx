"use client";
import Footer from "@/modules/landing/layouts/Footer";
import Header from "@/modules/landing/layouts/Header";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  Slider,
  Typography,
  Button,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import useUrlParams from "@/modules/share/hooks/useUrlParams";
import carsService, {
  Car,
  CarFilterParams,
  CarsResponse,
} from "@/modules/share/services/cars/carsService";

const GoogleMapComponent = dynamic(
  () => import("@/modules/share/components/GoogleMap"),
  { ssr: false }
);

import { useRouter } from "next/navigation";

interface ExtendedCarFilterParams extends CarFilterParams {
  sort?: string;
}

function valuetext(value: number) {
  return `${value}K`;
}

const minDistance = 10;

const marks = [
  {
    value: 0,
    label: "Min",
  },
  {
    value: 100,
    label: "Max",
  },
];

const locationOptions = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"];

const vehicleTypeOptions = ["SUV", "Sedan", "Coupe", "Luxury", "Sport"];

const colorOptions = ["Black", "White", "Red", "Blue", "Silver"];

const passengerOptions = [2, 4, 5, 7];

const transmissionOptions = ["Automatic", "Manual"];

const sortOptions = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Rating: High to Low", value: "rating_desc" },
  { label: "Year: New to Old", value: "year_desc" },
];

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getAllUrlParams, setUrlParams } = useUrlParams();

  const [showFullMap, setShowFullMap] = useState<boolean>(false);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const defaultPosition = { lat: 25.2048, lng: 55.2708 }; 

  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);
  const [currentSort, setCurrentSort] = useState<string>("price_asc");

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCars, setTotalCars] = useState<number>(0);
  const [visibleCars, setVisibleCars] = useState<number>(6);

  const [filters, setFilters] = useState<ExtendedCarFilterParams>({
    limit: 10,
  });

  const handlePriceChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ]);
    } else {
      setPriceRange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ]);
    }

    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange[0] * 50, 
      maxPrice: priceRange[1] * 50,
    }));


    updateUrlWithFilters({
      ...filters,
      minPrice: priceRange[0] * 50,
      maxPrice: priceRange[1] * 50,
    });
  };

  const handleOpenSortMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSort(event.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setAnchorElSort(null);
  };

  const handleSortChange = (sortValue: string) => {
    setCurrentSort(sortValue);
    handleCloseSortMenu();

    updateUrlWithFilters({
      ...filters,
      sort: sortValue,
    });

    applySorting(cars, sortValue);
  };

  const handleFilterChange = (filterType: string, value: any) => {
    const updatedFilters = {
      ...filters,
      [filterType]: value,
    };

    setFilters(updatedFilters);

    updateUrlWithFilters(updatedFilters);
  };

  const updateUrlWithFilters = (updatedFilters: ExtendedCarFilterParams) => {
    const cleanFilters: Record<string, string> = {};

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanFilters[key] = value.toString();
      }
    });

    setUrlParams(cleanFilters);
  };

  const handleLoadMore = () => {
    setVisibleCars((prev) => Math.min(prev + 6, cars.length));
  };

  const applySorting = (carsArray: Car[], sortValue: string) => {
    const sortedCars = [...carsArray];

    switch (sortValue) {
      case "price_asc":
        sortedCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price_desc":
        sortedCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "name_asc":
        sortedCars.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating_desc":
        sortedCars.sort((a, b) => b.rating - a.rating);
        break;
      case "year_desc":
        sortedCars.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    setCars(sortedCars);
  };

  const generateRandomLocation = () => {
    const dubaiLat = 25.2048;
    const dubaiLng = 55.2708;

    const latOffset = (Math.random() - 0.5) * 0.1; 
    const lngOffset = (Math.random() - 0.5) * 0.1;

    return {
      lat: dubaiLat + latOffset,
      lng: dubaiLng + lngOffset,
    };
  };

  useEffect(() => {
    if (cars.length > 0 && !cars[0].mapLocation) {
      const carsWithLocations = cars.map((car) => ({
        ...car,
        mapLocation: generateRandomLocation(),
      }));
      setCars(carsWithLocations);
    }
  }, [cars]);

  useEffect(() => {
    const urlParams = getAllUrlParams();
    const initialFilters: ExtendedCarFilterParams = { ...filters };

    Object.entries(urlParams).forEach(([key, value]) => {
      if (["minPrice", "maxPrice", "passengers"].includes(key) && value) {
        initialFilters[key as keyof ExtendedCarFilterParams] = Number(value);
      } else {
        initialFilters[key as keyof ExtendedCarFilterParams] = value;
      }
    });

    if (initialFilters.minPrice || initialFilters.maxPrice) {
      setPriceRange([
        initialFilters.minPrice ? initialFilters.minPrice / 50 : 0,
        initialFilters.maxPrice ? initialFilters.maxPrice / 50 : 100,
      ]);
    }

    if (initialFilters.sort) {
      setCurrentSort(initialFilters.sort as string);
    }

    setFilters(initialFilters);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await carsService.getMockCars(filters);

        const sortedCars = [...response.data];
        applySorting(sortedCars, currentSort);

        setCars(sortedCars);
        setTotalCars(response.total);
        setVisibleCars(Math.min(6, response.data.length));
      } catch (error) {
        console.error("Error fetching cars:", error);
        setCars([]);
        setTotalCars(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters, currentSort]);

  return (
    <>
      <Header />
      <div className="flex gap-5 mt-24 px-16 mb-16">
        <div className="flex flex-col w-2/12">
          <h2 className="text-[24px]">Filter</h2>

          <Accordion sx={{ boxShadow: "none", "&:before": { height: "0px" } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" fontWeight="bold">
                Location
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col">
                {locationOptions.map((location) => (
                  <FormControlLabel
                    key={location}
                    control={
                      <Checkbox
                        checked={filters.location === location}
                        onChange={(e) =>
                          handleFilterChange(
                            "location",
                            e.target.checked ? location : undefined
                          )
                        }
                      />
                    }
                    label={location}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ boxShadow: "none", "&:before": { height: "0px" } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" fontWeight="bold">
                Vehicle type
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col">
                {vehicleTypeOptions.map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        checked={filters.vehicleType === type}
                        onChange={(e) =>
                          handleFilterChange(
                            "vehicleType",
                            e.target.checked ? type : undefined
                          )
                        }
                      />
                    }
                    label={type}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ boxShadow: "none", "&:before": { height: "0px" } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" fontWeight="bold">
                Color
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col">
                {colorOptions.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={
                      <Checkbox
                        checked={filters.color === color}
                        onChange={(e) =>
                          handleFilterChange(
                            "color",
                            e.target.checked ? color : undefined
                          )
                        }
                      />
                    }
                    label={color}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ boxShadow: "none", "&:before": { height: "0px" } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" fontWeight="bold">
                No. of Passengers
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col">
                {passengerOptions.map((num) => (
                  <FormControlLabel
                    key={num}
                    control={
                      <Checkbox
                        checked={filters.passengers === num}
                        onChange={(e) =>
                          handleFilterChange(
                            "passengers",
                            e.target.checked ? num : undefined
                          )
                        }
                      />
                    }
                    label={`${num}+ Passengers`}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ boxShadow: "none", "&:before": { height: "0px" } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" fontWeight="bold">
                Transmission
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col">
                {transmissionOptions.map((trans) => (
                  <FormControlLabel
                    key={trans}
                    control={
                      <Checkbox
                        checked={filters.transmission === trans}
                        onChange={(e) =>
                          handleFilterChange(
                            "transmission",
                            e.target.checked ? trans : undefined
                          )
                        }
                      />
                    }
                    label={trans}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <div className="pl-4 flex flex-col gap-3">
            <Typography component="span" fontWeight="bold">
              Price
            </Typography>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={priceRange}
              color="secondary"
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              marks={marks}
            />
          </div>
        </div>

        <Divider flexItem orientation="vertical" />

        <div className="flex gap-5 w-full">
          <div>
            <div className="flex justify-between">
              <span
                onClick={handleOpenSortMenu}
                className="font-bold flex cursor-pointer"
              >
                Sort{" "}
                <svg
                  className="w-6 h-6 text-gray-80"
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
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </span>

              {!showFullMap && (
                <div>
                  <IconButton onClick={() => setIsGridView(false)}>
                    <ViewAgendaIcon
                      sx={{ color: !isGridView ? "#8313B2" : "#A0A0A0" }}
                    />
                  </IconButton>
                  <IconButton onClick={() => setIsGridView(true)}>
                    <GridViewRoundedIcon
                      sx={{ color: isGridView ? "#8313B2" : "#A0A0A0" }}
                    />
                  </IconButton>
                </div>
              )}
            </div>

    
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <>
                {showFullMap ? (
                  <div className="flex flex-col overflow-y-scroll gap-3 max-h-[900px] w-full">
                    {cars.slice(0, visibleCars).map((car) => (
                      <CardView key={car.id} car={car} isGridView={false} />
                    ))}

              
                    {visibleCars < cars.length && (
                      <div className="flex justify-center my-4">
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleLoadMore}
                        >
                          Load More
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {isGridView ? (
                      <div className="flex flex-col overflow-y-scroll gap-3 max-h-[900px] w-full">
                        <Grid2 container spacing={2} gap={2}>
                          {cars.slice(0, visibleCars).map((car) => (
                            <Grid2 key={car.id} size={6}>
                              <CardView car={car} isGridView={true} />
                            </Grid2>
                          ))}
                        </Grid2>

                 
                        {visibleCars < cars.length && (
                          <div className="flex justify-center my-4">
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={handleLoadMore}
                            >
                              Load More
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col overflow-y-scroll gap-3 max-h-[900px] w-full">
                        {cars.slice(0, visibleCars).map((car) => (
                          <CardView key={car.id} car={car} isGridView={false} />
                        ))}

                
                        {visibleCars < cars.length && (
                          <div className="flex justify-center my-4">
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={handleLoadMore}
                            >
                              Load More
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div className="min-w-[200px] w-full">
            <div className="flex justify-end mb-4">
              {showFullMap ? (
                <span
                  className="cursor-pointer text-[#0A84FF] underline"
                  onClick={() => setShowFullMap(false)}
                >
                  Close Map
                </span>
              ) : (
                <span
                  className="cursor-pointer text-[#0A84FF] underline"
                  onClick={() => setShowFullMap(true)}
                >
                  View Map
                </span>
              )}
            </div>

            <GoogleMapComponent
              apiKey="AIzaSyCdSKEDRzywyrNGIQB_PUZZ6NG2_KbIM9Q"
              center={defaultPosition}
              zoom={12}
              markers={cars.map((car) => ({
                id: car.id.toString(),
                position: car.mapLocation || generateRandomLocation(),
                title: car.name,
                onClick: () => router.push(`/cars/detail?id=${car.id}`),
              }))}
              style={{ width: "100%", height: "900px" }}
            />
          </div>
        </div>
      </div>

      <Footer />


      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElSort}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElSort)}
        onClose={handleCloseSortMenu}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            selected={currentSort === option.value}
          >
            <Typography sx={{ textAlign: "center" }}>{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Page;

const CardView = ({ car, isGridView }: { car: Car; isGridView: boolean }) => {
  const router = useRouter();

  if (isGridView) {
    return (
      <div
        className="bg-[#ECF2F3] border border-[#A0A0A0] rounded-xl cursor-pointer"
        onClick={() => router.push(`/cars/detail?id=${car.id}`)}
      >
        <img
          src={car.images[0] || "/car/test32.jpg"}
          alt="car img"
          className="w-full"
        />
        <div className="py-4 px-5">
          <span>{car.name} </span>
          <span>{car.year}</span>
          <Typography variant="caption" component="h6" mb={2} color="gray">
            {car.location}, UAE
          </Typography>
          <Divider />
          <div className="flex gap-1 items-center py-3">
            <Typography variant="subtitle1">Price: </Typography>
            <Typography variant="subtitle2">AED</Typography>
            <Typography variant="subtitle2">
              {car.pricePerDay.toFixed(0)}
            </Typography>
            <Typography variant="caption" color="gray">
              /day
            </Typography>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <a
        href={`/cars/detail?id=${car.id}`}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 min-w-[713px]"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={car.images[0] || "/Rectangle12882.jpg"}
          alt="img"
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <h5 className="mb-2 font-bold tracking-tight text-gray-900 text-[16px]">
                {car.name}
              </h5>
              <h5 className="mb-2 font-bold tracking-tight text-gray-900 text-[16px]">
                {car.year}
              </h5>
              <div className="flex gap-1 items-center">
                <svg
                  className="w-4 h-4 text-[#b61919]"
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
                  {car.location}, UAE
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <img src="/Rectangle13190.png" alt="img" />
            <span>company name</span>
          </div>
          <div className="flex gap-14 mt-6">
            <ul className="space-y-3 ul-feat">
              <li>
                <img src="/svg/car(8).svg" alt="icon" />
                <span>{car.vehicleType}</span>
              </li>
              <li>
                <img src="/svg/car-seat1).svg" alt="icon" />
                <span>{car.seats} Seat</span>
              </li>
              <li>
                <img src="/svg/car-door(3).svg" alt="icon" />
                <span>{car.doors || 4} Doors</span>
              </li>
              <li>
                <img src="/svg/gearbox)1.svg" alt="icon" />
                <span>{car.transmission}</span>
              </li>
            </ul>
            <ul className="space-y-3 ul-feat">
              <li>
                <img src="/svg/speed-meter(1).svg" alt="icon" />
                <span>Mileage: {car.mileage || "250 km"}</span>
              </li>
              <li>
                <img src="/svg/inspection1.svg" alt="icon" />
                <span>GCC Specs: {car.gccSpecs ? "Yes" : "No"}</span>
              </li>
              <li>
                <img src="/svg/insurance1.svg" alt="icon" />
                <span>Insurance: {car.insurance ? "Yes" : "No"}</span>
              </li>
              <li>
                <img src="/svg/luggage)1.svg" alt="icon" />
                <span>{car.luggageCapacity || 2} luggage bag</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-between items-center">
            <span>Price: </span>
            <div className="flex gap-3">
              <span>AED</span>
              <span>{car.pricePerDay.toFixed(0)}</span>
              <span className="text-[#928B83]">/day</span>
            </div>
            <Button variant="contained" color="secondary">
              See Details
            </Button>
          </div>
        </div>
      </a>
    );
  }
};
