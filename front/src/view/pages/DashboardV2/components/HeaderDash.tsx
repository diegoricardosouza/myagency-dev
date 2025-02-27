import { UserMe } from '@/app/contexts/AuthContext';
import { Badge } from '@/view/components/ui/badge';
import { Button } from '@/view/components/ui/button';
import { CardDescription, CardTitle } from '@/view/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/view/components/ui/dropdown-menu';
import { Input } from '@/view/components/ui/input';
import { Filter, PlusCircle, Search, SortAsc, SortDesc, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectStatus } from '../useDashboardControllerV2';
import { ProjectType } from './ProjectTypeBadge';

interface HeaderDashProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setFilterType: (value: ProjectType | "todos") => void;
  setFilterStatus: (value: ProjectStatus | "todos") => void;
  sortOrder: string;
  setSortOrder: (value: "asc" | "desc") => void;
  clearFilter: (value: "type" | "status") => void;
  user: UserMe;
  filterType: string;
  filterStatus: string;
}

export function HeaderDash({
  searchTerm,
  setSearchTerm,
  setFilterType,
  setFilterStatus,
  sortOrder,
  setSortOrder,
  user,
  filterType,
  filterStatus,
  clearFilter
}: HeaderDashProps) {
  return (
    <div className='mb-6'>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
        <div>
          <CardTitle className="text-2xl font-bold">Dashboard de Projetos</CardTitle>
          <CardDescription>Gerencie seus projetos e acompanhe os prazos de entrega</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar projetos..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Tipo: {filterType === "todos" ? "Todos" : filterType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className='cursor-pointer' onClick={() => setFilterType("todos")}>Todos os tipos</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => setFilterType("Site Template")}>Site template</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => setFilterType("Site Personalizado")}>
                Site personalizado
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => setFilterType("Landing Page")}>Landing page</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => setFilterType("Sistema")}>Sistema</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Status: {filterStatus === "todos" ? "Todos" : filterStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className='cursor-pointer' onClick={() => setFilterStatus("todos")}>Todos os status</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => setFilterStatus("no prazo")}>No prazo</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => setFilterStatus("atrasado")}>Atrasados</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-1"
          >
            {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            Ordenar
          </Button>

          {user?.data.level === 'ADMIN' && (
            <Button size="sm" className="h-10 gap-1" asChild>
              <Link to="/projetos/novo">
                <PlusCircle className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      {(filterType !== "todos" || filterStatus !== "todos") && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filterType !== "todos" && (
            <Badge variant="default" className="flex items-center gap-1">
              Tipo: {filterType}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter("type")}
              >
                <X className="h-4 w-4" />
              </Button>
            </Badge>
          )}
          {filterStatus !== "todos" && (
            <Badge variant="default" className="flex items-center gap-1">
              Status: {filterStatus}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter("status")}
              >
                <X className="h-4 w-4" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
