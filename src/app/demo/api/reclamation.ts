export interface Reclamation {
    id?: number;
    employee_id: number;
    subject: string;
    content: string;
    photo: any; 
    created_at?: string | null;
    updated_at?: string | null;
}
