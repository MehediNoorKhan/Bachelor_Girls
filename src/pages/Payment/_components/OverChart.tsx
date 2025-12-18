import { useGetDashboardStatsQuery } from "@/store/api/dashboard.api";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function OverChart() {
  const { data } = useGetDashboardStatsQuery();

  const completed = data?.data?.transactions.completed_percentage || 0;
  const pending = data?.data?.transactions.pending_percentage || 0;
  const total = data?.data?.transactions.total || "0.00";

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },

    // Add labels for the series
    labels: ["Complete", "Pending"], // This will change series-1 to Complete and series-2 to Pending

    // Colors matching your screenshot
    colors: ["#04BFDA", "#FFA84A"], // Cyan and Orange

    dataLabels: {
      enabled: false,
    },

    stroke: {
      width: 0, // No border between segments
    },

    plotOptions: {
      pie: {
        donut: {
          size: "70%", // Inner circle size
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              color: "#9CA3AF",
              formatter: function () {
                return "Total balance";
              },
            },
            value: {
              show: true,
              fontSize: "24px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              color: "#1F2937",
              formatter: function (val) {
                return `$${val}`;
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total balance",
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              color: "#9CA3AF",
              formatter: function () {
                return `$${total}`;
              },
            },
          },
        },
      },
    },

    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Inter, sans-serif",
      fontWeight: 400,
      labels: {
        colors: "#6B7280",
      },
      markers: {
        size: 8,
        strokeWidth: 0,
        shape: "circle",
      },
      itemMargin: {
        horizontal: 20,
        vertical: 8,
      },
      // You can now simplify the formatter since labels are set
      formatter: function (seriesName) {
        return seriesName;
      },
    },

    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [completed, pending]; // 65% Complete, 35% Pending

  return (
    <div className="flex w-full flex-col items-center">
      <Chart
        options={chartOptions}
        series={series}
        type="donut"
        width={350}
        height={350}
      />
    </div>
  );
}
