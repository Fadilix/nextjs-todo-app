"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogDemo } from "./AddTodoDialog";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Dialog, DialogClose, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { TododDatePicker } from "./TodoDatePicker";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  name: string;
  isDone: boolean;
  dueDate: string; // Adjust type if you use Date objects instead
};

export const columns: ColumnDef<Task>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"));
      const formattedDate = format(date, 'd MMMM yyyy');

      return <div className="lowercase ml-4">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const todo = row.original;
      // const router = useRouter();

      const [taskName, setTaskName] = React.useState(todo.name);
      const currDate = format(todo.dueDate, "dd MMMM yyyy")
      const [currentDate, setCurrentDate] = React.useState(currDate);
      const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
        console.log(taskName);
      }

      // React.useEffect(() => {
      // }, [currentDate])

      const handleTodoUpdate = async (id: string, data: any) => {
        await fetch("/api/todos", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id, data })
        })
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => { navigator.clipboard.writeText(todo.name); toast.success("Todo name copied successfully") }}
            >
              Copy todo name
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm ml-2" onClick={() => console.log(todo.id)}>Update todo</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update a todo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="items-center gap-4">
                    <Label htmlFor="name">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                      value={taskName}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="username" className="">
                      Due date
                    </Label>
                    <TododDatePicker
                    // date={date} setDate={setDate}
                    />
                    <p>Current date : {currentDate}</p>
                    Modify the input to change the date
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit"
                      onClick={() => handleTodoUpdate(todo.id, { name: taskName, dueDate: currentDate })}
                    >Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenuItem
              className="text-red-500"
              onClick={async () => {
                await fetch("/api/todos", {
                  method: "DELETE",
                  headers: {
                    "content-type": "application/json"
                  },
                  body: JSON.stringify({ id: todo.id }),
                })
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function Todos() {
  const [data, setData] = React.useState<Task[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      setData(response.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-[90vw]">
      <div className="flex items-center py-4">
        <div className="flex space-x-4">
          <Input
            placeholder="Filter todos..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DialogDemo />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          {table.getFilteredRowModel().rows.length} records
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
