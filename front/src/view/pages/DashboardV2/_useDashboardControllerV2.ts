import { useAuth } from "@/app/hooks/useAuth";
import { jobsService } from "@/app/services/jobs";
import { formatedDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  startDate: z.date({
    required_error: "Data de preenchimento obrigatório.",
  }),
  endDate: z.date({
    required_error: "Data de preenchimento obrigatório.",
  })
});

type FormData = z.infer<typeof schema>

export function useDashboardControllerV2() {
  const [openModalJob, setOpenModalJob] = useState(false);
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [dateStartCut, setDateStartCut] = useState<string | number | Date | undefined>();
  const [dateEndCut, setDateEndCut] = useState<string | number | Date | undefined>();
  const { user } = useAuth();
  const [, setSearchParams] = useSearchParams();

  // Obtém a data atual
  useEffect(() => {
    const dateNow = new Date();
    const getDateStartCut = new Date(dateNow.getFullYear(), dateNow.getMonth()-1, dateNow.getDate());
    const getDateEndCut = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

    setDateStartCut(getDateStartCut);
    setDateEndCut(getDateEndCut);

    if (getDateStartCut && getDateEndCut) {
      const initStarDate = format(getDateStartCut, "yyyy-MM-dd");
      const initEndDate = format(getDateEndCut, "yyyy-MM-dd");

      setStartDate(initStarDate);
      setEndDate(initEndDate);
    }
  }, [user]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['jobs-dash', startDate, endDate],
    enabled: Boolean(startDate) && Boolean(endDate), // Condição de habilitação
    staleTime: 0,
    queryFn: async () => {
      const response = await jobsService.getAllNoPagination(startDate, endDate);

      return response;
    },
  });

  const jobsPending = data?.data.filter(job => job.status === 'pending');
  const jobsApproving = data?.data.filter(job => job.status === 'approving');
  const jobsChanging = data?.data.filter(job => job.status === 'changing');
  const jobsApproved = data?.data.filter(job => job.status === 'approved');

  function openJobModal() {
    setOpenModalJob(true);
  }

  function closeJobModal() {
    setOpenModalJob(false);
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const starDate = formatedDate(data.startDate.toISOString());
      const endDate = formatedDate(data.endDate.toISOString());

      setStartDate(starDate);
      setEndDate(endDate);

      setSearchParams(params => {
        params.set('startDate', String(starDate))
        params.set('endDate', String(endDate))

        return params;
      });
      setOpenModalJob(false);
    } catch (error) {
      toast.error('Erro ao obter os dados!');
    }
  });

  return {
    register,
    control,
    reset,
    errors,
    handleSubmit,
    dateStartCut,
    dateEndCut,
    isLoading,
    isFetching,
    user,
    openJobModal,
    closeJobModal,
    openModalJob,
    jobsPending,
    jobsApproving,
    jobsChanging,
    jobsApproved
  };
}
