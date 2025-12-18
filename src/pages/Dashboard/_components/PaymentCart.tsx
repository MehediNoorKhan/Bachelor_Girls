import useModal from "@/components/Modal/useModal";
import { useGetDashboardStatsQuery } from "@/store/api/dashboard.api";
import type { ClientDay } from "@/types";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function PaymentCart() {
  const { getParams } = useModal();
  const filter = getParams("pf") || "last_week";

  const { data } = useGetDashboardStatsQuery();

  const clients: ClientDay[] =
    (data?.data?.clients as Record<string, ClientDay[]> | undefined)?.[
      filter
    ] || [];

  const labels = {
    last_week: clients.map((client: ClientDay) => client?.day || ""),
    by_month: clients.map((client: ClientDay) => client?.month || ""),
    by_year: clients.map((client: ClientDay) => client?.year || ""),
  };

  const clientsData = {
    last_week: clients.map((client: ClientDay) => client?.clients || 0),
    by_month: clients.map((client: ClientDay) => client?.clients || 0),
    by_year: clients.map((client: ClientDay) => client?.clients || 0),
  };

  const days = labels[filter as keyof typeof labels] || [];
  const clientsCount = clientsData[filter as keyof typeof clientsData] || [];

  const chartOptions: ApexOptions = {
    chart: {
      id: "payment-chart",
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
    },

    // Exact colors from screenshot
    colors: ["#E07B5C", "#B8C5D1"],

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.8,
        stops: [0, 100],
      },
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
          colors: "#B3BECD",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
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
            background: #FFA84A;
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            font-family: Inter, sans-serif;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          ">
            ${value} Clients
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
            height: 200,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "12px",
                fontWeight: 700,
              },
            },
          },
          stroke: {
            width: 2.5,
          },
        },
      },
      {
        breakpoint: 768, // Tablet
        options: {
          chart: {
            height: 180,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "11px",
                fontWeight: 600,
              },
            },
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
            height: 160,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
                fontWeight: 600,
              },
            },
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
            height: 140,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "9px",
                fontWeight: 500,
              },
            },
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
              fontSize: "10px",
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Current",
      data: clientsCount, // Orange line with peak at Fri
    },
  ];

  return (
    <div className="mt-6 h-auto w-full">
      <Chart
        options={chartOptions}
        series={series}
        type="area"
        width="100%"
        height="100%"
      />
    </div>
  );
}
