import { useAuth } from "@/app/hooks/useAuth";
import { authService } from "@/app/services/authService";
import { SigninParams } from "@/app/services/authService/signin";
import { SigninParamsMyagency } from "@/app/services/authService/signinMyagency";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string()
        .min(1, 'E-mail é obrigatório')
        .email('Informe um e-mail válido'),
  password: z.string()
            .min(3, 'A senha deve conter pelo menos 3 dígitos'),
});

type FormData = z.infer<typeof schema>

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    }
  });

  const { mutateAsync: mutateAsyncMyagency } = useMutation({
    mutationFn: async (data: SigninParamsMyagency) => {
      return authService.signinMyagency(data);
    }
  });

  const { signin, signinMyagency } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      const { token: tokenMyagency } = await mutateAsyncMyagency({
        email: import.meta.env.VITE_PRIVATE_USERMYAGENCY,
        password: import.meta.env.VITE_PRIVATE_PASSMYAGENCY,
      });
      const { token } = await mutateAsync(data);

      signin(token);
      signinMyagency(tokenMyagency);
    } catch {
      toast.error("Credenciais inválidas");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
