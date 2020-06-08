import { Peca } from './peca';

export interface Cabecalho {
    cliente: string
    clienteId: string
    data?: any
  }
  
  export interface Detalhes {
    pecas: Peca[]
    observacoes: string[]
  }

  export interface MetaDados {
    dataRegistro: Date
    tipoRegistro: string
    usuario: string
    numeroRegistro?: number
  }

export interface Registro {
    id?: string
    cabecalho: Cabecalho
    detalhes: Detalhes
    metaDados: MetaDados
  }