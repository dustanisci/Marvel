import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json');
  private request: HttpParams = new HttpParams();

  constructor(private http: HttpClient) { }

  private setHeaders(request?): void {
    if (request) {
      this.request = {} as HttpParams;
      Object.keys(request).map(key => {
        this.request.append(key, request[key]);
      });
    }
  }

  public get(url: string, request?): Observable<any> {
    this.setHeaders(request);
    return this.http.get<any>(url, { headers: this.headers, params: this.request });
  }

  public post(url: string, value: any, request?): Observable<any> {
    this.setHeaders(request);
    return this.http.post<any>(url, value, { headers: this.headers, params: this.request });
  }

  public put(url: string, id: any, value: any, request?): Observable<any> {
    this.setHeaders(request);
    return this.http.put(`${url}/${id}`, value, { headers: this.headers, params: this.request });
  }

  public delete(url: string, id: any, request?): Observable<any> {
    this.setHeaders(request);
    return this.http.delete(`${url}/${id}`, { headers: this.headers, params: this.request });
  }

}