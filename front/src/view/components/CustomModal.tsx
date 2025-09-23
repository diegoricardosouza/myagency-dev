import { X } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";

interface CustomModalProps {
  closeModal: () => void;
  openModalTech: boolean;
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function CustomModal({ openModalTech, closeModal, children, title, description, icon }: CustomModalProps) {
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

  if (!openModalTech) {
    return null; // Não renderiza nada se o modal estiver fechado
  }

  return (
    <div>
      {/* Overlay */}
      <div
        className="fixed z-50 bg-black/80 opacity-100 pointer-events-auto top-0 left-0 w-full h-screen transition-all duration-200"
        onClick={closeModal}
      />

      {/* Modal */}
      <div
        className="fixed z-[90] w-full max-w-2xl top-[35%] left-[50%] lg:top-[50%] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-lg transition-all duration-200"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight flex items-center gap-2">
            {icon}
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-[6px]">
            {description}
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
  );
}
