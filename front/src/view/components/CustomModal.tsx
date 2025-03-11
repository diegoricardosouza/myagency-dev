import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";

interface CustomModalProps {
  closeModal: () => void;
  openModalTech: boolean;
  children: React.ReactNode
}

export function CustomModal({ openModalTech, closeModal, children }: CustomModalProps) {
  useEffect(() => {
    if (openModalTech) {
      // Quando o modal abre, remove a barra de rolagem
      document.body.classList.add("overflow-hidden");
    } else {
      // Quando o modal fecha, restaura a barra de rolagem
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function para garantir que a barra de rolagem seja restaurada
    // quando o componente for desmontado
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openModalTech]);

  return (
    <div>
      <div
        className={cn(
          "fixed z-50 opacity-0 top-0 left-0 transition-all duration-200 pointer-events-none w-full h-screen",
          openModalTech && "bg-black/80 opacity-100 pointer-events-auto"
        )}
      />

      <div
        className={cn(
          "fixed hidden top-[35%] left-[50%] lg:top-[50%] z-[90] w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg max-w-2xl transition-all",
          openModalTech && "absolute block"
        )}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Editar Informações Técnicas
          </h3>
          <p className="text-sm text-muted-foreground mt-[6px]">
            Edite as informações técnicas do projeto. Esta opção está disponível apenas para gestores.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={closeModal}
          className="absolute right-4 top-4 w-4 h-4 hover:bg-transparent"
        >
          <X className="w-4 h-4" />
        </Button>

        {children}
      </div>
    </div>
  )
}
