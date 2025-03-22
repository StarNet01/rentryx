import HttpClient from "../httpClient/HttpClient";
import { CarDetails } from "./carsService";

class CarDetailService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  async getCarDetailsById(id: number | string): Promise<CarDetails | null> {
    try {
      const response = await this.httpClient.get<CarDetails>(
        `cars/${id}/details`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching car details with ID ${id}:`, error);
      return null;
    }
  }

  async getMockCarDetailsById(id: number | string): Promise<CarDetails | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const carId = typeof id === "string" ? parseInt(id, 10) : id;

    return {
      id: carId,
      name: "Mercedes Benz AMG G63",
      brand: "Mercedes-Benz",
      model: "AMG G63",
      year: 2024,
      color: "Black",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 5,
      pricePerDay: 1500,
      location: "1 Street 8A, Za'abeel 2, Dubai, ARE",
      images: ["/car/test1.jpg", "/car/test2.jpg", "/car/test3.jpg"],
      available: true,
      rating: 4.5,
      vehicleType: "SUV",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      mileage: "250 km",
      gccSpecs: true,
      insurance: true,
      luggageCapacity: 2,
      doors: 4,
      mapLocation: {
        lat: 25.2048,
        lng: 55.2708,
      },
      reviews: [
        {
          id: 1,
          userId: 101,
          userName: "Michael Sheily",
          userImage: "/Ellipse1.jpg",
          rating: 4,
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
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
      ],
      similarCars: [
        {
          id: 2,
          name: "Range Rover Sport HSE",
          brand: "Land Rover",
          model: "Range Rover Sport HSE",
          year: 2023,
          color: "White",
          transmission: "Automatic",
          fuelType: "Diesel",
          seats: 5,
          pricePerDay: 1200,
          location: "Dubai",
          images: ["/car/test32.jpg"],
          available: true,
          rating: 4.2,
          vehicleType: "SUV",
          description: "Luxury SUV with premium features",
        },
        {
          id: 3,
          name: "BMW X7",
          brand: "BMW",
          model: "X7",
          year: 2023,
          color: "Black",
          transmission: "Automatic",
          fuelType: "Gasoline",
          seats: 7,
          pricePerDay: 1100,
          location: "Dubai",
          images: ["/car/test32.jpg"],
          available: true,
          rating: 4.3,
          vehicleType: "SUV",
          description: "Spacious luxury SUV with the latest technology",
        },
        {
          id: 4,
          name: "Audi Q8",
          brand: "Audi",
          model: "Q8",
          year: 2023,
          color: "Blue",
          transmission: "Automatic",
          fuelType: "Gasoline",
          seats: 5,
          pricePerDay: 950,
          location: "Dubai",
          images: ["/car/test32.jpg"],
          available: true,
          rating: 4.4,
          vehicleType: "SUV",
          description: "Sporty SUV with elegant design",
        },
      ],
      companyName: "Luxury Car Rentals",
      companyLogo: "/test.jpg",
      companyRating: 4.2,
      companyVerified: true,
      priceDetails: {
        daily: {
          price: 1500,
          mileageLimit: "200km",
          insurance: "Basic Comprehensive",
          additionalMileageCharge: 15,
        },
        weekly: {
          price: 9000, 
          mileageLimit: "1500km",
          insurance: "Premium Comprehensive",
          additionalMileageCharge: 12,
        },
        monthly: {
          price: 37500, 
          mileageLimit: "3000km",
          insurance: "Full Comprehensive",
          additionalMileageCharge: 10,
        },
      },
    };
  }
}

const carDetailService = new CarDetailService();

export default carDetailService;
