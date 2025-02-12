import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certification } from 'src/app/demo/api/certification';
@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  private apiUrl = 'http://127.0.0.1:8000/api/certifications';

  constructor(private http: HttpClient) {}

  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.apiUrl);
  }

  getempCertification(employee_id: number): Observable<Certification[]> {
    return this.http.get<Certification[]>(`${this.apiUrl}/${employee_id}`);
  }

  addCertification(certification: Certification): Observable<Certification> {
    return this.http.post<Certification>(this.apiUrl, certification);
  }

  updateCertification(certification: Certification): Observable<Certification> {
    return this.http.put<Certification>(
      `${this.apiUrl}/${certification.id}`,
      certification
    );
  }

  deleteCertification(certificationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${certificationId}`);
  }
}
