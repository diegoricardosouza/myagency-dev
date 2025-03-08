import { HeaderDash } from './components/HeaderDash';
import { ProjectCard } from './components/ProjectCard';
import { useDashboardControllerV2 } from './useDashboardControllerV2';

export function DashboardV2() {
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
    clearFilter
  } = useDashboardControllerV2();

  return (
    <div>
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
