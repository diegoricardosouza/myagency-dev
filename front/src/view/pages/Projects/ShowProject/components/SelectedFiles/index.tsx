import { formatBytes } from "@/lib/utils";
import { Button } from "@/view/components/ui/button";
import { Paperclip, X } from "lucide-react";
import { ProjectFile } from "../../useShowProjectController";

interface SelectedFilesProps {
  removeSelectedFile?: (index: number) => void;
  selectedFiles: ProjectFile[]
}

export function SelectedFiles({ removeSelectedFile, selectedFiles }: SelectedFilesProps) {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Arquivos selecionados ({selectedFiles.length})</h4>
      <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scroll-selected-files">
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
            <div className="flex items-center">
              <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px] lg:max-w-[100%]">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size && formatBytes(Number(file?.size), 0)}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                removeSelectedFile?.(index)
              }}
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
