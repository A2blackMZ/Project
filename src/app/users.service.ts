import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }


  //Add members
  storeMember(projectId: number, userId: number, userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/userProject/${projectId}/user/${userId}`, userData);
  }

  //get members
  getMembers(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${projectId}`);
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  // Créer un nouvel utilisateur
  storeUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, userData);
  }

  // Afficher un utilisateur spécifique
  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}`);
  }

  // Mettre à jour un utilisateur
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${userId}`, userData);
  }

  // Bloquer un utilisateur
  blockUser(userId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${userId}/block`, {});
  }

  // Débloquer un utilisateur
  unblockUser(userId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${userId}/unblock`, {});
  }

  // Supprimer un utilisateur
  destroyUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${userId}`);
  }

  getNotifications(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/SeeNotification/${userId}`);
  }

  deleteNotification(notificationId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/notification/${notificationId}/${userId}`);
  }

  getNotificationById(notificationId: number, userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/notification/${notificationId}/${userId}`);
  }


}
