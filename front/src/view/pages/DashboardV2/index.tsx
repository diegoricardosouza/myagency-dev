import { Spinner } from '@/view/components/Spinner';
import { HeaderDash } from './components/HeaderDash';
import { ProjectCard } from './components/ProjectCard';
import { useDashboardControllerV2 } from './useDashboardControllerV2';

interface DashboardV2Props {
  finished?: boolean;
}

export function DashboardV2({ finished }: DashboardV2Props) {
  const {
    user,
    filteredAndSortedProjects,
    handleCardClick,
    searchTerm,
    setSearchTerm,
    setFilterStatus,
    setFilterType,
    sortOrder,
    setSortOrder,
    filterStatus,
    filterType,
    clearFilter,
    isLoading
  } = useDashboardControllerV2(finished);

  return (
    <div className='relative w-full h-full'>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-10">
          <Spinner className="w-6 h-6 fill-primary" />
        </div>
      )}
      <HeaderDash
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterStatus={setFilterStatus}
        setFilterType={setFilterType}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        user={user!}
        filterStatus={filterStatus}
        filterType={filterType}
        clearFilter={clearFilter}
        finished={finished}
      />

      {filteredAndSortedProjects?.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">Nenhum projeto encontrado</div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredAndSortedProjects?.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => handleCardClick(project.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
