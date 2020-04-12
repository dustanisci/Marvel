import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api-service/api-service.service';
import { endpoints } from 'src/environments/endpoints';
import { ListReponse, ListSuperHeroResponse, Filter } from './model/list-response';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private apiService: ApiService) { }

  public listSuperHero(page: number = 0, search: string = '', filter: Filter): Observable<object> {

    let sort: string;
    if (Number(filter) === Filter.ASC) {
      sort = 'sort=name,codename,ASC';
    } else if (Number(filter) === Filter.DESC) {
      sort = 'sort=name,codename,DESC';
    } else if (Number(filter) === Filter.EARTH) {
      sort = 'sort=earth,ASC';
    } else {
      sort = 'sort=id,DESC';
    }

    return this.apiService.get(`${endpoints.superHero}?page=${page}&size=18&search=${search}&${sort}`)
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

  public deleteSuperHero(ids: number[]): Observable<void> {
    return this.apiService.delete(`${endpoints.superHero}`, ids);
  }

}