"use client";
import { TopBoxReview } from "@/modules/dashboard/admin/components/TopBoxReview";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import MonthlyChart from "@/modules/share/components/MChart/MChart";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import { Divider, Grid2 } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import useSWR from "swr";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  BarElement
);

const page = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const {
    data: HorizontalBarChartData,
    isLoading: isLoadingHorizontalBarChartData,
  } = useSWR("getpackagechart", (url) => HttpClient.getInstance().fetcher(url));

  const { data: MonthlyChartData, isLoading: isLoadingMonthlyChartData } =
    useSWR(
      `getvehiclechart?type=${isMonthly ? "month" : "day"}`,
      (url: string) => HttpClient.getInstance().fetcher(url)
    );

  const {
    data: getvehiclecategorycountData,
    isLoading: isLoadingGetvehiclecategorycount,
  } = useSWR("getvehiclecategorycount", (url: string) =>
    HttpClient.getInstance().fetcher(url)
  );
  const {
    data: getsuccessfulreservationsData,
    isLoading: isLoadingGetsuccessfulreservations,
  } = useSWR("getsuccessfulreservations", (url: string) =>
    HttpClient.getInstance().fetcher(url)
  );

  return (
    <>
      <DashboardLayout panelType="admin">
        <TopBoxReview />
        <div className="flex my-5">
          <div className="w-3/6 mt-5">
            {!isLoadingHorizontalBarChartData && (
              <HorizontalBarChart
                HorizontalBarChartData={HorizontalBarChartData.data}
                HorizontalBarChartLebels={HorizontalBarChartData.labels}
              />
            )}
          </div>
        </div>
        <Divider />
        {!isLoadingMonthlyChartData && (
          <>
            <div className="flex justify-between items-center">
              <div className="w-2/12 flex flex-col gap-3 items-start justify-start h-full">
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
              <div className="w-7/12">
                <MonthlyChart
                  MonthlyChartData={MonthlyChartData}
                  isMonthly={isMonthly}
                />
              </div>
              {!isLoadingGetvehiclecategorycount && (
                <Grid2 container spacing={2} className="w-3/12">
                  {getvehiclecategorycountData.map((item: any, i: number) => (
                    <Grid2
                      size={6}
                      textAlign={i % 2 == 0 ? "right" : "left"}
                      key={i}
                    >
                      <SummeryCar data={item} />
                    </Grid2>
                  ))}
                </Grid2>
              )}
            </div>
          </>
        )}
        {!isLoadingGetsuccessfulreservations && (
          <div>
            <h1>Successful Reserves</h1>
            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <tbody>
                  {getsuccessfulreservationsData.map((item: any, i: number) => (
                    <RowItem data={item} key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default page;

const HorizontalBarChart = ({
  HorizontalBarChartData,
  HorizontalBarChartLebels,
}: any) => {
  const data = {
    labels: HorizontalBarChartLebels,
    datasets: [
      {
        label: "Subscription Packages",
        data: HorizontalBarChartData,
        backgroundColor: [
          "#2BDFD2",
          "#F70008",
          "#66147B",
          "#F98E10",
          "#DCFF4E",
        ],
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value: number) => `${value}%`,
        color: "#000",
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  return (
    <div style={{ width: "100%", height: "350px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

const SummeryCar = ({ data }: any) => {
  return (
    <>
      <div className="bg-[#F0F2F6] rounded-3xl text-center p-5 max-w-[100px] inline-block">
        <h1 className="font-bold">{data.title}</h1>
        <h1 className="text-[#8313B2] font-bold text-[32px]">{data.count}</h1>
        <h1 className="text-nowrap">Total Cars</h1>
      </div>
    </>
  );
};

const RowItem = ({ data }: any) => {
  console.log("first", data);
  return (
    <>
      <tr className="bg-white border-b-2  border-[#A0A0A0]">
        <td className="px-6 py-4">{data.ReservationID}</td>
        <td className="px-6 py-4">{data.CustomerName}</td>
        <td className="px-6 py-4">{data.CarModel}</td>
        <td className="px-6 py-4">{data.Date}</td>
        <td className="px-6 py-4">{data.Duration}</td>
        <td className="px-6 py-4">{data.TotalAmount}</td>
        <td className="px-6 py-4">{data.Status}</td>
      </tr>
    </>
  );
};
