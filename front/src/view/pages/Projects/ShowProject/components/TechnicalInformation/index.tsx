/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserMe } from "@/app/contexts/AuthContext";
import { CustomModal } from "@/view/components/CustomModal";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Label } from "@/view/components/ui/label";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Edit, Loader2, Settings } from "lucide-react";
import { Controller } from "react-hook-form";
import { useTechnicalInformationController } from "./useTechnicalInformationController";

interface TechnicalInformationProps {
  user: UserMe | undefined;
  technicalInfo?: string;
}

export function TechnicalInformation({ user, technicalInfo }: TechnicalInformationProps) {
  const { handleSubmit, openModal, closeModal, openModalTech, isPending, errors, control } = useTechnicalInformationController();

  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              Informações Técnicas
            </h3>
            {user?.data.level === "ADMIN" && (
              <Button size="sm" onClick={openModal} className="flex gap-2">
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>

          {technicalInfo && (
            <div
              className="bg-muted p-3 rounded-md text-sm project-technicalInfo break-all"
              dangerouslySetInnerHTML={{ __html: technicalInfo || "" }}
            />
          )}
        </CardContent>
      </Card>

      <CustomModal
        closeModal={closeModal}
        openModalTech={openModalTech}
        title="Editar Informações Técnicas"
        description="Edite as informações técnicas do projeto. Esta opção está disponível apenas para gestores."
      >
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <Label htmlFor="description" className="mb-2 block">Informações Técnicas</Label>
            <Controller
              control={control}
              name="description"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <div onClick={(e) => e.stopPropagation()}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    config={{
                      licenseKey: 'GPL',
                      language: 'pt-br'
                    }}
                    onChange={(_event, editor) => {
                      const data = editor.getData();
                      onChange(data);
                    }}
                  />
                </div>
              )}
            />
            {errors?.description?.message && (
              <div className="flex gap-2 items-center text-red-700">
                <span className="text-xs">{errors?.description?.message}</span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={closeModal}
              type="button"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Atualizar
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  )
}
