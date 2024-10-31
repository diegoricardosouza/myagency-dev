import { useAuth } from "@/app/hooks/useAuth"
import { CardPlan } from "@/view/components/CardPlan"
import { Spinner } from "@/view/components/Spinner"
import { Button } from "@/view/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/view/components/ui/table"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { BreadcrumbPlan } from "./components/BreadcrumbPlan"
import { PlanItem } from "./components/PlanItem"
import { usePlanController } from "./usePlanController"

export default function Plans() {
  const { user } = useAuth();
  const { plans, handleDeletePlan, isLoadingDelete, isLoading } = usePlanController();

  return (
    <>
      <BreadcrumbPlan />

      <div>
        {user?.data.level === 'ADMIN' && (
          <>
            <div className="flex mb-4">
              <Button size="sm" className="h-8 gap-1" asChild>
                <Link to="/planos/novo">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Novo Plano
                  </span>
                </Link>
              </Button>
            </div>

            <Card className="min-h-[500px] relative">
              {isLoadingDelete || isLoading && (
                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
                  <Spinner className="w-6 h-6 fill-primary" />
                </div>
              )}

              <CardHeader>
                <CardTitle>Planos</CardTitle>
              </CardHeader>
              <CardContent>
                {!isLoadingDelete && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[230px]">Nome do Plano</TableHead>
                        <TableHead>Qtd. Artes</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead className="w-[130px]">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {plans?.map((plan) => (
                        <PlanItem key={plan.id} {...plan} deleteItem={handleDeletePlan} />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card><br />
          </>
        )}

        <div className="lg:grid grid-cols-3 gap-7">
          {plans?.map((plan) => (
            <CardPlan
              key={plan.id}
              id={plan.id}
              name={plan.name}
              price={plan.price}
              quantity={plan.quantity}
            />
          ))}
        </div>
      </div>
    </>
  )
}
