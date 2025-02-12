import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certification } from '../api/certification';
import { map, Observable } from 'rxjs';

@Injectable()
export class CertificationService {
    private apiUrl = 'http://127.0.0.1:8000/api/certifications'; // Replace with your API URL

    constructor(private http: HttpClient) { }

    getCertifications(): Observable<Certification[]> {
        console.log("Fetching certifications");
        return this.http.get<Certification[]>(this.apiUrl);
    }

    getempCertification(employee_id:number): Observable<Certification[]> {
        console.log("Fetching certification");
        return this.http.get<Certification[]>(`http://127.0.0.1:8000/api/certification/${employee_id}`);
    }

    addCertification(certification: Certification): Observable<Certification> {
        console.log("Adding certification");
        return this.http.post<Certification>(this.apiUrl, certification);
    }

    updateCertification(certification: Certification): Observable<Certification> {
        console.log("Updating certification");
        const url = `${this.apiUrl}/${certification.id}`; // Assuming the API endpoint for updating a certification requires the certification ID in the URL
        return this.http.put<Certification>(url, certification);
    }

    deleteCertification(certificationId: number): Observable<any> {
        const url = `${this.apiUrl}/${certificationId}`; // Assuming the API endpoint for deleting a certification requires the certification ID in the URL
        return this.http.delete<any>(url);
    }

    affectCertification(certification: Certification): Observable<Certification> {
        console.log("Affecting certification");
        const url = `${this.apiUrl}/${certification.id}`; // Assuming the API endpoint for affecting a certification requires the certification ID in the URL
        return this.http.put<Certification>(url, certification);
    }

   
}
