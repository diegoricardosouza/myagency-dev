import { STATUS_PROJECT } from '@/app/config/constants';
import { Spinner } from '@/view/components/Spinner';
import { Column } from './components/Column';
import { HeaderDash } from './components/HeaderDash';
import { ProjectCard } from './components/ProjectCard';
import { useDashboardControllerV2 } from './useDashboardControllerV2';

interface DashboardV2Props {
  finished?: boolean | null;
}

export function DashboardV2({ finished }: DashboardV2Props) {
  const {
    user,
    filteredAndSortedProjects,
    isLoading,
    searchTerm,
    setSearchTerm,
    setFilterStatus,
    setFilterType,
    setSortOrder,
    sortOrder,
    filterStatus,
    filterType,
    clearFilter,
    handleCardClick
  } = useDashboardControllerV2(finished);

  return (
    <div className='relative'>
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

      {user?.data.level === "ADMIN" && (
        <div className="flex flex-col max-w-[calc(100vw-35px)] lg:max-w-[calc(100vw-290px)]">

          <div className="flex gap-4 max-h-[calc(100vh-175px)] 2xl:max-h-[calc(100vh-190px)] overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">

            {STATUS_PROJECT.map((status) => (
              <Column
                key={status.label}
                status={status}
                projects={filteredAndSortedProjects?.filter((project) => project.status === status.value) || []}
              />
            ))}

          </div>
        </div>
      )}

      {user?.data.level === "CLIENTE" && (
        filteredAndSortedProjects?.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Nenhum projeto finalizado
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredAndSortedProjects?.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleCardClick(project.id)}
              />
            ))}
          </div>
        )
      )}
    </div>
  )
}
