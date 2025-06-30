import { Message } from "@/app/entities/Message";
import { cn } from "@/lib/utils";
import { Button } from "@/view/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  filteredAndPaginatedMessages: {
    messages: Message[];
    totalMessages: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
  currentPage: number;
  handlePageChange: (page: number) => void
}

export function Pagination({ filteredAndPaginatedMessages, currentPage, handlePageChange }: PaginationProps) {
  return (
    <>
      {filteredAndPaginatedMessages.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!filteredAndPaginatedMessages.hasPrevPage}
            className="bg-white/70 backdrop-blur-sm border-slate-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, filteredAndPaginatedMessages.totalPages) }, (_, i) => {
              let pageNum
              if (filteredAndPaginatedMessages.totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= filteredAndPaginatedMessages.totalPages - 2) {
                pageNum = filteredAndPaginatedMessages.totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={
                    cn(
                      'w-9 h-9',
                      currentPage === pageNum
                        ? "bg-primary text-white"
                        : "bg-white/70 backdrop-blur-sm border-slate-200"
                    )
                  }
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!filteredAndPaginatedMessages.hasNextPage}
            className="bg-white/70 backdrop-blur-sm border-slate-200"
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}
