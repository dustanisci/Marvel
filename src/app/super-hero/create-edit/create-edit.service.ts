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
            const modalErrorRef = this.modalService.open(ModalErrorComponent, { size: 'md', centered: true });

            if (error.status === 404) {
              modalErrorRef.componentInstance.msg = 'Ops, o registro não foi encontrado.';
              modalErrorRef.componentInstance.action = () => {
                this.router.navigate(['']);
              }
              return of(modalErrorRef);
            }
            modalErrorRef.componentInstance.msg = 'Ops, ocorreu um erro ao obter o registro, tente novamente.';
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
              const modalErrorRef = this.modalService.open(ModalErrorComponent, { size: 'md', centered: true });

              modalErrorRef.componentInstance.msg = 'Ops, ocorreu um erro ao criar um registro, tente novamente.';
              return of(modalErrorRef);
            }
          ));
    }

    return this.apiService.put(endpoints.superHero, superhero)
      .pipe(
        catchError(
          (error: Response) => {
            const modalErrorRef = this.modalService.open(ModalErrorComponent, { size: 'md', centered: true });

            if (error.status === 404) {
              modalErrorRef.componentInstance.msg = 'Ops, o registro não foi encontrado.';
              modalErrorRef.componentInstance.action = () => {
                this.router.navigate(['']);
              }
              return of(modalErrorRef);
            }
            modalErrorRef.componentInstance.msg = 'Ops, ocorreu um erro ao atualizar um registro, tente novamente.';
            return of(modalErrorRef);
          }
        ));
  }

  public insertGallery(images: any): Observable<void> {
    return this.apiService.post(endpoints.gallery, images, new HttpHeaders({ 'Accepted-Encoding': 'application/json' }))
      .pipe(
        catchError(
          () => {
            const modalErrorRef = this.modalService.open(ModalErrorComponent, { size: 'md', centered: true });

            modalErrorRef.componentInstance.msg = 'Ops, ocorreu um erro ao inserir alguma imagem no registro, tente novamente.';
            return of(modalErrorRef);
          }
        ));
  }

  public deleteGallery(ids: number[]): Observable<void> {
    return this.apiService.delete(endpoints.gallery, [ids])
      .pipe(
        catchError(
          (error: Response) => {
            const modalErrorRef = this.modalService.open(ModalErrorComponent, { size: 'md', centered: true });

            if (error.status === 404) {
              modalErrorRef.componentInstance.msg = 'Ops, a imagem no registro não foi encontrada para ser excluída.';
              modalErrorRef.componentInstance.action = () => {
                this.router.navigate(['']);
              }
              return of(modalErrorRef);
            }
            modalErrorRef.componentInstance.msg = 'Ops, ocorreu um erro ao excluir alguma imagem do registro, tente novamente.';
            return of(modalErrorRef);
          }
        ));
  }

}
