import { useLocation, useMatch } from "react-router-dom";
import { BreadcrumbEditProject } from "./projects/BreadcrumbEditProject";
import { BreadcrumbNewProject } from "./projects/BreadcrumbNewProject";
import { BreadcrumbProject } from "./projects/BreadcrumbProject";

export function BreadcrumbContainerProject() {
  const location = useLocation();
  const matchEditUser = useMatch("/projetos/edit/:id");

  return (
    <>
      {location.pathname === "/projetos" && (
        <BreadcrumbProject />
      )}

      {location.pathname === "/projetos/novo" && (
        <BreadcrumbNewProject />
      )}

      {matchEditUser && (
        <BreadcrumbEditProject />
      )}
    </>
  )
}
