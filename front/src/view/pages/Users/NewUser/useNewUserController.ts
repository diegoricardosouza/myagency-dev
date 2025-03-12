import { plansMyagencyService } from "@/app/services/plansMyagencyService";
import { usersArtsService } from "@/app/services/usersArtsService";
import { UserArtsParams } from "@/app/services/usersArtsService/create";
import { usersMyagencyService } from "@/app/services/usersMyagencyService";
import { UserMyAgencyParams } from "@/app/services/usersMyagencyService/create";
import { usersService } from "@/app/services/usersService";
import { UserParams } from "@/app/services/usersService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  corporate_name: z.string()
    .min(1, 'Razão Social é obrigatório'),
  fantasy_name: z.string()
    .min(1, 'Nome Fantasia é obrigatório'),
  cnpj: z.string()
    .min(1, 'CNPJ é obrigatório'),
  responsible: z.string()
    .min(1, 'Responsável é obrigatório'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  phone: z.string()
    .min(1, 'Telefone é obrigatório'),
  cellphone: z.string()
    .min(1, 'Celular é obrigatório'),
  address: z.string()
    .min(1, 'Endereço é de preenchimento obrigatório.'),
  zipcode: z.string()
    .min(1, 'CEP é de preenchimento obrigatório.'),
  city: z.string()
    .min(1, 'Cidade é de preenchimento obrigatório.'),
  state: z.string()
    .min(1, 'Estado é de preenchimento obrigatório.'),
  number: z.string()
    .min(1, 'Número é de preenchimento obrigatório.'),
  neighborhood: z.string()
    .min(1, 'Bairro é de preenchimento obrigatório.'),
  cpf: z.string()
    .min(1, 'CPF é de preenchimento obrigatório.'),
  site: z.string()
    .min(1, 'Site é de preenchimento obrigatório.'),
  password: z.string()
    .min(3, 'A senha deve conter pelo menos 3 dígitos'),
  level: z.string()
    .min(1, 'Nível é obrigatório'),
  myagency: z.string()
    .min(1, 'Campo é obrigatório'),
  arts: z.string()
    .min(1, 'Campo é obrigatório'),
  plan: z.string().optional()
}).refine((data) => {
  // Se myagency for "Sim", então plan deve ser obrigatório
  if (data.myagency === 'Sim') {
    return !!data.plan;
  }
  // Se myagency for "Não", não é necessário validar plan
  return true;
}, {
  message: 'Plano é obrigatório',
  path: ['plan'], // Especifica que o erro é no campo 'plan'
});

type FormData = z.infer<typeof schema>

export function useNewUserController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [zipcodeValid, setZipcodeValid] = useState('');
  const [showPlanField, setShowPlanField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      myagency: 'Não',
      arts: 'Não',
      plan: ''
    }
  });
  const myagencyValue = watch("myagency");
  const artsValue = watch("arts");
  const zipcode = watch("zipcode");

  useEffect(() => {
    setShowPlanField(myagencyValue === 'Sim');

    if (myagencyValue === 'Não') {
      setValue('plan', '');
      clearErrors('plan');
    }
  }, [myagencyValue, setValue, clearErrors]);

  // Chamada para ViaCEP
  useEffect(() => {
    if (zipcode) {
      setValue("address", "");
      setValue("city", "");
      setValue("state", "");
      setValue("neighborhood", "");
      setValue("number", "");
    }

    const fetchAddress = async (cep: string) => {
      setZipcodeValid("");
      if (cep?.length === 8) { // Formato completo do CEP
        try {
          const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (!data.erro) {
            setValue("neighborhood", data.bairro);
            setValue("city", data.localidade);
            setValue("state", data.uf);
            setValue("address", data?.logradouro);
          } else {
            console.error("CEP inválido.");
            setZipcodeValid("CEP inválido.");
          }
        } catch (error) {
          console.error("Erro ao buscar o endereço:", error);
        }
      }
    };

    fetchAddress(zipcode);
  }, [zipcode, setValue]);

  const { data: dataPlans, isPending: isPendingPlan } = useQuery({
    queryKey: ['plans'],
    enabled: myagencyValue === 'Sim',
    queryFn: () => plansMyagencyService.getAll(),
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UserParams) => {
      return usersService.create(data);
    }
  });

  const { mutateAsync: mutateAsyncMyAgency } = useMutation({
    mutationFn: async (data: UserMyAgencyParams) => {
      return usersMyagencyService.create(data);
    }
  });

  const { mutateAsync: mutateAsyncArts } = useMutation({
    mutationFn: async (data: UserArtsParams) => {
      return usersArtsService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    setIsLoading(true);

    try {
      if (myagencyValue === 'Sim') {
        try {
          await mutateAsyncMyAgency({
            name: data.corporate_name,
            company: data.corporate_name,
            responsible: data.responsible,
            email: data.email,
            level: data.level,
            whatsapp: data.cellphone,
            day: Number(new Date().getDate()),
            plan_id: data.plan!,
            password: data.password,
            logo: null
          });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toast.error(`Erro ao cadastrar no Minha Agência:<br> ${error.response.data.message || 'Erro desconhecido'}`);
          } else {
            toast.error('Erro ao cadastrar no Minha Agência');
          }
          setIsLoading(false);
          return;
        }
      }
      if (artsValue === 'Sim') {
        try {
          await mutateAsyncArts({
            name: data.corporate_name,
            company: data.corporate_name,
            responsible: data.responsible,
            email: data.email,
            level: data.level,
            whatsapp: data.cellphone,
            cpf: data.cpf,
            password: data.password,
            logo: null,
            address: data.address,
            zipcode: data.zipcode,
            city: data.city,
            state: data.state,
            neighborhood: data.neighborhood,
            credits: 0,
            number: data.number
          });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toast.error(`Erro ao cadastrar no Artes:<br> ${error.response.data.message || 'Erro desconhecido'}`);
          } else {
            toast.error('Erro ao cadastrar no Artes');
          }
          setIsLoading(false);
          return;
        }
      }

      await mutateAsync({
        ...data
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário cadastrado com sucesso!');
      reset();
      navigate("/usuarios");

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Erro ao cadastrar o usuário: ${error.response.data.message || 'Erro desconhecido'}`);
      } else {
        toast.error('Erro ao cadastrar o usuário');
      }
    } finally {
      setIsLoading(false);
    }
  });

  return {
    errors,
    register,
    handleSubmit,
    control,
    isPending,
    zipcodeValid,
    plans: dataPlans?.data,
    showPlanField,
    isPendingPlan,
    isLoading
  }
}
