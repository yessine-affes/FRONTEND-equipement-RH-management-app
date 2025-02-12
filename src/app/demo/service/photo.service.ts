import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../api/image';
import { Observable } from 'rxjs';

@Injectable()
export class PhotoService {
    private uploadUrl = 'http://127.0.0.1:8000/api/upload-image';
    private getImageUrlBase = 'http://127.0.0.1:8000/api/image/';
    
    constructor(private http: HttpClient) { }

    getImages(): Promise<Image[]> {
        return this.http.get<any>('assets/demo/data/photos.json')
            .toPromise()
            .then(res => res.data as Image[])
            .then(data => data);
    }

    uploadImage(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('photo', file); // Use 'photo' as the key
        return this.http.post(this.uploadUrl, formData);
    }

    getImage(filename: string): Observable<Blob> {
        return this.http.get(`${this.getImageUrlBase}${filename}`, { responseType: 'blob' });
    }

    getImageUrl(filename: string): string {
        return `${this.getImageUrlBase}${filename}`;
    }
}
