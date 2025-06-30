import { messageService } from "@/app/services/messageService";
import { MessageParams } from "@/app/services/messageService/create";
import { UpdateMessageParams } from "@/app/services/messageService/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório'),
  content: z.string().nullable().optional(),
});

type FormData = z.infer<typeof schema>

export function useMessageController() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMessage, setEditingMessage] = useState(false)
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set())

  // Estados para paginação e busca
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const idMessage = useRef<string>('');

  const {
    register,
    handleSubmit: hookFormSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['messages'],
    staleTime: 0,
    queryFn: async () => {
      const response = await messageService.getAll();

      return response;
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: MessageParams) => {
      return messageService.create(data);
    }
  });

  const {
    isPending: isLoadingDelete,
    mutateAsync: removeMessage
  } = useMutation({
    mutationFn: async (id: string) => {
      return messageService.remove(id);
    }
  });

  const { data: messageData, isLoading: isLoadingEdit, refetch } = useQuery({
    queryKey: ['editMessage', idMessage.current],
    enabled: !!idMessage.current,
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await messageService.getById(idMessage.current);
        return response;
      } catch (error) {
        toast.error('Item não encontrado');
        navigate("/configuracoes/mensagens");
      }
    }
  });

  const { isPending: isPendingUpdate , mutateAsync: mutateAsyncUpdate } = useMutation({
      mutationFn: async (data: UpdateMessageParams) => {
      return messageService.update(data);
      }
    });

  useEffect(() => {
    if (idMessage.current && messageData) {
      setValue('name', messageData.data.name)
      setValue('content', messageData.data.content || "")
    }
    if (isDialogOpen && editingMessage) {
      refetch();
    }
  }, [editingMessage, isDialogOpen, messageData, refetch, setValue])


  const openDialog = () => {
    idMessage.current = '';
    reset({ name: '', content: '' });
    setEditingMessage(false)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    reset()
    setValue('name', '')
    setValue('content', '')
    setEditingMessage(false)
    setIsDialogOpen(false)
  }

  const toggleMessageExpansion = (messageId: string) => {
    setExpandedMessages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Resetar para primeira página ao buscar
  }

  // Filtrar e paginar mensagens
  const filteredAndPaginatedMessages = useMemo(() => {
    // Filtrar por termo de busca
    const filtered = data?.data.filter(
      (message) =>
        message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Calcular paginação
    const safeFiltered = filtered ?? []
    const totalPages = Math.ceil(safeFiltered.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedMessages = safeFiltered.slice(startIndex, endIndex)

    return {
      messages: paginatedMessages,
      totalMessages: safeFiltered.length,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    }
  }, [data?.data, searchTerm, currentPage, itemsPerPage])

  async function handleDeleteItem(messageId: string) {
    try {
      await removeMessage(messageId);

      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('A Mensagem foi deletada com sucesso!');
    } catch {
      toast.error('Erro ao deletar o checklist!');
    }
  }

  function handleEditMessage(messageId: string) {
    idMessage.current = messageId;
    setEditingMessage(true)
    setIsDialogOpen(true)
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (editingMessage) {
        console.log({data});
        await mutateAsyncUpdate({
          ...data,
          id: idMessage.current,
        });

        queryClient.invalidateQueries({ queryKey: ['messages'] });
        toast.success('Mensagem atualizada com sucesso!');
        resetForm();
      }

      if (!editingMessage) {
        await mutateAsync({
          name: data.name,
          content: data.content || "",
        });

        queryClient.invalidateQueries({ queryKey: ['messages'] });
        toast.success('Mensagem cadastrada com sucesso!');
        resetForm();
      }
    } catch (error) {
      toast.error('Erro ao cadastrar a mensagem');
    }
  });

  return {
    messages: data?.data || [],
    isFetching,
    isLoading,
    isDialogOpen,
    errors,
    editingMessage,
    expandedMessages,
    itemsPerPage,
    searchTerm,
    currentPage,
    filteredAndPaginatedMessages,
    control,
    isPending,
    isLoadingDelete,
    isLoadingEdit,
    isPendingUpdate,
    setIsDialogOpen,
    handleSubmit,
    resetForm,
    register,
    toggleMessageExpansion,
    setCurrentPage,
    setItemsPerPage,
    handleSearchChange,
    handlePageChange,
    openDialog,
    handleDeleteItem,
    handleEditMessage
  }
}
