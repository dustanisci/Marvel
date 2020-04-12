import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json');

  constructor(private http: HttpClient) { 
  }

  private setHttpHeaders(httpHeaders: HttpHeaders): void {
    if (httpHeaders) {
      Object.keys(httpHeaders).map(key => {
        this.headers.append(key, httpHeaders[key]);
      });
    }
  }

  public get(url: string, httpHeaders?): Observable<any> {
    this.setHttpHeaders(httpHeaders);
    return this.http.get<any>(url, { headers: this.headers });
  }

  public post(url: string, value: any, httpHeaders?): Observable<any> {
    this.setHttpHeaders(httpHeaders);
    console.log(httpHeaders);
    return this.http.post<any>(url, value, { headers: this.headers});
  }

  public put(url: string, value: any, httpHeaders?): Observable<any> {
    this.setHttpHeaders(httpHeaders);
    return this.http.put<any>(`${url}`, value, { headers: this.headers });
  }

  public delete(url: string, ids: any, httpHeaders?): Observable<any> {
    this.setHttpHeaders(httpHeaders);
    return this.http.delete<any>(`${url}/${ids}`, { headers: this.headers });
  }

}