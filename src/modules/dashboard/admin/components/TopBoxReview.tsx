import { Line } from "react-chartjs-2";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
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
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import { Grid2 } from "@mui/material";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  BarElement
);

export const TopBoxReview = () => {
  const { data: summaryData, isLoading } = useSWR("adminsummary", (url) =>
    HttpClient.getInstance().fetcher(url)
  );
  if (isLoading) return <></>;
  return (
    <>
      <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {summaryData.map((item: any, i: number) => (
          <Grid2 size={3} key={i}>
            <div className="bg-[#F1F2F3] border rounded-3xl p-5 border-[#A0A0A0] flex flex-col gap-2">
              <span>{item.title}</span>
              <div className="flex items-end gap-1">
                <span>{item.number}</span>

                <ArrowCircleUpIcon color={item.isUp ? "success" : "error"} />
                <span
                  className={item.isUp ? "text-[#20CF10]" : "text-[#CF0506]"}
                >
                  {item.percentage}%
                </span>
                <LineChart isUp={item.isUp} chartData={item.chartData} />
              </div>
              <span>Compared to last {item.unit}</span>
            </div>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

const LineChart = ({ isUp, chartData }: any) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: chartData,
        borderColor: isUp ? "#20CF10" : "#CF0506",
        backgroundColor: isUp ? "#20CF1033" : "#CF050633",
        fill: "start",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "40px", overflow: "hidden" }}>
      <Line data={data} options={options} />
    </div>
  );
};
