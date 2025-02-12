import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipements } from '../api/equipements';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable()
export class EquipService {
    getEquipMisses() {
      throw new Error('Method not implemented.');
    }
    private apiUrl = 'http://127.0.0.1:8000/api/equipment'; 
    constructor(private http: HttpClient) { }

    /*   getProducts() {
          return this.http.get<any>('assets/demo/data/products.json')
              .toPromise()
              .then(res => res.data as Product[])
              .then(data => data);
      } */

getAvailableEquipment(): Observable<Equipements[]> {
  const url = `${this.apiUrl}?availability=1`;
  return this.http.get<Equipements[]>(url);
}
updateEquipmentAvailability(equipmentId: number, availability: number): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${equipmentId}`, { availability });
}

    getEquipements(): Observable<Equipements[]> {
        return this.http.get<Equipements[]>(this.apiUrl);
    }

    addEquip(product: Equipements): Observable<Equipements> {
        console.log("added");
        return this.http.post<Equipements>(this.apiUrl, product);
        
    }

    updateEquip(product: Equipements): Observable<Equipements> {
        const url = `${this.apiUrl}/${product.id}`; // Assuming the API endpoint for updating a product requires the product ID in the URL
        console.log(product)
        return this.http.put<Equipements>(url, product);
    }

    deleteEquip(productId: number): Observable<any> {
        const url = `${this.apiUrl}/${productId}`; // Assuming the API endpoint for deleting a product requires the product ID in the URL
        return this.http.delete<any>(url);
    }

    /*getEmailEquipById(id: number): Observable<string | undefined> {
        return this.getEquipements().pipe(
          map(equipements => {
            const equipement = equipements.find(t => t.id === id);
            return equipement ? equipement.email : undefined;
          })
        );
      }*/
      
    // send email to the best equip
    /*getEquipementWithHighestScore(): Observable<string | null> {
        return this.getEquipements().pipe(
          map(equipements => {
            if (equipements.length === 0) {
              return null;
            }
    
            const highestScoreEquipement = equipements.reduce((prev, current) => {
              return (prev.score > current.score) ? prev : current;
            });
    
            return highestScoreEquipement.email;
          })
        );
      }*/

    /* ---------------------------------------------------------------------- */
    // from template
    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Equipements[])
            .then(data => data);
    }

    getTotalEquipements(): Observable<number> {
        return this.http.get<Equipements[]>(this.apiUrl).pipe(
            map((equipements: Equipements[]) => equipements.length)
        );
    }

    getEquipementsAddedThisYear(): Observable<number> {
        const currentYear = new Date().getFullYear();
        return this.http.get<Equipements[]>(this.apiUrl).pipe(
            map((equipements: Equipements[]) =>
                equipements.filter(equipement =>
                    new Date(equipement.created_at).getFullYear() === currentYear
                ).length
            )
        );
    }

    /*
    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Equipements[])
            .then(data => data);
    }*/

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Equipements[])
            .then(data => data);
    }

    getEquip(id: number): Observable<Equipements> {
      const url = `${this.apiUrl}/${id}`; // Adjust the endpoint if necessary
      return this.http.get<Equipements>(url);
  }
  
  
  
  
  
}
