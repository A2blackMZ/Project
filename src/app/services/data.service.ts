import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private dataToken = 'dataToken';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  storeToken(token: string): void {
    localStorage.setItem('dataToken', token); // Stocke le token dans le LocalStorage
}

getToken(): string | null {
    return localStorage.getItem(this.dataToken); // Récupère le token depuis le LocalStorage
}

getProjectsByUserId(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/projets/user/${userId}`);
}


logout(): Observable<any> {
  // Envoyez une requête HTTP pour la déconnexion au serveur (par exemple, une demande POST)
  return this.http.post(`${this.apiUrl}/logout`, {});
}

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projets`);
  }

  getProjectById(projectId: number): Observable<any> {
    // Vous pouvez appeler votre API ici en utilisant HttpClient
    return this.http.get<any>(`${this.apiUrl}/projets/${projectId}`);
  }

  getTasksByProjectId(projectId: number): Observable<any[]> {
    // Vous pouvez appeler votre API ici en utilisant HttpClient
    return this.http.get<any[]>(`${this.apiUrl}/projets/${projectId}/taches`);
  }

  getComptesRendusByProjetId(projetId: number): Observable<any[]> {
    const url = `${this.apiUrl}/projets/${projetId}/comptes-rendus`;
    return this.http.get<any[]>(url);
  }

  updateCompteRendu(compteRenduId: number, newData: any): Observable<any> {
    const url = `${this.apiUrl}/comptes-rendus/${compteRenduId}`;
    return this.http.put<any>(url, newData);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projets`, projectData);
  }

  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projets/${projectId}`, projectData);
  }

  updateTache(projectId: number, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/taches/${projectId}`, projectData);
  }

  updateReport(projectId: number, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reports/${projectId}`, projectData);
  }

  deleteTache(tacheId: number): Observable<any> {
    const url = `${this.apiUrl}/taches/${tacheId}`;
    return this.http.delete<any>(url);
  }

  deleteProjet(projetId: number): Observable<any> {
    const url = `${this.apiUrl}/projets/${projetId}`;
    return this.http.delete<any>(url);
  }

  deleteCompteRendu(compteRenduId: number): Observable<any> {
    const url = `${this.apiUrl}/comptes-rendus/${compteRenduId}`;
    return this.http.delete<any>(url);
  }

  getTaches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/taches`);
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reports`);
  }

  createTache(tacheData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/taches`, tacheData);
  }

  createReport(reportData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reports`, reportData);
  }

  getUserInfo() {
    // Effectuez une requête GET vers votre API Laravel pour obtenir les informations de l'utilisateur connecté
    return this.http.get<any>(`${this.apiUrl}/user-info`);
  }

  createSeance(seanceData:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/seances/ajout`, seanceData);
  }

  getLatestCompteRenduByProject(projetId: number) {
  return this.http.get(`${this.apiUrl}/projets/${projetId}/dernier-compte-rendu`);
  }

  getAllSeances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seances`);
  }

  validateSeance(seanceId: number): Observable<any> {
    // Effectuez une demande HTTP PUT pour valider la séance
    return this.http.put(`${this.apiUrl}/seances/${seanceId}/validate`, {});
  }

  getProjetsForSeance(seanceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seances/${seanceId}/projets`);
  }

  generateReport(seanceId: number): Observable<any> {
    // Envoyer une requête HTTP POST pour générer le rapport avec l'ID de la séance
    return this.http.post<any>(`${this.apiUrl}/seances/${seanceId}/generate-report`, {});
  }

  genererRapport(projetId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/comptes-rendus/${projetId}/pdf-data`);
  }

  generatePdf(seanceId: number) {
    return this.http.get(`${this.apiUrl}/generate_pdf/${seanceId}`, { responseType: 'blob' });
  }


  // Supprimer un fichier importer
  destroyFile(fichierId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/files/${fichierId}`);
  }

  // Add these methods to your existing DataService
importerFichier(file: File, projetId: number): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.apiUrl}/projets/${projetId}/fichiers`, formData);
}

recupererFichiers(projetId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/projets/${projetId}/fichiers`);
}

getSeanceReports(seanceId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/ReportsSeance/${seanceId}`);
}

}


