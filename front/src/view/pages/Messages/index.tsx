import { CustomModal } from "@/view/components/CustomModal";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { DialogFooter } from "@/view/components/ui/dialog";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FileText, MessageSquare, Plus, Search } from "lucide-react";
import { Controller } from "react-hook-form";
import { CardMessage } from "./components/CardMessage";
import { Pagination } from "./components/Pagination";
import { ResultSearch } from "./components/ResultSearch";
import { useMessageController } from "./useMessageController";

export default function Messages() {
  const {
    messages,
    isDialogOpen,
    errors,
    editingMessage,
    itemsPerPage,
    searchTerm,
    currentPage,
    filteredAndPaginatedMessages,
    control,
    isPending,
    expandedMessages,
    isLoadingDelete,
    isLoadingEdit,
    isPendingUpdate,
    setIsDialogOpen,
    handleSubmit,
    resetForm,
    register,
    setCurrentPage,
    setItemsPerPage,
    handleSearchChange,
    handlePageChange,
    openDialog,
    toggleMessageExpansion,
    handleDeleteItem,
    handleEditMessage
  } = useMessageController();

  // console.log({editingMessage});


  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800">Mensagens Padrões</h1>
          </div>
          <p className="text-slate-600 text-lg">Gerencie suas mensagens de forma simples e elegante</p>
        </header>

        {/* Controls Section */}
        <div className="mb-8 space-y-4">
          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary text-white shadow-lg"
              onClick={() => openDialog()}
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Mensagem
            </Button>
          </div>


          <CustomModal
            closeModal={() => setIsDialogOpen(false)}
            openModalTech={isDialogOpen}
            title={editingMessage ? 'Editar Mensagem' : 'Nova Mensagem'}
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            description={editingMessage ? 'Edite os dados da mensagem abaixo.' : 'Preencha os dados para criar uma nova mensagem.'}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Título
                  </Label>
                  <Input
                    id="titulo"
                    {...register('name')}
                    error={errors?.name?.message}
                    placeholder="Digite o título da mensagem"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensagem" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Mensagem
                  </Label>
                  <Controller
                    control={control}
                    name="content"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <div onClick={(e) => e.stopPropagation()}>
                        <CKEditor
                          editor={ClassicEditor}
                          data={value}
                          config={{
                            licenseKey: 'GPL',
                            language: 'pt-br'
                          }}
                          onChange={(_event, editor) => {
                            const data = editor.getData();
                            onChange(data);
                          }}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="bg-white text-slate-600 border-slate-300"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary text-white">
                  {editingMessage ? "Salvar Alterações" : "Criar Mensagem"}
                </Button>
              </DialogFooter>
            </form>
          </CustomModal>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 z-10" />
              <Input
                placeholder="Buscar por título ou conteúdo..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-white/70 backdrop-blur-sm border-slate-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Itens por página:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-20 bg-white/70 backdrop-blur-sm border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span>
              Mostrando {filteredAndPaginatedMessages.messages.length} de {filteredAndPaginatedMessages.totalMessages}{" "}
              mensagens
              {searchTerm && ` para "${searchTerm}"`}
            </span>
            <span>
              Página {currentPage} de {filteredAndPaginatedMessages.totalPages || 1}
            </span>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-6 relative">
          {(isPending || isLoadingDelete || isLoadingEdit || isPendingUpdate) && (
            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white/80 z-10">
              <Spinner className="w-6 h-6 fill-primary" />
            </div>
          )}

          {filteredAndPaginatedMessages.messages.length === 0 ? (
            <ResultSearch
              searchTerm={searchTerm}
            />
          ) : (
            filteredAndPaginatedMessages.messages.map((message) => (
              <CardMessage
                key={message.id}
                message={message}
                expandedMessages={expandedMessages}
                toggleMessageExpansion={toggleMessageExpansion}
                handleDeleteItem={handleDeleteItem}
                handleEditMessage={handleEditMessage}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination
          filteredAndPaginatedMessages={filteredAndPaginatedMessages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500">
            Total de mensagens: <span className="font-semibold text-primary">{messages.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
