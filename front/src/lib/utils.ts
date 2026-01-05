import { Comments } from "@/app/entities/Comments";
import { clsx, type ClassValue } from "clsx";
import { differenceInDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages = 1
) {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= (currentPage - surroundingPages);
    const isWithinUpperBound = i <= (currentPage + surroundingPages);
    const isEllipsisPosition = (
      i === currentPage - surroundingPages - 1 ||
      i === currentPage + surroundingPages + 1
    );

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push('...');
      continue;
    }

    if ((isFirstPage || isLastPage) || (isWithinLowerBound && isWithinUpperBound)) {
      pages.push(i);
    }
  }

  return pages;
}

export function formatedDate(date: string) {
  const getDate = date.split("-")
  const day = getDate[2].split("T")
  const dateFormated = getDate[0] + '-' + getDate[1] + '-' + day[0];

  return dateFormated;
}

export function getImageCommentAdmin(comments: Comments[], userId: string, level: string) {
  if (level === 'CLIENTE') {
    const commentFiltered = comments?.filter(c => c.user.id !== userId)

    if (commentFiltered && commentFiltered?.length > 0) {
      if (commentFiltered[0].files) {
        return commentFiltered[0]?.files[0]?.url;
      }
    }
  }

  if (level !== 'CLIENTE') {
    const commentFiltered = comments?.filter(c => c.user.level === 'ADMIN')

    if (commentFiltered && commentFiltered?.length > 0) {
      if (commentFiltered[0].files) {
        return commentFiltered[0]?.files[0]?.url;
      }
    }
  }
}

export function isImageUrl(url: string) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

  const urlLower = url.toLowerCase();
  for (let i = 0; i < imageExtensions.length; i++) {
    if (urlLower.endsWith(imageExtensions[i])) {
      return true; // É uma imagem
    }
  }
  return false; // Não é uma imagem
}

export function formatedPrice(price: string) {
  return Number(`${price.slice(0, -2)}.${price.slice(-2)}`);
}

// export function isValidCPF(cpf: string) {
//   // Validar se é String
//   if (typeof cpf !== 'string') return false

//   // Tirar formatação
//   cpf = cpf.replace(/[^\d]+/g, '')

//   // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
//   if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

//   // String para Array
//   cpf = cpf.split('').map(el => +el);

//   const validator = cpf
//     // Pegar os últimos 2 digitos de validação
//     .filter((digit, index, array) => index >= array.length - 2 && digit)
//     // Transformar digitos em números
//     .map(el => +el)

//   const toValidate = (pop: number) => cpf
//     // Pegar Array de items para validar
//     .filter((digit, index, array) => index < array.length - pop && digit)
//     // Transformar digitos em números
//     .map(el => +el)

//   const rest = (count: number, pop: number) => (toValidate(pop)
//     // Calcular Soma dos digitos e multiplicar por 10
//     .reduce((soma, el, i) => soma + el * (count - i), 0) * 10)
//     // Pegar o resto por 11
//     % 11
//     // transformar de 10 para 0
//     % 10

//   return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
// }

export function isValidCPF(cpf: string): boolean {
  // Validar se é String
  if (typeof cpf !== 'string') return false;

  // Tirar formatação
  cpf = cpf.replace(/[^\d]+/g, '');

  // Validar se tem tamanho 11 ou se é uma sequência de dígitos repetidos
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  // String para Array
  const cpfArray = cpf.split('').map(el => +el);

  const validator = cpfArray
    // Pegar os últimos 2 dígitos de validação
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    // Transformar dígitos em números
    .map(el => +el);

  const toValidate = (pop: number) =>
    cpfArray
      // Pegar Array de items para validar
      .filter((_, index) => index < cpfArray.length - pop)
      // Transformar dígitos em números
      .map(el => +el);

  const rest = (count: number, pop: number) =>
    (toValidate(pop)
      // Calcular Soma dos dígitos e multiplicar por 10
      .reduce((soma, el, i) => soma + el * (count - i), 0) * 10)
    // Pegar o resto por 11
    % 11
    // transformar de 10 para 0
    % 10;

  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

export function converterPrice(price: string | number) {
  const priceFormated = new Intl.NumberFormat('pt-br', {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(Number(price))

  return priceFormated;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getCardBrand(cardNumber: string): string | null {
  const cardPatterns = {
    mastercard: /^(5[1-5][0-9]{0,}|2[2-7][0-9]{0,})$/, // Inicia com 51-55 ou 22-27
    amex: /^3[47][0-9]{0,}$/,           // Inicia com 34 ou 37
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{0,}$/, // Inicia com 300-305, 36 ou 38
    discover: /^6(?:011|5[0-9]{2})[0-9]{0,}$/, // Inicia com 6011 ou 65
    jcb: /^(?:2131|1800|35[0-9]{0,})$/, // Inicia com 2131, 1800 ou 35
    hipercard: /^(606282|637095|637568|637599|637609|637612)[0-9]{0,}$/, // Inicia com prefixos do Hipercard
    elo: /^(4011(78|79)|431274|438935|451416|457393|457631|457632|504175|5067|509[0-9]{0,}|627780|636297|636368|650[0-9]{0,}|6516|6550)[0-9]{0,}$/, // Inicia com prefixos do Elo
    visa: /^4[0-9]{0,}$/, // Inicia com 4
  };

  for (const brand in cardPatterns) {
    if (cardPatterns[brand as keyof typeof cardPatterns].test(cardNumber)) {
      return brand;
    }
  }
  return null;
}

export function calculateDelay(expirationDate: Date) {
  const today = new Date()
  const delay = differenceInDays(today, expirationDate)
  return delay > 0 ? delay : 0
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k: number = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${formattedValue} ${sizes[i]}`;
}

export function getCardColorClass(status: string | undefined) {
  switch (status) {
    case "approved":
      return "border-green-500 bg-green-50"
    case "approving":
      return "border-blue-500 bg-blue-50"
    case "changing":
      return "border-yellow-500 bg-yellow-50"
    default:
      return "border-gray-300"
  }
}

export function getTextBadgeColorClass(status: string | undefined) {
  switch (status) {
    case "approved":
      return "text-green-600"
    case "approving":
      return "text-blue-600"
    case "changing":
      return "text-yellow-600"
    default:
      return "text-gray-600"
  }
}

export function getStatusText(status: string | undefined) {
  switch (status) {
    case "approved":
      return "Aprovado"
    case "approving":
      return "Aguardando Aprovação"
    case "changing":
      return "Ajustes"
    default:
      return "Aguardando"
  }
}

export function getStatusProject(status: string | undefined) {
  switch (status) {
    case "layout":
      return "Definição de layout"
    case "layout-initial":
      return "Layout - Iniciar"
    case "layout-approving":
      return "Layout - Enviado para Aprovação"
    case "layout-approved":
      return "Layout - Aprovado"
    case "development-initial":
      return "Desenvolvimento - Iniciar"
    case "development-home":
      return "Desenvolvimento - Home"
    case "development-internal":
      return "Desenvolvimento - Páginas Internas"
    case "financial-analysis":
      return "Financeiro - Análise"
    case "financial-pending":
      return "Financeiro - Pendente"
    case "financial-ok":
      return "Financeiro - Financeiro OK"
    case "put-on-the-air":
      return "Colocar no ar"
    case "completed":
      return "Concluído"
    default:
      return "Comercial"
  }
}

export function formatPhoneNumber(input: string | undefined) {
  // Remove tudo que não for número
  const digits = input?.replace(/\D/g, '');
  // Adiciona o DDI do Brasil (55)
  return '55' + digits;
}

export function isImageFile(filename: string | null | undefined) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  if (!filename) return false;
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? imageExtensions.includes(extension) : false;
}

export function truncateText(text: string, maxLength = 200) {
  if (text?.length <= maxLength) return text
  return text?.substring(0, maxLength) + "..."
}

export function removeTextNameFile(filename: string, textToRemove: string) {
  return filename.replace(textToRemove, '');
}
