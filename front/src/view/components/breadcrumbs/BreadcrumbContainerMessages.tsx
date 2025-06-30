import { useLocation } from "react-router-dom";
import { BreadcrumbMessage } from "./messages/BreadcrumbMessage";

export function BreadcrumbContainerMessages() {
  const location = useLocation();


  return (
    <>
      {location.pathname === "/configuracoes/mensagens" && (
        <BreadcrumbMessage />
      )}
    </>
  )
}
