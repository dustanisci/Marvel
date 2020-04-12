import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { ApiService } from 'src/app/api-service/api-service.service';
import { SuperHero, GallerySuperHero } from './model/super-hero';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateEditService {

  constructor(private apiService: ApiService) { }

  public dataSuperHero(id: number): Observable<SuperHero> {
    return this.apiService.get(`${endpoints.superHero}/${id}`);
  }

  public createUpdateSuperHero(superhero: SuperHero): Observable<number | void> {
    if (!superhero.id) {
      return this.apiService.post(endpoints.superHero, superhero);
    }
    return this.apiService.put(endpoints.superHero, superhero);
  }

  public insertGallery(gallery: GallerySuperHero) {
    return this.apiService.post(endpoints.gallery, gallery, new HttpHeaders().append('Content-Type', 'multipart/form-data'));
  }

  public deleteGallery(ids: number[]): Observable<void> {
    return this.apiService.delete(endpoints.gallery, [1]);
  }

}
