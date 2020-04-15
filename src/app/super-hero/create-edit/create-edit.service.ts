import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { ApiService } from 'src/app/api-service/api-service.service';
import { SuperHero } from './model/super-hero';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../component/modal/modal-error/modal-error.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateEditService {


  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private router: Router) {
  }

  public dataSuperHero(id: number): Observable<SuperHero> {
    return this.apiService.get(`${endpoints.superHero}/${id}`)
      .pipe(
        catchError(
          (error: Response) => {
            const modalErrorRef = this.modalService.open(ModalErrorComponent, { size : 'md', centered : true });

            error.status === 404 ?
              modalErrorRef.componentInstance.msg = 'Ops, super herói não encontrado.' :
              modalErrorRef.componentInstance.msg = 'Ops, ocorreu um erro ao obter o super herói, tente novamente.';

              modalErrorRef.componentInstance.action = () => {
                this.router.navigate(['']);
              }

            return of(modalErrorRef);
          }
        ));
  }

  public createUpdateSuperHero(superhero: SuperHero): Observable<number> {
    if (!superhero.id) {
      return this.apiService.post(endpoints.superHero, superhero)
        .pipe(
          catchError(
            () => {
              return of(console.log('Ops, ocorreu um erro ao criar um super-herói!'));
            }
          ));;
    }
    return this.apiService.put(endpoints.superHero, superhero)
      .pipe(
        catchError(
          () => {
            return of(console.log('Ops, ocorreu um erro ao atualizar um super-herói!'));
          }
        ));
  }

  public insertGallery(images: any): Observable<void> {
    return this.apiService.post(endpoints.gallery, images, new HttpHeaders({ 'Accepted-Encoding': 'application/json' }))
      .pipe(
        catchError(
          () => {
            return of(console.log('Ops, ocorreu um erro ao inserir alguma imagem do super-herói!'));
          }
        ));
  }

  public deleteGallery(ids: number[]): Observable<void> {
    return this.apiService.delete(endpoints.gallery, [ids])
      .pipe(
        catchError(
          () => {
            return of(console.log('Ops, ocorreu um erro ao excluir alguma imagem do super-herói!'));
          }
        ));
  }

}
