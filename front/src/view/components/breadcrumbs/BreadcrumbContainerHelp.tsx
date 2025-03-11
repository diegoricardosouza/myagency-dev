import { useLocation } from "react-router-dom";
import { BreadcrumbHelp } from "./help/BreadcrumbHelp";

export function BreadcrumbContainerHelp() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/ajuda" && (
        <BreadcrumbHelp />
      )}
    </>
  )
}
