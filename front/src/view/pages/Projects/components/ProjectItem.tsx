import { User } from "@/app/entities/User"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog"
import { TableCell, TableRow } from "@/view/components/ui/table"
import { format } from "date-fns"
import { Edit, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

interface ProjectItemProps {
  id: string;
  project_name: string;
  user: User;
  closing_date: string;
  deleteItem(id: string): void;
}

export function ProjectItem({ id, project_name, user, closing_date, deleteItem }: ProjectItemProps) {
  return (
    <>
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <div className="flex items-center gap-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {project_name}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="font-medium">
          {user.corporate_name}
        </TableCell>

        <TableCell className="font-medium">
          {format(closing_date, 'dd/MM/yyyy')}
        </TableCell>
        <TableCell>
          <div className="flex gap-4">
            <Link to={`/projetos/edit/${id}`}>
              <Edit className="w-4 h-4" />
            </Link>

            <AlertDialog>
              <AlertDialogTrigger><Trash2 className="w-4 h-4" /></AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Isso excluirá permanentemente os dados de nossos servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteItem(id)}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}
