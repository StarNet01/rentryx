import HttpClient from "../httpClient/HttpClient";

export interface BookingRequest {
  carId: string | number;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  dropOffTime: string;
}

export interface BookingResponse {
  id: string;
  carId: string | number;
  userId: string | number;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  dropOffTime: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

class BookingService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
    try {
      const response = await this.httpClient.post<BookingResponse>(
        "bookings",
        bookingData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }


  async createMockBooking(
    bookingData: BookingRequest
  ): Promise<BookingResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const bookingId = Math.random().toString(36).substring(2, 10);

    const pickUpDate = new Date(bookingData.pickUpDate);
    const dropOffDate = new Date(bookingData.dropOffDate);
    const days = Math.ceil(
      (dropOffDate.getTime() - pickUpDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dailyRate = 1000;
    const totalPrice = days * dailyRate;

    return {
      id: bookingId,
      carId: bookingData.carId,
      userId: "12345", // Mock user ID
      pickUpDate: bookingData.pickUpDate,
      dropOffDate: bookingData.dropOffDate,
      pickUpTime: bookingData.pickUpTime,
      dropOffTime: bookingData.dropOffTime,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  }
}

const bookingService = new BookingService();
export default bookingService;
