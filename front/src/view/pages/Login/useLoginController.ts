import { useAuth } from "@/app/hooks/useAuth";
import { authService } from "@/app/services/authService";
import { SigninParams } from "@/app/services/authService/signin";
import { SigninParamsArts } from "@/app/services/authService/signinArts";
import { SigninParamsMyagency } from "@/app/services/authService/signinMyagency";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

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

  const { mutateAsync: mutateAsyncArts } = useMutation({
    mutationFn: async (data: SigninParamsArts) => {
      return authService.signinArts(data);
    }
  });

  const { signin, signinMyagency, signinArts } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      setIsLoading(true);
      const { token: tokenMyagency } = await mutateAsyncMyagency({
        email: import.meta.env.VITE_PRIVATE_USERMYAGENCY,
        password: import.meta.env.VITE_PRIVATE_PASSMYAGENCY,
      });
      const { token: tokenArts } = await mutateAsyncArts({
        email: import.meta.env.VITE_PRIVATE_USERARTS,
        password: import.meta.env.VITE_PRIVATE_PASSARTS,
      });
      const { token } = await mutateAsync(data);

      signin(token);
      signinMyagency(tokenMyagency);
      signinArts(tokenArts);
    } catch {
      toast.error("Credenciais inválidas");
    } finally {
      setIsLoading(false);
    }
  });

  return { handleSubmit, register, errors, isPending, isLoading };
}
