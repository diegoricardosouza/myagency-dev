import { CountdownCard } from '@/view/components/CountdownCard';
import { useDashboardControllerV2 } from './useDashboardControllerV2';

export function DashboardV2() {
  const { projects } = useDashboardControllerV2();

  return (
    <div className='flex flex-col lg:grid grid-cols-5 gap-4 w-full'>
      {projects?.map((project) => (
        <CountdownCard
          key={project.id}
          title={project.project_name}
          date={project.closing_date}
          {...project}
        />
      ))}
    </div>
  )
}
