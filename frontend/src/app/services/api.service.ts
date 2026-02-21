import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}

  get<T>(path: string) { return this.http.get<T>(`${this.baseUrl}${path}`); }
  post<T>(path: string, payload: unknown) { return this.http.post<T>(`${this.baseUrl}${path}`, payload); }
}
