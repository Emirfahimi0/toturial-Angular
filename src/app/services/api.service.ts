import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOptions, IProduct } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: IOptions): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(url: string, body: IProduct, options: IOptions): Observable<T> {
    return this.httpClient.post<T>(url, body, options);
  }
  put<T>(url: string, body: IProduct, options: IOptions): Observable<T> {
    return this.httpClient.put<T>(url, body, options);
  }
  delete<T>(url: string, options: IOptions): Observable<T> {
    return this.httpClient.delete<T>(url, options);
  }
}
