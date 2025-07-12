# 🚘 Rent Ryx – Car Rental Frontend Project

**Rent Ryx** is a modern and responsive car rental website built with **Next.js**, **TypeScript**, and **Material UI**. This repository contains the frontend codebase for the **Rent Ryx** platform, enabling users to search and rent vehicles based on flexible filters such as date, time, location, and vehicle features.
> If you're searching for **Rent Ryx source code**, you're in the right place!

---

## 🔥 Why Rent Ryx?

Rent Ryx offers a sleek, fast, and mobile-friendly interface for browsing and renting vehicles. Whether you're a traveler, a developer, or a company looking to extend a car rental system, this project serves as a solid base to build upon.

---

## 🚗 Key Features of Rent Ryx

- 🗓️ Search filters based on date & time  
- 🚘 Vehicle listing page with powerful filtering  
- 🔗 URLParams support to retain filter states  
- 🧪 Mock data support for backend-independent development  
- 📱 Fully responsive design with mobile-first UX

---

## 📁 Project Structure



```
src/
├── app/                      # Main app routing
│   ├── cars/                # Car listing page with filtering
│   │   ├── detail/         # Car detail page
│   │   └── page.tsx         # Main cars page
│   └── page.tsx            # Home page
├── modules/                # Application modules
│   ├── landing/           # Components for the landing/home page
│   │   ├── components/    # Shared components for the landing page
│   │   ├── layouts/         # Shared layouts like header and footer
│   │   └── pages/           # Pages for public sections
│   └── share/             # Shared components and services
│       ├── hooks/         # Custom hooks used in the app
│       └── services/       # API communication services
```


---

## 🔗 API Structure

The following APIs are planned for backend integration:

### 📄 Get Car List with Filters
These endpoints are designed for backend integration with Rent Ryx:

**Endpoint:** `GET /cars`

**Query Parameters:**

- `pickUpDate`: Car pickup date (YYYY-MM-DD)  
- `dropOffDate`: Car return date (YYYY-MM-DD)  
- `pickUpTime`: Car pickup time (HH:MM)  
- `dropOffTime`: Car return time (HH:MM)  
- `location`: Geographical location  
- `vehicleType`: Type of vehicle  
- `color`: Car color  
- `passengers`: Minimum number of passengers  
- `transmission`: Transmission type  
- `minPrice`: Minimum price  
- `maxPrice`: Maximum price  
- `page`: Page number (default: 1)  
- `limit`: Items per page (default: 10)

---

### 📄 Get Car Details

**Endpoint:** `GET /cars/:id`

---

## 🛠 How to Run

1. Install dependencies:

```bash
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser.

🧑‍💻 Development Notes
To implement the backend, follow the API structure described above.

Until the real API is ready, the app uses the getMockCars method in carsService.

You can switch between real and mock data by changing the call from carsService.getMockCars to carsService.getCars.

🧰 Technologies Used
Next.js

React

TypeScript

Material UI

TailwindCSS

dayjs

Leaflet (for maps)

