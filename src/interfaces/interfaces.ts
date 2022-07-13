export interface notaDeCredito {
    id: string;
    amount: number;    
    organization_id: string;
    currency: string;
    type: string;
    reference?: string
    dolarAmount?: number
    clpAmount?: number
}