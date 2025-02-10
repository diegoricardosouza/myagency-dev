import { useAuth } from "@/app/hooks/useAuth";
import { useLocation, useMatch } from "react-router-dom";
import { BreadcrumbEditUser } from "./users/BreadcrumbEditUser";
import { BreadcrumbNewUser } from "./users/BreadcrumbNewUser";
import { BreadcrumbProfile } from "./users/BreadcrumbProfile";
import { BreadcrumbUser } from "./users/BreadcrumbUser";

export function BreadcrumbContainerUser() {
  const location = useLocation();
  const matchEditUser = useMatch("/usuarios/edit/:id");
  const { user } = useAuth();

  return (
    <>
      {location.pathname === "/usuarios" && (
        <BreadcrumbUser />
      )}

      {location.pathname === "/usuarios/novo" && (
        <BreadcrumbNewUser />
      )}

      {matchEditUser && (
        <BreadcrumbEditUser profileId={user?.data.id} />
      )}

      {location.pathname === "/perfil" && (
        <BreadcrumbProfile />
      )}
    </>
  )
}
