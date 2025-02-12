export interface Employee {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    admin_id?: number;
    availability?: number;
    photo?: string;
    speciality?: Speciality; // Enum for specialities
    score?: number;
    created_at?: string;
    updated_at?: string;
}

// Enum for Specialities
export enum Speciality {
    Mining = 'Mining',
    Processing = 'Processing',
    Transport = 'Transport',
    QualityControl = 'QualityControl',
    Maintenance = 'Maintenance'
}
