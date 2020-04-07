import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api-service/api-service.service';
import { apiList } from 'src/environments/api-list';
import { ListReponse, ListSuperHeroResponse } from './model/list-response';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private apiService: ApiService) { }

  public superHeroList(page:number = 0): Observable<object> {
    return this.apiService.get(`${apiList.superHeroList}?page=${page}&size=1`)
      .pipe(map((resp: ListReponse) => {
        return {
          result: resp.content.map((superHeroResponse: ListSuperHeroResponse) => ({
            id: superHeroResponse.id,
            name: superHeroResponse.name,
            codename: superHeroResponse.codename,
            urlCover: Object.keys(superHeroResponse.galleries).length ? Object.values(superHeroResponse.galleries)[0].url : null,
            earth: superHeroResponse.earth
          })),
          totalPages: resp.totalPages,
          totalElements: resp.totalElements,
          numberOfElements: resp.numberOfElements
        }
      }));
  }

}