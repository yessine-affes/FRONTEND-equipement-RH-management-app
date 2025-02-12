import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../api/user';
import { UpdatedUser } from '../../api/updateuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/admins';
  private isLoggedInStatus: boolean = false;
  private logoutUrl = 'http://127.0.0.1:8000/api/admin/logout';
  private uploadPhotoUrl = 'http://127.0.0.1:8000/upload-photo';

  constructor(private router: Router, private http: HttpClient) {}

  getProfile(): Observable<User> {
    const token = this.getResponse().token;
    console.log(token);
    return this.http.get<User>('http://127.0.0.1:8000/api/me', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    });
}


  updateProfile(profileData: UpdatedUser): Observable<any> {
    const id = sessionStorage.getItem('admin_id');
    return this.http.put<UpdatedUser>(`http://127.0.0.1:8000/api/admins/${id}`, profileData);
  }

  
  login(adminId:number) {
    sessionStorage.setItem('admin_id', adminId.toString());
    this.isLoggedInStatus = true;
    console.log(sessionStorage.getItem('admin_id'));
    this.router.navigate(['/dashboard']);
  }

  veriflogin(email: string, password: string): Observable<any> {
    return this.http.post<any>("http://127.0.0.1:8000/api/admin/login", { email, password }).pipe(
        tap(response => {
            console.log('Login response received:', response);
            this.setResponse(response);
        })
    );
}




setResponse(response: any): void {
  console.log('Saving response to local storage:', response);
  localStorage.setItem('response', JSON.stringify(response));
}




getResponse(): any {
  const response = localStorage.getItem('response');
  if (!response) {
      console.error('No response found in localStorage');
      return null;
  }
  try {
      const parsedResponse = JSON.parse(response);
      console.log('Retrieved response from local storage:', parsedResponse);
      return parsedResponse;
  } catch (e) {
      console.error('Error parsing response from localStorage:', e);
      return null;
  }
}


  logout(): void {
    const token = this.getResponse().token;

    if (token) {
      this.performLogout(token).subscribe(
        response => {
          console.log('Logout successful', response);
          this.isLoggedInStatus = false;
          localStorage.removeItem('response'); // Clear localStorage on logout
          this.router.navigate(['/']);
        },
        error => {
          console.error('Logout failed', error);
        }
      );
    }
  }

  private performLogout(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.logoutUrl, {}, { headers: headers });
  }

  getCurrentUserId(): number | null {
    const response = this.getResponse();
    if (response) {
        console.log('Admin ID retrieved:', response.admin?.id);
        return response.admin?.id ?? null;
    } else {
        console.error('No admin data found');
        return null;
    }
}




  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  uploadPhoto(formData: FormData): Observable<any> {
    return this.http.post<any>(this.uploadPhotoUrl, formData);
  }

  getImageUrl(filename: string): string {
    return `http://127.0.0.1:8000/image/${filename}.jpg`;
  }
}
