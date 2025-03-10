import { User } from "@/app/entities/User"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog"
import { Badge } from "@/view/components/ui/badge"
import { Button } from "@/view/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown, Edit, Trash2 } from "lucide-react"
import { useMemo } from "react"
import { Link } from "react-router-dom"
import { useUserController } from "../useUserController"

export function useColumnsUser(): ColumnDef<User>[] {
  const { handleDeleteUser } = useUserController();

  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: "fantasy_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome Fantasia
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {row.original.fantasy_name}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "corporate_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Razão Social
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {row.original.corporate_name}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {row.original.email}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "responsible",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    {
      accessorKey: "level",
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
        return (
          <div>
            <Badge variant="outline">{row.original.level}</Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link to={`/usuarios/edit/${row.original.id}`}>
              <Edit className="w-4 h-4" />
              <span className="sr-only">Editar</span>
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash2 className="w-4 h-4" />
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
  ], [handleDeleteUser]);

  return columns;
}
