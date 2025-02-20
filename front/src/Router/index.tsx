import { AuthLayout } from "@/view/layouts/AuthLayout";
import { DashboardV2 } from "@/view/pages/DashboardV2";
import { Help } from "@/view/pages/Help";
import { Jobs } from "@/view/pages/Jobs";
import { FormatsJob } from "@/view/pages/Jobs/Formats";
import { NewFormats } from "@/view/pages/Jobs/Formats/NewFormats";
import { ViewJob } from "@/view/pages/Jobs/components/ViewJob";
import { NotFound } from "@/view/pages/NotFound";

import { DashboardLayoutV2 } from "@/view/layouts/DashboardLayoutV2";
import Checklists from "@/view/pages/Checklists";
import Plans from "@/view/pages/Plans";
import { EditPlan } from "@/view/pages/Plans/EditPlan";
import { NewPlan } from "@/view/pages/Plans/NewPlan";
import { Profile } from "@/view/pages/Profile";
import Projects from "@/view/pages/Projects";
import { EditProject } from "@/view/pages/Projects/EditProject";
import { NewProject } from "@/view/pages/Projects/NewProject";
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
            <Route element={<VerifyLevel level="ADMIN" />}>
              <Route path="/usuarios" element={<User />} />
              <Route path="/usuarios/novo" element={<NewUser />} />
              <Route path="/usuarios/edit/:id" element={<EditUser />} />
              <Route path="/planos" element={<Plans />} />
              <Route path="/planos/novo" element={<NewPlan />} />
              <Route path="/planos/edit/:id" element={<EditPlan />} />
            </Route>

            <Route path="/solicitacoes" element={<Jobs />} />
            <Route path="/solicitacoes/novo" element={<FormatsJob />} />
            <Route path="/solicitacoes/:formats" element={<NewFormats />} />
            <Route path="/solicitacoes/detalhes/:id" element={<ViewJob />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/ajuda" element={<Help />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projetos/novo" element={<NewProject />} />
            <Route path="/projetos/edit/:id" element={<EditProject />} />
            <Route path="/configuracoes/checklists" element={<Checklists />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
