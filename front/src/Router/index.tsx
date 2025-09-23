import { AuthLayout } from "@/view/layouts/AuthLayout";
import { Help } from "@/view/pages/Help";
import { NotFound } from "@/view/pages/NotFound";

import { DashboardLayoutV2 } from "@/view/layouts/DashboardLayoutV2";
import Checklists from "@/view/pages/Checklists";
import { DashboardV2 } from "@/view/pages/DashboardV2";
import Messages from "@/view/pages/Messages";
import { Profile } from "@/view/pages/Profile";
import Projects from "@/view/pages/Projects";
import { EditProject } from "@/view/pages/Projects/EditProject";
import { NewProject } from "@/view/pages/Projects/NewProject";
import { ShowPage } from "@/view/pages/Projects/ShowPage";
import ShowProject from "@/view/pages/Projects/ShowProject";
import { Register } from "@/view/pages/Register";
import User from "@/view/pages/Users";
import { EditUser } from "@/view/pages/Users/EditUser";
import { NewUser } from "@/view/pages/Users/NewUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../view/pages/Login";
import { AuthGuard } from "./AuthGuard";
import { VerifyLevel } from "./VerifyLevel";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<DashboardLayoutV2 />}>
            <Route path="/" element={<DashboardV2 />} />
            <Route path="/concluidos" element={<DashboardV2 finished />} />
            <Route element={<VerifyLevel level="ADMIN" />}>
              <Route path="/usuarios" element={<User />} />
              <Route path="/usuarios/novo" element={<NewUser />} />
              <Route path="/usuarios/edit/:id" element={<EditUser />} />
              <Route path="/projetos/novo" element={<NewProject />} />
              <Route path="/projetos/edit/:id" element={<EditProject />} />
              <Route path="/configuracoes/checklists" element={<Checklists />} />
              <Route path="/configuracoes/mensagens" element={<Messages />} />
            </Route>
            <Route path="/projetos/detalhes/:id" element={<ShowProject />} />
            <Route path="/projetos/detalhes/:id/page/:idPage" element={<ShowPage />} />

            <Route path="/perfil" element={<Profile />} />
            <Route path="/ajuda" element={<Help />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
