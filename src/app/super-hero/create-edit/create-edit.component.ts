import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateEditService } from './create-edit.service';
import { SuperHero } from './model/super-hero';
import { switchMap } from 'rxjs/operators';
import { forkJoin, of, Observable, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from '../component/modal/modal-confirm/modal-confirm.component';

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
    public route: ActivatedRoute) { }

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
      switchMap((results: any) => {
        results[0] !== null ? this.superHero.id = results[0] : this.superHero.id = results[1];

        if (this.images && Object.values(this.images).length) {
          Object.values(this.images).map((image: File) => {
            this.formData.append('images', image, image.name);
          });
          this.formData.append('superHeroId', String(this.superHero.id));
          return this.createEditService.insertGallery(this.formData);
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
      this.formData = new FormData();
      this.loader = false;
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
