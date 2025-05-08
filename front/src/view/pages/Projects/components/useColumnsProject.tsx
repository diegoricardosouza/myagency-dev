import { Project } from "@/app/entities/Project"
import { getStatusProject } from "@/lib/utils"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog"
import { Badge } from "@/view/components/ui/badge"
import { Button } from "@/view/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown, Edit, Eye, Layout, Palette, Rocket, Settings, Trash2 } from "lucide-react"
import { useMemo } from "react"
import { Link } from "react-router-dom"
import { useProjectController } from "../useProjectController"

export function useColumnsProject(): ColumnDef<Project>[] {
  const { handleDeleteUser } = useProjectController();

  const typeConfig = useMemo(() => ({
    "Site Template": { color: "bg-blue-100 text-blue-800 border-blue-800/20", icon: <Layout className="w-3 h-3 mr-1" /> },
    "Site Personalizado": { color: "bg-purple-100 text-purple-800 border-purple-800/20", icon: <Palette className="w-3 h-3 mr-1" /> },
    "Landing Page": { color: "bg-amber-100 text-amber-800 border-amber-800/20", icon: <Rocket className="w-3 h-3 mr-1" /> },
    Sistema: { color: "bg-green-100 text-green-800 border-green-800/20", icon: <Settings className="w-3 h-3 mr-1" /> },
  }), []);

  const columns = useMemo<ColumnDef<Project>[]>(() => [
    {
      accessorKey: "project_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Projeto
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "client",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center pl-4">
            <span className="capitalize">{row.original.user.corporate_name}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const type = row.original.type as 'Site Template' | 'Site Personalizado' | 'Landing Page' | 'Sistema';
        return (
          <div className="flex space-x-2 pl-4">
            <Badge variant="outline" className={`flex font-medium items-center ${typeConfig[type]?.color}`}>
              {typeConfig[type]?.icon}
              {type}
            </Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2 pl-4">
            {getStatusProject(row.original.status)}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        // Converte o valor numérico para string para comparação
        const rowValue = String(row.getValue(id))
        return value.includes(rowValue)
      },
    },
    {
      accessorKey: "closing_date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Fechamento
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center pl-4">
            <span className="capitalize">{format(row.original.closing_date, 'dd/MM/yyyy')}</span>
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-0">
          <Button
            className="bg-transparent text-[#020817] cursor-pointer h-8 w-8"
            variant="ghost"
            asChild
            size="icon"
          >
            <Link to={`/projetos/detalhes/${row.original.id}`}>
              <Eye className="w-4 h-4" />
              <span className="sr-only">Detalhes</span>
              {/* <Trash2 className="w-4 h-4" /> */}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link to={`/projetos/edit/${row.original.id}`}>
              <Edit className="w-4 h-4" />
              <span className="sr-only">Editar</span>
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                className="bg-transparent text-[#020817] cursor-pointer h-8 w-8"
                variant="ghost"
                asChild
                size="icon"
              >
                <a>
                  <Trash2 className="w-4 h-4" />
                </a>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Os dados serão removidos permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteUser(row.original.id)}>
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ], [handleDeleteUser, typeConfig]);

  return columns;
}
