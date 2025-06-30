import { Card, CardContent } from "@/view/components/ui/card";
import { MessageSquare } from "lucide-react";

interface ResultSearchProps {
  searchTerm: string;
}

export function ResultSearch({ searchTerm }: ResultSearchProps) {
  return (
    <Card className="text-center py-12 bg-white/50 backdrop-blur-sm border-slate-200">
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-slate-100 rounded-full">
            <MessageSquare className="h-12 w-12 text-slate-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {searchTerm ? "Nenhuma mensagem encontrada" : "Nenhuma mensagem cadastrada"}
            </h3>
            <p className="text-slate-500">
              {searchTerm
                ? "Tente buscar por outros termos ou limpe o filtro"
                : "Clique em 'Nova Mensagem' para começar"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
