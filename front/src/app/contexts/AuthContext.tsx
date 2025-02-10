import { LaunchScreen } from "@/view/components/LaunchScreen";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { localStoragekeys } from "../config/localStorageKeys";
import { usersService } from "../services/usersService";

interface UserMe {
  data: {
    id: string;
    corporate_name: string;
    fantasy_name: string;
    cnpj: string;
    responsible: string;
    level: string;
    cpf: string;
    zipcode: number;
    address: string;
    city: string;
    neighborhood: string | number;
    state: string;
    number: string;
    phone: string;
    cellphone: string;
    site: string;
    email: string;
  }
}

interface AuthContextValue {
  signedIn: boolean;
  user: UserMe | undefined;
  signin(token: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedToken = localStorage.getItem(localStoragekeys.TOKEN);

    return !!storedToken;
  });
  const queryClient = useQueryClient();

  const { isError, isSuccess, data, isLoading } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  });

  const signin = useCallback((token: string) => {
    localStorage.setItem(localStoragekeys.TOKEN, token);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStoragekeys.TOKEN);
    queryClient.invalidateQueries({ queryKey: ['users','me'] });

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout
      }}
    >
      <LaunchScreen isLoading={isLoading} />

      {!isLoading && children}
    </AuthContext.Provider>
  )
}
