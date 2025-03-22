"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, Divider, Grid2 } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import { useRouter } from "next/navigation";
import MonthlyChart from "@/modules/share/components/MChart/MChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Business",
      data: [30, 25, 40, 35, 50, 55, 60, 45, 60, 70, 80, 90],
      borderColor: "#059344",
      tension: 0,
      fill: false,
    },
    {
      label: "Economy",
      data: [40, 45, 50, 55, 45, 60, 75, 85, 95, 80, 70, 60],
      borderColor: "#EC004F",
      tension: 0,
      fill: false,
    },
    {
      label: "Luxury",
      data: [25, 35, 55, 60, 65, 75, 85, 95, 100, 95, 80, 70],
      borderColor: "#14A2F7",
      tension: 0,
      fill: false,
    },
    {
      label: "Supercar",
      data: [60, 50, 40, 30, 20, 30, 50, 70, 90, 110, 130, 150],
      borderColor: "#F98E10",
      tension: 0,
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Monthly chart",
    },
    tooltip: {
      mode: "nearest" as const,
      intersect: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Car Type",
      },
      beginAtZero: true,
    },
  },
};

const page = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const router = useRouter();

  const { data: MonthlyChartData, isLoading: isLoadingMonthlyChartData } =
    useSWR(
      `company_vehicle_chart?type=${isMonthly ? "month" : "day"}`,
      (url: string) => HttpClient.getInstance().fetcher(url)
    );

  const { data: company_vehicle_category_count } = useSWR(
    `company_vehicle_category_count`,
    (url: string) => HttpClient.getInstance().fetcher(url)
  );

  const { data: company_cars } = useSWR(
    `company_cars/${1}`, // TODO handle ID
    (url: string) => HttpClient.getInstance().fetcher(url)
  );

  return (
    <DashboardLayout panelType="company">
      <div className="flex justify-between items-center mb-8">
        <div className="flex justify-between items-center">
          {!isLoadingMonthlyChartData && (
            <>
              <div className="flex flex-col gap-3 items-start justify-start h-full">
                <h2
                  className={isMonthly ? "font-bold" : "cursor-pointer"}
                  onClick={() => setIsMonthly(true)}
                >
                  <svg
                    className={
                      !isMonthly
                        ? "hidden"
                        : "w-6 h-6 text-gray-800 inline-block"
                    }
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Monthly chart
                </h2>
                <h2
                  className={!isMonthly ? "font-bold" : "cursor-pointer"}
                  onClick={() => setIsMonthly(false)}
                >
                  <svg
                    className={
                      isMonthly
                        ? "hidden"
                        : "w-6 h-6 text-gray-800 inline-block"
                    }
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Daily Chart
                </h2>
              </div>
              <div>
                {MonthlyChartData && (
                  <MonthlyChart
                    MonthlyChartData={MonthlyChartData}
                    isMonthly={isMonthly}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div>
          <div className="flex gap-3">
            {company_vehicle_category_count &&
              company_vehicle_category_count.map((item: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="rounded-3xl border-[#97AFDE] border-[3px] text-center p-5 max-h-[104px]"
                  >
                    <p>{item.title}</p>
                    <h2 className="text-[#8313B2] text-2xl font-bold">
                      {item.count}
                    </h2>
                    <p className="text-[10px]">Total Cars</p>
                  </div>
                );
              })}
          </div>

          <Button
            onClick={() => {
              router.push("/dashboard/company/vehicle/add");
            }}
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 5 }}
          >
            Create Ad
          </Button>
        </div>
      </div>
      <div>
        <Grid2 container rowSpacing={3}>
          {company_cars &&
            company_cars.cars.map((item: any, i: number) => {
              return (
                <Grid2 size={4} key={i}>
                  <AdItem data={item} />
                </Grid2>
              );
            })}
        </Grid2>
      </div>
    </DashboardLayout>
  );
};

export default page;

const AdItem = ({ data }: any) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-3xl shadow-sm">
      <a href="#" className="block w-full">
        <img className="rounded-t-3xl w-full" src={data.car_image} alt="Img" />
      </a>
      <div className="p-7">
        <a href="#" className="flex items-center gap-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {data.car_title}
          </h5>
          <span>{data.manufacture_year}</span>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.address}
        </p>
        <Divider />
        <div className="flex items-center justify-between gap-5">
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">View</h6>
            <h6 className="text-[20px]">{data.view}</h6>
          </div>
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">Reserve</h6>
            <h6 className="text-[20px]">{data.reservations_count}</h6>
          </div>
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">Rate</h6>
            <h6 className="text-[20px]">{data.rating}</h6>
          </div>
        </div>
      </div>
      <a
        href="#" // TODO show car in landing
        className="inline-flex items-center justify-center w-full px-3 py-7 text-[16px] text-center text-white bg-[#8313B2] rounded-b-3xl hover:bg-[#9b4bbd] focus:ring-4 focus:outline-none"
      >
        See Details
      </a>
    </div>
  );
};
