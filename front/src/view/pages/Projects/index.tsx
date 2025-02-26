import { generateEllipsisPagination } from "@/lib/utils"
import { CustomPagination } from "@/view/components/CustomPagination"
import { Spinner } from "@/view/components/Spinner"
import { Button } from "@/view/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/view/components/ui/table"
import { PlusCircle } from "lucide-react"
import { useMemo } from "react"
import { Link } from "react-router-dom"

import { ProjectItem } from "./components/ProjectItem"
import { useProjectController } from "./useProjectController"

export default function Projects() {
  const { projects, handleDeleteUser, isLoadingDelete, pagination, isLoading, user } = useProjectController(50);

  const pages = useMemo(() => {
    return generateEllipsisPagination(pagination.currentPage, pagination.totalPages);
  }, [pagination.currentPage, pagination.totalPages]);

  return (
    <div>
      {user?.data.level === 'ADMIN' && (
        <div className="flex mb-4">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link to="/projetos/novo">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo Projeto
              </span>
            </Link>
          </Button>
        </div>
      )}

      <Card className="min-h-[700px] relative">
        {isLoadingDelete || isLoading && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
            <Spinner className="w-6 h-6 fill-primary" />
          </div>
        )}

        <CardHeader>
          <CardTitle>Projetos</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {!isLoadingDelete && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data Fechamento</TableHead>
                  <TableHead>
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects?.map((project) => (
                  <ProjectItem key={project.id} {...project} deleteItem={handleDeleteUser} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>

        {pagination.totalPages > 1 && (
          <CustomPagination pages={pages} pagination={pagination} />
        )}
      </Card>
    </div>
  )
}
