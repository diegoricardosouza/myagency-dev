import { LevelProps, LEVELS, STATES } from "@/app/config/constants";
import { useAuth } from "@/app/hooks/useAuth";
import { InputCepCardMask } from "@/view/components/InputCepCardMask";
import { InputMask } from "@/view/components/InputMask";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import { ChevronLeft, Loader2, PlusCircle } from "lucide-react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { BreadcrumbEditUser } from "./BreadcrumbEditUser";
import { useEditUserController } from "./useEditUserController";

export function EditUser() {
  const {
    handleSubmit,
    errors,
    register,
    control,
    isPending,
    linkLogo,
    isLoading,
    changeLogo,
    id,
    zipcodeValid
  } = useEditUserController();
  const { user } = useAuth();
  const readOnly = user?.data.level === 'CLIENTE';

  return (
    <>
      <BreadcrumbEditUser
        id={id}
        profileId={user?.data.id}
      />

      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[900px] w-full flex-1 auto-rows-max gap-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link to="/usuarios">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {id === user?.data.id ? 'Meu Perfil' : 'Editar Usuário'}
              </h1>
            </div>

            {user?.data.level !== 'CLIENTE' && (
              <div>
                <Button size="sm" className="h-8 gap-1" asChild>
                  <Link to="/usuarios/novo">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Novo Usuário
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <form
            className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-5"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-5">
              <Card x-chunk="dashboard-07-chunk-0" className="pt-6 relative">
                {isLoading && (
                  <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white">
                    <Spinner className="w-6 h-6 fill-primary" />
                  </div>
                )}

                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          {...register('name')}
                          error={errors?.name?.message}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          type="text"
                          className="w-full"
                          {...register('company')}
                          error={errors?.company?.message}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="grid gap-3">
                        <Label htmlFor="responsible">Responsável</Label>
                        <Input
                          id="responsible"
                          type="text"
                          className="w-full"
                          {...register('responsible')}
                          error={errors?.responsible?.message}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="whatsapp">Whatsapp</Label>
                        <Controller
                          control={control}
                          name="whatsapp"
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <InputMask
                              mask="(__) _____-____"
                              value={value}
                              onChange={onChange}
                              error={errors?.whatsapp?.message}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="text"
                        className="w-full"
                        {...register('email')}
                        error={errors?.email?.message}
                        readOnly={readOnly}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="cpf">CPF</Label>
                      <Controller
                        control={control}
                        name="cpf"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <InputMask
                            mask="___.___.___-__"
                            value={value}
                            onChange={onChange}
                            error={errors?.cpf?.message}
                            readOnly={readOnly}
                          />
                        )}
                      />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="grid gap-3 col-span-2">
                        <div className="flex items-center">
                          <Label htmlFor="address">Endereço</Label>
                        </div>
                        <Input
                          id="address"
                          type="text"
                          {...register('address')}
                          error={errors?.address?.message}
                        />
                      </div>

                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="number">Número</Label>
                        </div>
                        <Input
                          id="number"
                          type="number"
                          {...register('number')}
                          error={errors?.number?.message}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="grid gap-2 col-span-2">
                        <div className="flex items-center">
                          <Label htmlFor="neighborhood">Bairro</Label>
                        </div>
                        <Input
                          id="neighborhood"
                          type="text"
                          {...register('neighborhood')}
                          error={errors?.neighborhood?.message}
                        />
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="zipcode">CEP</Label>
                        </div>
                        <Controller
                          control={control}
                          name="zipcode"
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <InputCepCardMask
                              value={value}
                              onChange={onChange}
                              error={errors?.zipcode?.message}
                            />
                          )}
                        />
                        {zipcodeValid && (
                          <span className="flex gap-2 items-center text-red-700 text-xs">{zipcodeValid}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="grid gap-3 col-span-2">
                        <div className="flex items-center">
                          <Label htmlFor="city">Cidade</Label>
                        </div>
                        <Input
                          id="city"
                          type="text"
                          {...register('city')}
                          error={errors?.city?.message}
                        />
                      </div>

                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="state">Estado</Label>
                        </div>
                        <Controller
                          control={control}
                          name="state"
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <Select
                              onValueChange={onChange}
                              value={value}
                            >
                              <SelectTrigger
                                id="state"
                                aria-label="Selecione o estado"
                              >
                                <SelectValue placeholder="Selecione o estado" />
                              </SelectTrigger>
                              <SelectContent>
                                {STATES.map((level: LevelProps) => (
                                  <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                                ))}
                              </SelectContent>

                              {errors?.state?.message && (
                                <div className="flex gap-2 items-center text-red-700">
                                  <span className="text-xs">{errors?.state?.message}</span>
                                </div>
                              )}
                            </Select>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        className="w-full"
                        {...register('password')}
                        error={errors?.password?.message}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-5">
              <Card x-chunk="dashboard-07-chunk-3" className="pt-6 relative">
                {isLoading && (
                  <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white">
                    <Spinner className="w-6 h-6 fill-primary" />
                  </div>
                )}

                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="logo">Logo</Label>

                      <div className="block">
                        <img
                          alt="Product image"
                          className="aspect-square w-[80px] h-[80px] lg:w-auto lg:h-auto lg:max-h-[130px] rounded-md object-contain mx-auto"
                          src={linkLogo}
                        />
                      </div>

                      <Input
                        id="logo"
                        type="file"
                        {...register('logo')}
                        error={errors?.logo?.message}
                        onChange={changeLogo}
                      />
                    </div>

                    {user?.data.level !== 'CLIENTE' && (
                      <div className="grid gap-3">
                        <Label htmlFor="nivel">Nível</Label>
                        <Controller
                          control={control}
                          name="level"
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <Select
                              onValueChange={onChange}
                              value={value}
                            >
                              <SelectTrigger
                                id="nivel"
                                aria-label="Selecione o nível"
                              >
                                <SelectValue placeholder="Selecione o nível" />
                              </SelectTrigger>
                              <SelectContent>
                                {LEVELS.map((level: LevelProps) => (
                                  <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                                ))}
                              </SelectContent>

                              {errors?.level?.message && (
                                <div className="flex gap-2 items-center text-red-700">
                                  <span className="text-xs">{errors?.level?.message}</span>
                                </div>
                              )}
                            </Select>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-2 md:ml-auto md:flex">
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Atualizar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
