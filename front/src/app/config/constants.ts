export interface LevelProps {
  value: string;
  label: string;
}

export const LEVELS = [
  {
    value: "ADMIN",
    label: "Admin"
  },
  {
    value: "EDITOR",
    label: "Editor"
  },
  {
    value: "CLIENTE",
    label: "Cliente"
  }
];

export const FORMATS_DIGITAL_MIDIA = [
  {
    value: "Feed",
    label: "Feed"
  },
  {
    value: "Storie",
    label: "Storie"
  },
  {
    value: "Telão",
    label: "Telão"
  },
  {
    value: "Outros",
    label: "Outros"
  }
];

export const FORMATS_PRINTED = [
  {
    value: "A3 (29,7x42cm)",
    label: "A3 (29,7x42cm)"
  },
  {
    value: "A4 (21x29,7cm)",
    label: "A4 (21x29,7cm)"
  },
  {
    value: "Flyer A5 (15x21cm)",
    label: "Flyer A5 (15x21cm)"
  },
  {
    value: "Cartão de Visita",
    label: "Cartão de Visita"
  },
  {
    value: "Outros",
    label: "Outros"
  }
];

export const FORMATS_PRESENTATION = [
  {
    value: "Impresso",
    label: "Impresso"
  },
  {
    value: "Digital",
    label: "Digital"
  }
];

export const MAX_FILE_SIZE = 1024 * 1024 * 3;

export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif"
];

export const STATUS_PROJECT = [
  {
    value: "comercial",
    label: "Comercial"
  },
  {
    value: "layout-initial",
    label: "Layout - Iniciar"
  },
  {
    value: "layout-approving",
    label: "Layout - Enviado para Aprovação"
  },
  {
    value: "layout-approved",
    label: "Layout - Aprovado"
  },
  {
    value: "development-initial",
    label: "Desenvolvimento - Iniciar"
  },
  {
    value: "development-home",
    label: "Desenvolvimento - Home"
  },
  {
    value: "development-internal",
    label: "Desenvolvimento - Páginas Internas"
  },
  {
    value: "financial-analysis",
    label: "Financeiro - Análise"
  },
  {
    value: "financial-pending",
    label: "Financeiro - Pendente"
  },
  {
    value: "financial-ok",
    label: "Financeiro - Financeiro OK"
  },
  {
    value: "completed",
    label: "Concluído"
  },
]

export const STATES = [
  {
    value: "AC",
    label: "Acre"
  },
  {
    value: "AL",
    label: "Alagoas"
  },
  {
    value: "AP",
    label: "Amapá"
  },
  {
    value: "AM",
    label: "Amazonas"
  },
  {
    value: "BA",
    label: "Bahia"
  },
  {
    value: "CE",
    label: "Ceará"
  },
  {
    value: "ES",
    label: "Espírito Santo"
  },
  {
    value: "GO",
    label: "Goiás"
  },
  {
    value: "MA",
    label: "Maranhão"
  },
  {
    value: "MT",
    label: "Mato Grosso"
  },
  {
    value: "MS",
    label: "Mato Grosso do Sul"
  },
  {
    value: "MG",
    label: "Minas Gerais"
  },
  {
    value: "PA",
    label: "Pará"
  },
  {
    value: "PB",
    label: "Paraíba"
  },
  {
    value: "PR",
    label: "Paraná"
  },
  {
    value: "PE",
    label: "Pernambuco"
  },
  {
    value: "PI",
    label: "Piauí"
  },
  {
    value: "RJ",
    label: "Rio de Janeiro"
  },
  {
    value: "RN",
    label: "Rio Grande do Norte"
  },
  {
    value: "RS",
    label: "Rio Grande do Sul"
  },
  {
    value: "RO",
    label: "Rondônia"
  },
  {
    value: "RR",
    label: "Roraima"
  },
  {
    value: "SC",
    label: "Santa Catarina"
  },
  {
    value: "SP",
    label: "São Paulo"
  },
  {
    value: "SE",
    label: "Sergipe"
  },
  {
    value: "TO",
    label: "Tocantins"
  },
];
