/* eslint-disable @typescript-eslint/no-explicit-any */
import { MAX_FILE_SIZE } from "@/app/config/constants";
import { checklistsService } from "@/app/services/checklistsService";
import { plansMyagencyService } from "@/app/services/plansMyagencyService";
import { projectsService } from "@/app/services/projectsService";
import { UpdateProjectParams } from "@/app/services/projectsService/update";
import { usersService } from "@/app/services/usersService";
import { formatedDate, formatedPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
  technical_information: z.null().optional(),
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

type FormData = z.infer<typeof schema>

export function useEditProjectController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [initialPagesLoaded, setInitialPagesLoaded] = useState(false);
  const [linkProof, setLinkProof] = useState('');
  const [nameProof, setNameProof] = useState('');

  const { data: userEditData, isLoading } = useQuery({
    queryKey: ['editProjeto', id],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await projectsService.getById(id!);
        return response;
      } catch (error) {
        toast.error('Projeto não encontrado');
        navigate("/projetos");
      }
    }
  });

  const { data: dataPlans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansMyagencyService.getAll(),
  });

  const { data: dataUser, isFetching: isFetchingUser } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.getAllNoPagination(),
  });

  const { data: dataChecklist } = useQuery({
    queryKey: ['checklists'],
    staleTime: 0,
    queryFn: async () => {
      const response = await checklistsService.getAll(id);

      return response;
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema)
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

  useEffect(() => {
    if (userEditData?.data && !initialPagesLoaded) {
      if (userEditData.data.pages && userEditData.data.pages.length > 0) {
        userEditData.data.pages.forEach((page: any) => {
          append({ name: page.name });
        });
      }
      setInitialPagesLoaded(true);
    }
  }, [userEditData, initialPagesLoaded, append]);

  // Quando o valor de number_pages mudar, ajusta a quantidade de inputs
  useEffect(() => {
    // Só executa se os dados iniciais já foram carregados
    if (initialPagesLoaded) {
      const count = Number(numberPages) || 0;
      if (count > fields.length) {
        // Adiciona inputs vazios até atingir o número desejado
        for (let i = fields.length; i < count; i++) {
          append({ name: '' });
        }
      } else if (count < fields.length) {
        // Remove inputs excedentes
        for (let i = fields.length; i > count; i--) {
          remove(i - 1);
        }
      }
    }
  }, [numberPages, fields.length, append, remove, initialPagesLoaded]);

  // Definindo valores padrão após a obtenção dos dados do usuário
  useEffect(() => {
    if (userEditData?.data) {
      form.setValue("user_id", userEditData?.data?.user.id);
      form.setValue("type", userEditData?.data?.type);
      form.setValue("project_name", userEditData?.data?.project_name);
      form.setValue("name", userEditData?.data?.name);
      form.setValue("phone", userEditData?.data?.phone);
      form.setValue("email", userEditData?.data?.email);
      form.setValue("number_pages", String(userEditData?.data?.number_pages));
      form.setValue("observations", userEditData?.data?.observations);
      form.setValue("value_project", String(userEditData?.data?.value_project));
      form.setValue("payment_method", userEditData?.data?.payment_method);
      form.setValue("installment", String(userEditData?.data?.installment));
      form.setValue("other", userEditData?.data?.other);
      form.setValue("entry_payment", String(userEditData?.data?.entry_payment));
      form.setValue("plan_id", userEditData?.data?.plan_id);
      form.setValue("signed_contract", userEditData?.data?.signed_contract);
      form.setValue("outsource", userEditData?.data?.outsource);
      form.setValue("closing_date", new Date(userEditData?.data?.closing_date));
      form.setValue("calendar_days", String(userEditData?.data?.calendar_days));

      setLinkProof(userEditData?.data.proof);
      setNameProof(userEditData?.data.proof.replace(`${import.meta.env.VITE_API_URL_BASE}/storage/projects/`, ''));
    }
  }, [form, userEditData]);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateProjectParams) => {
    return projectsService.update(data);
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

  function handleValueClient(selectedId: string, onChange: (value: string) => void) {
    const selectedUser = dataUser?.data.find((user) => user.id === selectedId);
    onChange(selectedId); // Continua o funcionamento do formulário
    // console.log("Usuário selecionado:", selectedUser); // ✅ Aqui você vê os dados no console

    if (selectedUser) {
      form.setValue("phone", selectedUser.cellphone || '');
      form.setValue("name", selectedUser.responsible || '');
      form.setValue("email", selectedUser.email || '');
    }
  }

  const handleFormSubmit = form.handleSubmit(async (data) => {
    try {
      if(id) {
        const planName = dataPlans?.data.filter(plan => plan.id === data.plan_id);

        await mutateAsync({
          ...data,
          id,
          value_project: formatedPrice(data.value_project),
          entry_payment: data.entry_payment ? formatedPrice(data.entry_payment) : undefined,
          installment: Number(data.installment),
          pages: data.pages.map((p) => p.name),
          closing_date: formatedDate(data.closing_date.toISOString()),
          calendar_days: Number(data.calendar_days),
          number_pages: Number(data.number_pages),
          plan_name: planName?.[0]?.name || '',
          checklists: data.checklists.map((c) => ({
            name: c.name,
            active: false
          }))
        });
      }

      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao cadastrar o projeto');
    }
  });

  return {
    form,
    handleFormSubmit,
    isPending,
    isLoading,
    id,
    users: dataUser,
    isFetchingUser,
    plans: dataPlans,
    handleAddChecklist,
    handleRemovePage,
    handleRemoveChecklist,
    handleValueClient,
    fields,
    fieldsChecklist,
    linkProof,
    nameProof
  }
}
