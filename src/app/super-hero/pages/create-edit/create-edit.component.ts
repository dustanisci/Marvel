import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateEditService } from './create-edit.service';
import { SuperHero } from './model/super-hero';
import { switchMap } from 'rxjs/operators';
import { forkJoin, of, Observable, Subscription } from 'rxjs';
import { GalleryError } from './model/gallery-error';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../../components/modal/modal-error/modal-error.component';
import { ModalSaveComponent } from '../../components/modal/modal-save/modal-save.component';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

  public superHero: SuperHero = {} as SuperHero;
  public loader: boolean;
  public enabledFields: boolean;
  public previewGalleryDelete: number[] = [];
  public statusPreviewGalleryDelete: boolean[] = [];
  public images: FileList;
  public formData = new FormData();

  @ViewChild('inputFile', { read: ElementRef }) inputFile: ElementRef;

  constructor(
    private createEditService: CreateEditService,
    private router: Router,
    public route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.loader = true;
      this.dataSuperHero(Number(this.route.snapshot.paramMap.get('id'))).subscribe(() => {
        this.loader = false;
      });

    } else {
      this.enabledFields = true;
    }
  }

  public dataSuperHero(idSuperHero: number): Observable<Subscription> {
    this.loader = true;
    return of(this.createEditService.dataSuperHero(idSuperHero)
      .subscribe((result: SuperHero) => {
        this.superHero = result;
        this.enabledFields = false;
      }));
  }

  public routeGoBack(): void {
    this.router.navigate(['']);
  }

  public save(): void {
    this.loader = true;

    let auxObservables = [];
    if (this.previewGalleryDelete.length) {
      auxObservables.push(this.createEditService.deleteGallery(this.previewGalleryDelete));
    }
    auxObservables.push(this.createEditService.createUpdateSuperHero(this.superHero));

    forkJoin(
      auxObservables
    ).pipe(
      switchMap((results: any[]) => {
        results[0] !== null ? this.superHero.id = results[0] : this.superHero.id = results[1];

        // Prepara o tipo de requisição como form-data para mandar a imagem
        if (this.images && Object.values(this.images).length) {
          Object.values(this.images).map((image: File) => {
            this.formData.append('images', image, image.name);
          });

          // Dentro desse mesmo objeto de form-data, foi adicionado superHeroId
          // Será possível o serviço capturar este atributo na requisição de form-data.
          this.formData.append('superHeroId', String(this.superHero.id));

          return this.createEditService.insertGallery(this.formData).pipe(
            switchMap((resp: any) => {
              resp = (resp as GalleryError).errorList;

              if (resp.length) {
                resp = resp.toString().replace(',', ', ');

                const modalErrorRef = this.modalService.open(ModalErrorComponent, { size: 'md', centered: true });
                modalErrorRef.componentInstance.msg = `As imagens devem estar em um formato <b>*.jpg, *.jpeg ou *.png</b>.
                </br>Foram identificado imagens com extensões inválidas:</br></br><b>${resp}.</b>`;
              }

              return of(null);
            })
          );
        }
        return of(null);

      })
    ).pipe(
      switchMap(() => {
        return this.createEditService.dataSuperHero(this.superHero.id);
      })
    ).subscribe((superHero: SuperHero) => {
      this.superHero = superHero;
      this.statusPreviewGalleryDelete = [];
      this.inputFile.nativeElement.value = null;
      this.images = null;
      this.formData = new FormData();
      this.loader = false;

      this.modalService.open(ModalSaveComponent, { size: 'xs', centered: true });
      this.route.snapshot.paramMap.get('id') ? this.enabledFields = false : this.router.navigate([`edit/${superHero.id}`]);
    });
  }

  public previewDeleteGallery(id: number): void {
    this.previewGalleryDelete.push(id);
  }

  public postponedDeleteGallery(id: number): void {
    this.previewGalleryDelete = this.previewGalleryDelete.filter((number: number) => number !== id);
  }

  public simulateInputFile(): void {
    this.inputFile.nativeElement.click();
  }

}
