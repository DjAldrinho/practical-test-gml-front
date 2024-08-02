import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientResponse, CreateClientRequest, SearchRequest } from '../models/client.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  private apiUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  getClients(): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(this.apiUrl);
  }

  // Buscar clientes avanzado
  searchClients(search: SearchRequest): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(`${this.apiUrl}/search`, search);
  }

  // Exportar clientes a CSV
  exportClients(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export-csv`, { responseType: 'blob' });
  }

  // Crear un nuevo cliente
  createClient(client: CreateClientRequest): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(this.apiUrl, client);
  }
}
