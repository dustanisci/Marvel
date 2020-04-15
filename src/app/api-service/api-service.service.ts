import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public get(url: string, httpHeaders?): Observable<any> {
    return this.http.get<any>(url, { headers: httpHeaders });
  }

  public post(url: string, value: any, httpHeaders?): Observable<any> {
    return this.http.post<any>(url, value, { headers: httpHeaders });
  }

  public put(url: string, value: any, httpHeaders?): Observable<any> {
    return this.http.put<any>(`${url}`, value, { headers: httpHeaders });
  }

  public delete(url: string, ids: any, httpHeaders?): Observable<any> {
    return this.http.delete<any>(`${url}/${ids}`, { headers: httpHeaders });
  }

}