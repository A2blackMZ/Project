import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilizersService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // Créer un nouvel utilisateur
  storeUtilizer(utilizerData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/utilizers`, utilizerData);
  }

  // Afficher un utilisateur spécifique
  getUtilizer(utilizerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/utilizers/${utilizerId}`);
  }

  // Mettre à jour un utilisateur
  updateUtilizer(utilizerId: number, utilizerData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/utilizers/${utilizerId}`, utilizerData);
  }

  // Bloquer un utilisateur
  blockUtilizer(utilizerId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/utilizers/${utilizerId}/block`, {});
  }

  // Débloquer un utilisateur
  unblockUtilizer(utilizerId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/utilizers/${utilizerId}/unblock`, {});
  }

  // Supprimer un utilisateur
  destroyUtilizer(utilizerId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/utilizers/${utilizerId}`);
  }
}
