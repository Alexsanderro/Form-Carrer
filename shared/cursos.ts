// Mapeamento de cursos de TI e seus respectivos períodos
export const CURSOS_TI: Record<string, { label: string; periodos: number }> = {
  ads: {
    label: "ADS — Análise e Desenvolvimento de Sistemas",
    periodos: 6,
  },
  engenharia_software: {
    label: "Engenharia de Software",
    periodos: 8,
  },
  sistemas_informacao: {
    label: "Sistemas de Informação",
    periodos: 8,
  },
  ciencia_computacao: {
    label: "Ciência da Computação",
    periodos: 8,
  },
  redes: {
    label: "Redes de Computadores",
    periodos: 6,
  },
  seguranca_informacao: {
    label: "Segurança da Informação",
    periodos: 8,
  },
  banco_dados: {
    label: "Banco de Dados",
    periodos: 6,
  },
  gestao_ti: {
    label: "Gestão de TI",
    periodos: 8,
  },
  jogos_digitais: {
    label: "Jogos Digitais",
    periodos: 6,
  },
  outro: {
    label: "Outro curso de TI",
    periodos: 10,
  },
};

export const CURSOS_LIST = Object.entries(CURSOS_TI).map(([id, info]) => ({
  id,
  label: info.label,
  periodos: info.periodos,
}));
