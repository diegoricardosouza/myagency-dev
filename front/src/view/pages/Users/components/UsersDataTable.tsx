import { UserMe } from "@/app/contexts/AuthContext"
import { User } from "@/app/entities/User"
import { Spinner } from "@/view/components/Spinner"
import { Badge } from "@/view/components/ui/badge"
import { Button } from "@/view/components/ui/button"
import { Card, CardContent } from "@/view/components/ui/card"
import { Checkbox } from "@/view/components/ui/checkbox"
import { Input } from "@/view/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/view/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/view/components/ui/table"
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CirclePlus, PlusCircle, Search, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useColumnsUser } from "./useColumnsUser"

interface UsersDataTableProps {
  users: User[];
  user: UserMe;
  isLoading: boolean;
}

export function UsersDataTable({ users, user, isLoading }: UsersDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [statusSearch, setStatusSearch] = useState("")
  const [globalFilter, setGlobalFilter] = useState("")

  const columnsUser = useColumnsUser();

  // Calculate actual counts for each status
  const typeCounts = useMemo(() => {
    return users?.reduce(
      (acc, project) => {
        const status = String(project.level)
        if (typeof status === 'string') {
          acc[status] = (acc[status] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>,
    )
  }, [users])

  // Update typeOptions with real counts
  const typeOptions = useMemo(
    () => [
      { value: "ADMIN", label: "ADMIN", count: typeCounts["ADMIN"] || 0 },
      { value: "CLIENTE", label: "CLIENTE", count: typeCounts["CLIENTE"] || 0 }
    ],
    [typeCounts],
  )

  const table = useReactTable({
    data: users,
    columns: columnsUser,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  const filteredStatusOptions = typeOptions?.filter((option) =>
    option.label.toLowerCase().includes(statusSearch.toLowerCase()),
  )

  const handleStatusToggle = (value: string) => {
    setStatusFilter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  const clearFilters = () => {
    setStatusFilter([])
    setStatusSearch("")
  }

  useEffect(() => {
    if (statusFilter.length > 0) {
      table.getColumn("level")?.setFilterValue(statusFilter)
    } else {
      table.getColumn("level")?.setFilterValue(undefined)
    }
  }, [statusFilter, table])

  // Get display text for status button
  const getStatusDisplay = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <CirclePlus className="mr-2 h-4 w-4" />
          Nível
        </div>
        {statusFilter.length > 0 && statusFilter.length <= 2 && (
          <>
            <div className="h-4 w-px bg-border" />
            <div className="flex gap-1">
              {statusFilter.map((status) => {
                const option = typeOptions?.find((opt) => opt.value === status)
                return (
                  <div
                    key={status}
                    className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-xs"
                  >
                    {option?.label || status}
                  </div>
                )
              })}
            </div>
          </>
        )}
        {statusFilter.length > 2 && (
          <>
            <div className="h-4 w-px bg-border" />
            <Badge variant="secondary" className="rounded-sm px-1 text-xs">
              {statusFilter.length} selecionados
            </Badge>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      {user?.data.level === 'ADMIN' && (
        <div className="flex">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link to="/usuarios/novo">
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo Usuário
              </span>
            </Link>
          </Button>
        </div>
      )}
      <Card className="w-full min-h-[300px]">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
            <Spinner className="w-6 h-6 fill-primary" />
          </div>
        )}
        <CardContent>
          <div className="flex items-center gap-2 py-4">
            <Input
              placeholder="Filtrar usuários..."
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 border-dashed text-sm">
                  {getStatusDisplay()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <div className="flex items-center border-b px-2">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                    placeholder="Nível"
                    className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    value={statusSearch}
                    onChange={(e) => setStatusSearch(e.target.value)}
                  />
                </div>
                <div className="max-h-[300px] overflow-auto p-1">
                  {filteredStatusOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center justify-between rounded-sm px-2 py-1.5 hover:bg-muted"
                    >
                      <div className="flex items-center gap-2 text-sm font-light">
                        <Checkbox
                          id={option.value}
                          checked={statusFilter.includes(option.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleStatusToggle(option.value)
                            } else {
                              handleStatusToggle(option.value)
                            }
                          }}
                        />
                        <label htmlFor={option.value} className="flex-1 cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                      <span className="text-muted-foreground text-sm">{option.count}</span>
                    </div>
                  ))}
                </div>
                {statusFilter.length > 0 && (
                  <div className="border-t p-1">
                    <Button variant="ghost" className="w-full justify-center font-normal text-sm h-8" onClick={clearFilters}>
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            {statusFilter.length > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                Limpar
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columnsUser.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Itens por página</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-6">
              <p className="text-sm font-medium">
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Ir para primeira página</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Ira para a página anterior</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Ir para próxima página</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Ir para última página</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

