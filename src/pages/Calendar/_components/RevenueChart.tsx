import { useGetDashboardStatsQuery } from "@/store/api/dashboard.api";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function RevenueChart() {
  const { data } = useGetDashboardStatsQuery();

  const currentWeek = data?.data?.revenue?.current_week || [];
  const current = currentWeek.map((item) => item?.revenue || 0);

  const previousWeek = data?.data?.revenue?.previous_week || [];
  const previous = previousWeek.map((item) => item?.revenue || 0);

  const days = data?.data?.revenue?.current_week.map((item) => item.day) || [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const chartOptions: ApexOptions = {
    chart: {
      id: "revenue-chart",
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
      height: 280, // Add default height
    },

    // Exact colors from screenshot
    colors: ["#E07B5C", "#B8C5D1"],

    fill: {
      type: "solid",
      opacity: 0, // Make it completely transparent
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 2.5,
    },

    grid: {
      show: true,
      borderColor: "#E5E7EB",
      strokeDashArray: 2,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },

    xaxis: {
      categories: days,
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "11px",
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
        width: 2,
        position: "back",
        opacity: 1,
        stroke: {
          color: "#FFA84A",
          width: 1,
          dashArray: 0,
        },
        fill: {
          type: "solid",
          color: "#FFA84A",
        },
        dropShadow: {
          enabled: false,
        },
      },
    },

    yaxis: {
      min: 0,
      max: 600,
      tickAmount: 6,
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "11px",
          fontFamily: "Inter, sans-serif",
        },
        formatter: function (value: number) {
          if (value === 0) return "10";
          if (value === 100) return "50";
          if (value === 200) return "100";
          if (value === 300) return "150";
          if (value === 400) return "50C";
          if (value === 500) return "1k+";
          return value.toString();
        },
      },
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
            background: #FFA84A;
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            font-family: Inter, sans-serif;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          ">
            $${value}
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
      colors: ["#fff", "#FFA84A"],
      strokeColors: "#FFA84A",
      strokeWidth: 4,
      hover: {
        size: 6,
        sizeOffset: 0,
      },
    },

    plotOptions: {
      area: {
        fillTo: "origin",
      },
    },

    // ✅ RESPONSIVE CONFIGURATION
    responsive: [
      {
        breakpoint: 1024, // Desktop
        options: {
          chart: {
            height: 280,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
        },
      },
      {
        breakpoint: 768, // Tablet
        options: {
          chart: {
            height: 250,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "11px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "11px",
              },
            },
            tickAmount: 5,
          },
          stroke: {
            width: 2,
          },
          markers: {
            hover: {
              size: 5,
            },
          },
        },
      },
      {
        breakpoint: 640, // Mobile Large
        options: {
          chart: {
            height: 220,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
            tickAmount: 4,
          },
          stroke: {
            width: 1.5,
          },
          grid: {
            strokeDashArray: 1,
          },
        },
      },
      {
        breakpoint: 480, // Mobile Small
        options: {
          chart: {
            height: 200,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "9px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "9px",
              },
            },
            tickAmount: 3,
          },
          stroke: {
            width: 1.5,
          },
          markers: {
            hover: {
              size: 4,
            },
          },
          tooltip: {
            style: {
              fontSize: "11px",
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Current",
      data: current, // Orange line with peak at Fri
    },
    {
      name: "Previous",
      data: previous, // Gray line (lower)
    },
  ];

  return (
    <div className="mt-6 w-full">
      <Chart
        options={chartOptions}
        series={series}
        type="area"
        width="100%"
        height={280} // Set fixed height
      />
    </div>
  );
}
