import { useAuth } from "@/app/hooks/useAuth";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      <div>
        <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 mb-2">
          Seus Dados
        </h2>
        <Card x-chunk="dashboard-07-chunk-0" className="pt-6">
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-1">
                <Label>Razão Social:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.corporate_name}</p>
              </div>

              <div className="grid gap-1">
                <Label>Nome Fantasia:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.fantasy_name}</p>
              </div>

              <div className="grid gap-1">
                <Label>CNPJ:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.cnpj}</p>
              </div>

              <div className="grid gap-1">
                <Label>Responsável:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.responsible}</p>
              </div>

              <div className="grid gap-1">
                <Label>CPF:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.cpf}</p>
              </div>

              <div className="grid gap-1">
                <Label>CEP:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.zipcode}</p>
              </div>

              <div className="grid gap-1">
                <Label>Endereço:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.address}</p>
              </div>

              <div className="grid gap-1">
                <Label>Bairro:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.neighborhood}</p>
              </div>

              <div className="grid gap-1">
                <Label>Cidade:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.city}</p>
              </div>

              <div className="grid gap-1">
                <Label>Estado:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.state}</p>
              </div>

              <div className="grid gap-1">
                <Label>Número:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.number}</p>
              </div>

              <div className="grid gap-1">
                <Label>Telefone:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.phone}</p>
              </div>

              <div className="grid gap-1">
                <Label>Celular:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.cellphone}</p>
              </div>

              <div className="grid gap-1">
                <Label>Email:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.email}</p>
              </div>

              <div className="grid gap-1">
                <Label>Site:</Label>
                <p className="text-muted-foreground text-sm">{user?.data.site}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
