import { WhereFilterOp } from '@firebase/firestore-types';
import { OrderByDirection } from '@firebase/firestore-types'

export interface FiltroFirestore {
    orderBy?: {
        campo: string, 
        direcao: OrderByDirection
    }[],
    where?: FiltroWhere[],
    limit?: number
}

export interface FiltroWhere { 
    chave: string
    operador: WhereFilterOp
    valor: string | Date
}
