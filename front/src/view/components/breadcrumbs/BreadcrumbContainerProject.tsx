import { useLocation, useMatch } from "react-router-dom";
import { BreadcrumbEditProject } from "./projects/BreadcrumbEditProject";
import { BreadcrumbNewProject } from "./projects/BreadcrumbNewProject";
import { BreadcrumbProject } from "./projects/BreadcrumbProject";
import { BreadcrumbShowProject } from "./projects/BreadcrumbShowProject";
import { BreadcrumbShowProjectPage } from "./projects/BreadcrumbShowProjectPage";

export function BreadcrumbContainerProject() {
  const location = useLocation();
  const matchEditUser = useMatch("/projetos/edit/:id");
  const matchShowUser = useMatch("/projetos/detalhes/:id");
  const matchShowPage = useMatch("/projetos/detalhes/:id/page/:idPage");

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

      {matchShowUser && (
        <BreadcrumbShowProject />
      )}

      {matchShowPage && (
        <BreadcrumbShowProjectPage />
      )}
    </>
  )
}
