import { Line } from "react-chartjs-2";

const MonthlyChart = ({ MonthlyChartData, isMonthly }: any) => {
  const data = {
    labels: isMonthly
      ? [
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
        ]
      : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      ...MonthlyChartData.map((item: any, i: number) => {
        return {
          label: item.label,
          data: item.data,
          borderColor: () => {
            switch (i) {
              case 1:
                return "#059344";
              case 2:
                return "#EC004F";
              case 3:
                return "#14A2F7";
              case 4:
                return "#F98E10";
            }
          },
          tension: 0,
          fill: false,
        };
      }),
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
  return <Line data={data} options={options} />;
};

export default MonthlyChart;
