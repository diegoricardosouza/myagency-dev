/* eslint-disable @typescript-eslint/no-explicit-any */
import { MAX_FILE_SIZE } from "@/app/config/constants";
import { checklistsService } from "@/app/services/checklistsService";
import { plansMyagencyService } from "@/app/services/plansMyagencyService";
import { projectsService } from "@/app/services/projectsService";
import { ProjectsParams } from "@/app/services/projectsService/create";
import { usersService } from "@/app/services/usersService";
import { formatedDate, formatedPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  user_id: z.string()
    .min(1, 'Cliente é obrigatório'),
  type: z.string()
    .min(1, 'Tipo do Projeto é obrigatório'),
  project_name: z.string()
    .min(1, 'Nome do Projeto é obrigatório'),
  name: z.string()
    .min(1, 'Nome Fantasia é obrigatório'),
  phone: z.string()
    .min(1, 'Whatsapp é obrigatório'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  number_pages: z.string()
    .min(1, 'O número de páginas é obrigatório'),
  technical_information: z.string().optional(),
  observations: z.string().optional(),
  value_project: z.string()
    .min(1, 'Valor do Projeto é de preenchimento obrigatório.'),
  payment_method: z.string()
    .min(1, 'Forma de Pagamento é de preenchimento obrigatório.'),
  installment: z.string().optional(),
  other: z.string().optional(),
  entry_payment: z.string().optional(),
  proof: z.instanceof(FileList)
    .optional()
    .transform((list) => list ? list.item(0) || undefined : undefined)
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "O tamanho máximo é 3MB."),
  plan_id: z.string()
    .min(1, 'Plano é obrigatório.'),
  plan_name: z.string().optional(),
  signed_contract: z.string()
    .min(1, 'Contrato Assinado é de preenchimento obrigatório.'),
  outsource: z.string().optional(),
  closing_date: z.date(),
  calendar_days: z.string()
    .min(1, 'Dias Corridos é de preenchimento obrigatório'),
  pages: z.array(
    z.object({
      name: z.string().min(1, 'Cada página deve ser preenchida')
    })
  ),
  checklists: z.array(
    z.object({
      name: z.string().min(1, 'Cada item deve ser preenchido')
    })
  )
});

export type FormData = z.infer<typeof schema>;

export function useNewProjectController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      number_pages: '1',
      pages: [
        { name: '' },
      ],
      checklists: []
    }
  });

  const {
    fields: fieldsChecklist,
    append: appendChecklist,
    remove: removeChecklist,
    replace
  } = useFieldArray({
    control: form.control,
    name: "checklists"
  });

  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control: form.control,
    name: "pages"
  });

  const { data: dataChecklist } = useQuery({
    queryKey: ['checklists'],
    staleTime: 0,
    queryFn: async () => {
      const response = await checklistsService.getAll(null);

      return response;
    },
  });

  useEffect(() => {
    if (dataChecklist?.data && dataChecklist.data.length > 0 && fieldsChecklist.length === 0) {
      const defaultChecklists = dataChecklist.data.map((item: any) => ({
        name: item.name
      }));
      replace(defaultChecklists);
    }
  }, [dataChecklist, fieldsChecklist.length, replace]);

  // Observa o valor do campo number_pages
  const numberPages = form.watch("number_pages");

  // Quando o valor de number_pages mudar, ajusta a quantidade de inputs
  useEffect(() => {
    const count = Number(numberPages) || 0;

    if (count > fields.length) {
      // Adiciona inputs até atingir o número desejado
      for (let i = fields.length; i < count; i++) {
        append({ name: '' });
      }
    } else if (count < fields.length) {
      // Remove inputs excedentes
      for (let i = fields.length; i > count; i--) {
        remove(i - 1);
      }
    }
    // OBS: Incluímos fields.length como dependência para garantir sincronismo
  }, [numberPages, fields.length, append, remove]);


  const { data: dataPlans, isFetching } = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansMyagencyService.getAll(),
  })

  const { data: dataUser, isFetching: isFetchingUser } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.getAllNoPagination(),
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: ProjectsParams) => {
      return projectsService.create(data);
    }
  });

  function handleAddChecklist() {
    appendChecklist({ name: '' });
  }

  function handleRemovePage(index: number) {
    remove(index);
    // Atualiza o campo number_pages para refletir a nova quantidade
    form.setValue("number_pages", String(fields.length - 1));
  }

  function handleRemoveChecklist(index: number) {
    removeChecklist(index);
  }

  const handleFormSubmit = form.handleSubmit(async (data) => {
    try {
      const planName = dataPlans?.data.filter(plan => plan.id === data.plan_id);
      const defaultPages = [
        {
          name: 'Layout'
        },
        {
          name: 'Informações Técnicas'
        },
      ];

      const allPages = [
        ...defaultPages,
        ...data.pages
      ];

      await mutateAsync({
        ...data,
        value_project: formatedPrice(data.value_project),
        entry_payment: data.entry_payment ? formatedPrice(data.entry_payment) : undefined,
        installment: Number(data.installment),
        pages: allPages.map((p) => p.name),
        closing_date: formatedDate(data.closing_date.toISOString()),
        calendar_days: Number(data.calendar_days),
        number_pages: Number(data.number_pages),
        plan_name: planName?.[0]?.name || '',
        checklists: data.checklists.map((c) => ({
          name: c.name,
          active: false
        }))
      });

      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto cadastrado com sucesso!');
      form.reset();
      navigate("/projetos");
    } catch (error) {
      toast.error('Erro ao cadastrar o projeto');
    }
  });

  return {
    handleFormSubmit,
    isPending,
    plans: dataPlans,
    checklists: dataChecklist,
    users: dataUser,
    isFetching,
    fields,
    handleRemovePage,
    form,
    isFetchingUser,
    handleAddChecklist,
    handleRemoveChecklist,
    fieldsChecklist
  }
}
