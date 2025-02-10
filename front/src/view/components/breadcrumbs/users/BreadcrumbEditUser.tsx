import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/view/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";

interface BreadcrumbEditUserProps {
  profileId?: string;
}

export function BreadcrumbEditUser({ profileId }: BreadcrumbEditUserProps) {
  const { id } = useParams();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {id !== profileId && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/usuarios">Usuários</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{profileId && id === profileId ? 'Meu Perfil' : 'Editar Usuário'}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
