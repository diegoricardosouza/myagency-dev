import { useLocation } from "react-router-dom";
import { BreadcrumbChecklist } from "./checklists/BreadcrumbChecklist";

export function BreadcrumbContainerChecklists() {
  const location = useLocation();


  return (
    <>
      {location.pathname === "/configuracoes/checklists" && (
        <BreadcrumbChecklist />
      )}
    </>
  )
}
