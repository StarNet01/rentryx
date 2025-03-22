import HttpClient from "../httpClient/HttpClient";

export interface CarFilterParams {
  pickUpDate?: string;
  dropOffDate?: string;
  pickUpTime?: string;
  dropOffTime?: string;
  location?: string;
  vehicleType?: string;
  color?: string;
  passengers?: number;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
  valueForPrice?: number;
  easyToFind?: number;
  carCleanliness?: number;
  helpfulness?: number;
  carCondition?: number;
}

export interface CarDetails extends Car {
  reviews: Review[];
  similarCars: Car[];
  companyName: string;
  companyLogo: string;
  companyRating: number;
  companyVerified: boolean;
  priceDetails: {
    daily: {
      price: number;
      mileageLimit: string;
      insurance: string;
      additionalMileageCharge: number;
    };
    weekly: {
      price: number;
      mileageLimit: string;
      insurance: string;
      additionalMileageCharge: number;
    };
    monthly: {
      price: number;
      mileageLimit: string;
      insurance: string;
      additionalMileageCharge: number;
    };
  };
}

export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  transmission: string;
  fuelType: string;
  seats: number;
  pricePerDay: number;
  location: string;
  images: string[];
  available: boolean;
  rating: number;
  vehicleType: string;
  description: string;
  mileage?: string;
  gccSpecs?: boolean;
  insurance?: boolean;
  luggageCapacity?: number;
  doors?: number;
  mapLocation?: {
    lat: number;
    lng: number;
  };
}

export interface CarsResponse {
  data: Car[];
  total: number;
  page: number;
  limit: number;
}

class CarsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  async getCars(filters: CarFilterParams = {}): Promise<CarsResponse> {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString());
        }
      });

      const queryString = queryParams.toString();
      const endpoint = `cars${queryString ? `?${queryString}` : ""}`;

      const response = await this.httpClient.get<CarsResponse>(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      return {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
      };
    }
  }

  async getCarById(id: number): Promise<Car | null> {
    try {
      const response = await this.httpClient.get<Car>(`cars/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching car with ID ${id}:`, error);
      return null;
    }
  }

  async getMockCars(filters: CarFilterParams = {}): Promise<CarsResponse> {
    const mockCars: Car[] = [
      {
        id: 1,
        name: "Mercedes-Benz G63 AMG",
        brand: "Mercedes-Benz",
        model: "G63 AMG",
        year: 2022,
        color: "Black",
        transmission: "Automatic",
        fuelType: "Gasoline",
        seats: 5,
        pricePerDay: 1200,
        location: "Dubai",
        images: ["/car/test32.jpg"],
        available: true,
        rating: 4.9,
        vehicleType: "SUV",
        description:
          "A powerful luxury SUV with exceptional performance and style.",
        mileage: "250 km",
        gccSpecs: true,
        insurance: true,
        luggageCapacity: 2,
        doors: 4,
      },
      {
        id: 2,
        name: "Range Rover Vogue VR",
        brand: "Range Rover",
        model: "Vogue VR",
        year: 2023,
        color: "White",
        transmission: "Automatic",
        fuelType: "Diesel",
        seats: 5,
        pricePerDay: 1500,
        location: "Dubai",
        images: ["/car/test32.jpg"],
        available: true,
        rating: 4.8,
        vehicleType: "SUV",
        description:
          "Luxury SUV with premium features and exceptional comfort.",
        mileage: "150 km",
        gccSpecs: true,
        insurance: true,
        luggageCapacity: 2,
        doors: 5,
      },
      {
        id: 3,
        name: "Lamborghini Huracan LP",
        brand: "Lamborghini",
        model: "Huracan LP",
        year: 2022,
        color: "Yellow",
        transmission: "Automatic",
        fuelType: "Gasoline",
        seats: 2,
        pricePerDay: 3000,
        location: "Dubai",
        images: ["/car/test32.jpg"],
        available: true,
        rating: 5.0,
        vehicleType: "Sport",
        description:
          "High-performance sports car with aggressive styling and blistering speed.",
        mileage: "100 km",
        gccSpecs: true,
        insurance: true,
        luggageCapacity: 1,
        doors: 2,
      },
      {
        id: 4,
        name: "Rolls Royce Cullinan",
        brand: "Rolls Royce",
        model: "Cullinan",
        year: 2023,
        color: "White",
        transmission: "Automatic",
        fuelType: "Gasoline",
        seats: 4,
        pricePerDay: 4000,
        location: "Abu Dhabi",
        images: ["/car/test32.jpg"],
        available: true,
        rating: 5.0,
        vehicleType: "Luxury",
        description:
          "The epitome of luxury SUVs, offering unmatched comfort and prestige.",
        mileage: "unlimited",
        gccSpecs: true,
        insurance: true,
        luggageCapacity: 2,
        doors: 5,
      },
      {
        id: 5,
        name: "Cyberpunk Corvette",
        brand: "Chevrolet",
        model: "Corvette Custom",
        year: 2023,
        color: "Black",
        transmission: "Automatic",
        fuelType: "Electric",
        seats: 2,
        pricePerDay: 2500,
        location: "Dubai",
        images: ["/car/test32.jpg"],
        available: true,
        rating: 4.7,
        vehicleType: "Sport",
        description:
          "A futuristic custom Corvette with unique styling and advanced technology.",
        mileage: "200 km",
        gccSpecs: true,
        insurance: true,
        luggageCapacity: 1,
        doors: 2,
      },
      {
        id: 6,
        name: "Mercedes-Benz AMG GT63",
        brand: "Mercedes-Benz",
        model: "AMG GT63",
        year: 2022,
        color: "Silver",
        transmission: "Automatic",
        fuelType: "Gasoline",
        seats: 4,
        pricePerDay: 1800,
        location: "Sharjah",
        images: ["/car/test32.jpg"],
        available: true,
        rating: 4.8,
        vehicleType: "Luxury",
        description:
          "High-performance luxury sedan with aggressive styling and comfort.",
        mileage: "unlimited",
        gccSpecs: true,
        insurance: true,
        luggageCapacity: 2,
        doors: 4,
      },
    ];

    let filteredCars = [...mockCars];

    if (filters.vehicleType) {
      filteredCars = filteredCars.filter(
        (car) => car.vehicleType === filters.vehicleType
      );
    }

    if (filters.color) {
      filteredCars = filteredCars.filter((car) => car.color === filters.color);
    }

    if (filters.passengers) {
      filteredCars = filteredCars.filter(
        (car) => car.seats >= Number(filters.passengers)
      );
    }

    if (filters.transmission) {
      filteredCars = filteredCars.filter(
        (car) => car.transmission === filters.transmission
      );
    }

    if (filters.minPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.pricePerDay >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.pricePerDay <= Number(filters.maxPrice)
      );
    }

    if (filters.location) {
      filteredCars = filteredCars.filter(
        (car) => car.location === filters.location
      );
    }

    if (filters.sort) {
      switch (filters.sort) {
        case "price_asc":
          filteredCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
          break;
        case "price_desc":
          filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
          break;
        case "name_asc":
          filteredCars.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "rating_desc":
          filteredCars.sort((a, b) => b.rating - a.rating);
          break;
        case "year_desc":
          filteredCars.sort((a, b) => b.year - a.year);
          break;
        default:
          break;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      data: filteredCars,
      total: filteredCars.length,
      page: filters.page || 1,
      limit: filters.limit || 3, 
    };
  }

  async getMockCarById(id: number): Promise<CarDetails | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const carsResponse = await this.getMockCars();
    const mockCar = carsResponse.data.find((car) => car.id === id);

    if (!mockCar) {
      return null;
    }

    const mockReviews: Review[] = [
      {
        id: 1,
        userId: 101,
        userName: "Michael Sheily",
        userImage: "/Ellipse1.jpg",
        rating: 4,
        comment:
          "Lorem ipsum dolor sit amet ich koy consectetur. Scelerisque urna velai sit dolor fringilla volutpat lectusian amet. Integer sed pretium odiom a lectus at malesuada sed eget",
        date: "02 Jan 2024",
        valueForPrice: 4,
        easyToFind: 5,
        carCleanliness: 4,
        helpfulness: 3,
        carCondition: 4,
      },
      {
        id: 2,
        userId: 102,
        userName: "Sarah Johnson",
        userImage: "/Ellipse1.jpg",
        rating: 5,
        comment:
          "Excellent car condition and customer service. Would definitely rent again!",
        date: "15 Feb 2024",
        valueForPrice: 5,
        easyToFind: 4,
        carCleanliness: 5,
        helpfulness: 5,
        carCondition: 5,
      },
      {
        id: 3,
        userId: 103,
        userName: "Ali Mohammed",
        userImage: "/Ellipse1.jpg",
        rating: 3,
        comment:
          "Car was good but pickup process was a bit complicated. Otherwise happy with the service.",
        date: "30 Jan 2024",
        valueForPrice: 3,
        easyToFind: 2,
        carCleanliness: 4,
        helpfulness: 3,
        carCondition: 4,
      },
      {
        id: 4,
        userId: 104,
        userName: "Jessica Kim",
        userImage: "/Ellipse1.jpg",
        rating: 4,
        comment:
          "Great value for price. The car was clean and comfortable. Will recommend to friends.",
        date: "05 Mar 2024",
        valueForPrice: 5,
        easyToFind: 4,
        carCleanliness: 4,
        helpfulness: 4,
        carCondition: 3,
      },
    ];

    const similarCars = carsResponse.data
      .filter((car) => car.id !== id && car.vehicleType === mockCar.vehicleType)
      .slice(0, 3);

    if (similarCars.length < 3) {
      const otherCars = carsResponse.data
        .filter(
          (car) => car.id !== id && car.vehicleType !== mockCar.vehicleType
        )
        .slice(0, 3 - similarCars.length);

      similarCars.push(...otherCars);
    }

    const carDetails: CarDetails = {
      ...mockCar,
      reviews: mockReviews,
      similarCars: similarCars,
      companyName: "Luxury Car Rentals",
      companyLogo: "/test.jpg",
      companyRating: 4.2,
      companyVerified: true,
      priceDetails: {
        daily: {
          price: mockCar.pricePerDay,
          mileageLimit: "200km",
          insurance: "Basic Comprehensive",
          additionalMileageCharge: 15,
        },
        weekly: {
          price: mockCar.pricePerDay * 6, 
          mileageLimit: "1500km",
          insurance: "Premium Comprehensive",
          additionalMileageCharge: 12,
        },
        monthly: {
          price: mockCar.pricePerDay * 25,
          mileageLimit: "3000km",
          insurance: "Full Comprehensive",
          additionalMileageCharge: 10,
        },
      },
    };

    return carDetails;
  }
}

const carsService = new CarsService();

export default carsService;
