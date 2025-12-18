import useModal from "@/components/Modal/useModal";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function StatsChart() {
  const { getParams } = useModal();
  const active = getParams("filter") || "today";

  const chartOptions: ApexOptions = {
    chart: {
      id: "stats-chart",
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      background: "transparent",
      sparkline: {
        enabled: false,
      },
      height: 200,
    },

    colors: ["#E07B5C"],

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#E07B5C"],
    },

    grid: {
      show: true,
    },

    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },

    yaxis: {
      show: false,
    },

    tooltip: {
      enabled: true,
      shared: false,
      followCursor: true,
      intersect: false,
      custom: function ({
        series,
        seriesIndex,
        dataPointIndex,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
      }) {
        const value = series[seriesIndex][dataPointIndex];
        return `
          <div style="
            background: #374151;
            color: white;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 500;
            font-family: Inter, sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          ">
            ${value} clients
          </div>
        `;
      },
      marker: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    markers: {
      size: 0,
      colors: ["#FFA84A"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 8,
        sizeOffset: 0,
      },
    },

    plotOptions: {
      area: {
        fillTo: "origin",
      },
    },

    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 200,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 180,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "11px",
              },
            },
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 160,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 140,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "9px",
              },
            },
          },
          markers: {
            hover: {
              size: 6,
            },
          },
        },
      },
    ],
  };

  type ChartSeries = { name: string; data: number[] }[];

  const series: Record<string, ChartSeries> = {
    today: [
      {
        name: "Clients",
        data: [3, 4, 2, 5, 3, 2, 4],
      },
    ],

    week: [
      {
        name: "Clients",
        data: [20, 25, 18, 30, 22, 27, 35],
      },
    ],

    month: [
      {
        name: "Clients",
        data: [80, 95, 70, 110, 90, 100, 120],
      },
    ],

    year: [
      {
        name: "Clients",
        data: [900, 1100, 950, 1300, 1200, 1400, 1500],
      },
    ],

    quarter: [
      {
        name: "Clients",
        data: [250, 300, 280, 350, 320, 400, 450],
      },
    ],
  };

  return (
    <div className="w-full">
      <Chart
        options={chartOptions}
        series={series[active] as ChartSeries}
        type="area"
        width="100%"
        height={400}
      />
    </div>
  );
}
