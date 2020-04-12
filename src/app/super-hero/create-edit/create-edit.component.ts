import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateEditService } from './create-edit.service';
import { SuperHero, GallerySuperHero } from './model/super-hero';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

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
  public gallery: GallerySuperHero = {} as GallerySuperHero;

  constructor(
    private createEditService: CreateEditService,
    private router: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id') ? this.dataSuperHero() : this.enabledFields = true;
  }

  public dataSuperHero(): void {
    this.loader = true;
    this.createEditService.dataSuperHero(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe((result: SuperHero) => {
        this.superHero = result;
        this.loader = false;
      }), () => {
        this.loader = false;
      };
  }

  public routeGoBack(): void {
    this.router.navigate(['']);
  }

  public save(): void {
    this.loader = true;

    forkJoin([
      this.createEditService.deleteGallery(this.previewGalleryDelete),
      this.createEditService.createUpdateSuperHero(this.superHero),
    ]).pipe(
      switchMap(
        () => this.createEditService.dataSuperHero(Number(this.route.snapshot.paramMap.get('id')))
      )
    ).pipe(
      switchMap(
        (superHero: SuperHero) => this.createEditService.insertGallery(this.gallery)
      )
    ).subscribe((superHero: SuperHero) => {
      this.superHero = superHero;
      this.loader = false;
      this.enabledFields = false;
    }, () => {
      this.loader = false;
    });
  }

  public setGallery(imageUploaded: any) {
    this.gallery.idSuperHero = this.superHero.id;
    this.gallery.images = imageUploaded.target.files[0];
  }

  public previewDeleteGallery(id: number): void {
    this.previewGalleryDelete.push(id);
  }

  public postponedDeleteGallery(id: number): void {
    this.previewGalleryDelete = this.previewGalleryDelete.filter((number: number) => number !== id);
  }

}
