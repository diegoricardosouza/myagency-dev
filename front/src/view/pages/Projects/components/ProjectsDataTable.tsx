import { UserMe } from "@/app/contexts/AuthContext"
import { Project } from "@/app/entities/Project"
import { Spinner } from "@/view/components/Spinner"
import { Button } from "@/view/components/ui/button"
import { Card, CardContent } from "@/view/components/ui/card"
import { Input } from "@/view/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/view/components/ui/table"
import {
  type ColumnFiltersState,
  type SortingState,
  Table as TableTanstack,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, PlusCircle, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { PopoverActive, PopoverType } from "./FilterType"
import { useColumnsProject } from "./useColumnsProject"

interface ProjectsDataTableProps {
  projects: Project[];
  user: UserMe;
  isLoading: boolean;
}

export function ProjectsDataTable({ projects, user, isLoading }: ProjectsDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [statusSearch, setStatusSearch] = useState("")

  const [activeFilter, setActiveFilter] = useState<string[]>([])
  const [activeSearch, setActiveSearch] = useState("")

  const columnsProject = useColumnsProject();

  // Calculate actual counts for each status
  const typeCounts = useMemo(() => {
    // Filtra os projetos com base no filtro ativo primeiro
    let filteredProjects = [...projects];

    if (activeFilter.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        activeFilter.includes(String(project.status))
      );
    }

    // Agora, conte os tipos nesses projetos filtrados
    return filteredProjects.reduce(
      (acc, project) => {
        const type = String(project.type)
        if (typeof type === 'string') {
          acc[type] = (acc[type] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>,
    )
  }, [projects, activeFilter]);

  const activeCounts = useMemo(() => {
  // Filtra os projetos com base no filtro de tipo primeiro
  let filteredProjects = [...projects];

  if (statusFilter.length > 0) {
    filteredProjects = filteredProjects.filter(project =>
      statusFilter.includes(String(project.type))
    );
  }

  // Agora, conte os status nesses projetos filtrados
  return filteredProjects.reduce(
    (acc, project) => {
      const status = String(project.status)
      if (typeof status === 'string') {
        acc[status] = (acc[status] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )
}, [projects, statusFilter]);

  // Update typeOptions with real counts
  const typeOptions = useMemo(
    () => [
      { value: "Site Template", label: "Site Template", count: typeCounts["Site Template"] || 0 },
      { value: "Site Personalizado", label: "Site Personalizado", count: typeCounts["Site Personalizado"] || 0 },
      { value: "Landing Page", label: "Landing Page", count: typeCounts["Landing Page"] || 0 },
      { value: "Sistema", label: "Sistema", count: typeCounts["Sistema"] || 0 },
    ],
    [typeCounts],
  )

  const activeOptions = useMemo(
    () => [
      { value: 'comercial', label: "Comercial", count: activeCounts["comercial"] || 0},
      { value: 'layout-initial', label: "Layout - Iniciar", count: activeCounts["layout-initial"] || 0},
      { value: 'layout-approving', label: "Layout - Enviado para Aprovação", count: activeCounts["layout-approving"] || 0},
      { value: 'layout-approved', label: "Layout - Aprovado", count: activeCounts["layout-approved"] || 0},
      { value: 'development-initial', label: "Desenvolvimento - Iniciar", count: activeCounts["development-initial"] || 0},
      { value: 'development-home', label: "Desenvolvimento - Home", count: activeCounts["development-home"] || 0},
      { value: 'development-internal', label: "Desenvolvimento - Páginas Internas", count: activeCounts["development-internal"] || 0},
      { value: 'financial-analysis', label: "Financeiro - Análise", count: activeCounts["financial-analysis"] || 0},
      { value: 'financial-pending', label: "Financeiro - Pendente", count: activeCounts["financial-pending"] || 0},
      { value: 'financial-ok', label: "Financeiro - Financeiro OK", count: activeCounts["financial-ok"] || 0},
      { value: 'completed', label: "Concluído", count: activeCounts["completed"] || 0},
    ],
    [activeCounts],
  )

  const table = useReactTable({
    data: projects,
    columns: columnsProject,
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
      columnVisibility
    },
  })

  const filteredStatusOptions = typeOptions?.filter((option) =>
    option.label.toLowerCase().includes(statusSearch.toLowerCase()),
  )

  const filteredActiveOptions = activeOptions?.filter((option) =>
    option.label.toLowerCase().includes(activeSearch.toLowerCase()),
  )

  const clearFilters = () => {
    setStatusFilter([])
    setStatusSearch("")
    setActiveFilter([])
    setActiveSearch("")
  }

  useEffect(() => {
    if (statusFilter.length > 0) {
      table.getColumn("type")?.setFilterValue(statusFilter)
    } else {
      table.getColumn("type")?.setFilterValue(undefined)
    }
  }, [statusFilter, table])

  useEffect(() => {
    if (activeFilter.length > 0) {
      table.getColumn("status")?.setFilterValue(activeFilter)
    } else {
      table.getColumn("status")?.setFilterValue(undefined)
    }
  }, [activeFilter, table])

  return (
    <>
      {user?.data.level === 'ADMIN' && (
        <div className="flex">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link to="/projetos/novo">
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo Projeto
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
              placeholder="Filtrar projetos..."
              value={(table.getColumn("project_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("project_name")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
            <PopoverType
              clearFilters={clearFilters}
              filteredStatusOptions={filteredStatusOptions}
              setStatusFilter={setStatusFilter}
              setStatusSearch={setStatusSearch}
              statusFilter={statusFilter}
              statusSearch={statusSearch}
              typeOptions={typeOptions}
            />

            <PopoverActive
              activeFilter={activeFilter}
              activeOptions={activeOptions}
              activeSearch={activeSearch}
              clearFilters={clearFilters}
              filteredActiveOptions={filteredActiveOptions}
              setActiveFilter={setActiveFilter}
              setActiveSearch={setActiveSearch}
            />

            {(statusFilter.length > 0 || activeFilter.length > 0) && (
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
                    <TableCell colSpan={columnsProject.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <ProjectsDataTablePagination
            table={table}
          />
        </CardContent>
      </Card>
    </>
  )
}

interface ProjectsDataTablePaginationProps {
  table: TableTanstack<Project>
}

export function ProjectsDataTablePagination({ table }: ProjectsDataTablePaginationProps) {
  return (
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
  )
}
