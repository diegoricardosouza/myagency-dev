import { Jobs } from "@/app/entities/Jobs";
import { Card, CardContent } from "@/view/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

// type PageStatus = "pending" | "approved" | "in_progress" | "review"

// interface ProjectPage {
//   id: string;
//   page: string;
//   content: string;
//   status: string;
//   updated_at: string;
//   files: Files[] | undefined
// }

// interface PageFile {
//   id: string
//   name: string
//   size: string
//   type: string
//   uploadDate: string
//   url: string
// }

interface ProjectDetailsProps {
  temporaryLink?: string;
  description?: string;
  typeProject?: string;
  pages?: Jobs[];
}

export function ProjectDetails({ temporaryLink, description, pages, typeProject }: ProjectDetailsProps) {
  const [showProjectDetails, setShowProjectDetails] = useState(false)

  return (
    <div className="mb-6">
      <button
        className="w-full flex items-center justify-between bg-white border p-4 rounded-lg"
        onClick={() => setShowProjectDetails(!showProjectDetails)}
      >
        <h2 className="text-lg font-medium">Detalhes do Projeto</h2>
        {showProjectDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {showProjectDetails && (
        <Card className="mt-2 border-t-0 rounded-t-none">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Descrição</h3>
                <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: description ? description : '' }} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Informações Adicionais</h3>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="text-sm font-medium">Tipo do Projeto:</span>
                    <span className="text-sm text-muted-foreground">{typeProject}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sm font-medium">Total de Páginas:</span>
                    <span className="text-sm text-muted-foreground">{pages?.length}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sm font-medium">Páginas Aprovadas:</span>
                    <span className="text-sm text-muted-foreground">
                      {pages?.filter((page) => page.status === "approved").length} de {pages?.length}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sm font-medium">Link Temporário:</span>
                    <a
                      href={temporaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {temporaryLink}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
