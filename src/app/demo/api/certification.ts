export interface Certification {
    id: number;
    name: string;
    issued_date: Date;         // Represents date in the database
    expiry_date: Date;        // Represents date in the database
    employee_id: number;
    description:string;
    status:string
}
