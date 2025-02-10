import { usersService } from "@/app/services/usersService";
import { UserParams } from "@/app/services/usersService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
});

type FormData = z.infer<typeof schema>

export function useNewUserController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [zipcodeValid, setZipcodeValid] = useState('');

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const zipcode = watch("zipcode"); // Observa alterações no CEP

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

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UserParams) => {
      return usersService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário cadastrado com sucesso!');
      reset();
      navigate("/usuarios");
    } catch (error) {
      toast.error('Erro ao cadastrar o usuário');
    }
  });

  return {
    errors,
    register,
    handleSubmit,
    control,
    isPending,
    zipcodeValid
  }
}
