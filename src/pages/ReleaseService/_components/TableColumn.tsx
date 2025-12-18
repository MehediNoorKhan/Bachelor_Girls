import { Button } from "@/components/animate-ui/components/buttons/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IService } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Link } from "react-router";
import DeleteService from "./DeleteService";

export const columns: ColumnDef<IService>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex w-full max-w-xs cursor-pointer items-center justify-between gap-2 text-sm leading-[157%] font-medium"
      >
        <span>Service Logo & Title</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp size={16} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown size={16} />
        ) : (
          ""
        )}
      </button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        <Avatar>
          {typeof row.original.image === "string" ? (
            <AvatarImage src={row.original.image} />
          ) : row.original.image instanceof File ? (
            <AvatarImage src={URL.createObjectURL(row.original.image)} />
          ) : (
            <AvatarImage />
          )}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-sm leading-[120%] font-medium">
          {row.getValue("title")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => "Service Category",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex w-full cursor-pointer items-center justify-between gap-2 text-sm leading-[157%] font-medium"
      >
        <span>Service Price</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp size={16} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown size={16} />
        ) : (
          ""
        )}
      </button>
    ),

    cell: ({ row }) => row.getValue("price"),
  },
  {
    accessorKey: "ratings",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex w-full max-w-xs cursor-pointer items-center justify-between gap-2 text-sm leading-[157%] font-medium"
      >
        <span>Ratings</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp size={16} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown size={16} />
        ) : (
          ""
        )}
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.ratings.toFixed(2)}({row.original.total_reviews})
      </div>
    ),
  },
  {
    id: "actions",
    header: " ",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-5">
        <Link
          to={`/dashboard/edit-service/${row.original.id}`}
          className="text-right font-medium"
        >
          <Button
            size={"sm"}
            className="cursor-pointer rounded-[12px] text-[12px] leading-[120%] font-semibold"
          >
            Edit Service
          </Button>
        </Link>

        <DeleteService id={row.original.id} />
      </div>
    ),
  },
];
