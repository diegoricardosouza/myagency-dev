import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProjectFile } from "../../useShowProjectController";
import { SelectedFiles } from "../SelectedFiles";

interface UploadFileProps {
  onChange: (files: File[]) => void;
  sendComment?: boolean;
}

export function UploadFiles({ onChange, sendComment }: UploadFileProps) {
  const [selectedFiles, setSelectedFiles] = useState<ProjectFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    onChange(selectedFiles)
    if (sendComment) {
      setSelectedFiles([]);
    }
  }, [onChange, selectedFiles, sendComment])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles((prev) => [...prev, ...filesArray])
    }
  }

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <div
        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={openFileSelector}
      >
        <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileSelect} />
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm font-medium">Clique para fazer upload ou arraste os arquivos aqui</p>
        <p className="text-xs text-muted-foreground mt-1">
          Suporta imagens, PDFs, documentos e outros arquivos
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <SelectedFiles
          removeSelectedFile={removeSelectedFile}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
      )}
    </>
  )
}
