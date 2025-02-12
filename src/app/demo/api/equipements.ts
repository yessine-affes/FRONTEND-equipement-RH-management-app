
export interface Equipements {
    id: number;
    name: string;
    status: Status ;
    taskId: number;
    type: string;
    availability: number;
    photo: string;
    maintenanceSchedule: string;
    created_at?: string;
    updated_at?: string;
}

export enum Status {
    Maintenance = "Maintenance",
    Usable = "Usable",
}




