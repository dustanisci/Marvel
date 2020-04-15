import { Component, OnInit } from '@angular/core';
import { ListSuperHero, ListResult } from './model/list-super-hero';
import { ListService } from './list.service';
import { Router } from '@angular/router';
import { Filter } from './model/list-response';
import { switchMap, catchError } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from '../component/modal/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public listSuperHero: ListSuperHero[] = [];
  public loader: boolean;
  public totalPages: number;
  public currentPage: number;
  public search: string;
  public pagination: number[] = [];
  public totalElements: number;
  public filter: Filter = Filter.NONE;

  constructor(
    private listService: ListService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentPage = 0;
    this.loader = true;

    this.dataSuperHero().subscribe(() => {
      this.loader = false;
    });
  }

  public dataSuperHero(): Observable<Subscription> {
    return of(this.listService.listSuperHero(this.currentPage - 1, this.search, this.filter).subscribe((listResult: ListResult) => {
      this.listSuperHero = listResult.result;
      this.totalPages = listResult.totalPages;
      this.totalElements = listResult.totalElements;
    }));
  }

  public deleteSuperHero(id: number, name: string): void {
    const modalConfirmRef = this.modalService.open(ModalConfirmComponent, { size: 'md', centered: true });
    modalConfirmRef.componentInstance.msg = `Tem certeza que deseja excluir ${name}?`;

    modalConfirmRef.componentInstance.confirm
      .pipe(switchMap(() => {
        this.loader = true;
        return this.listService.deleteSuperHero([id])
      }))
      .pipe(switchMap(() => this.dataSuperHero()))
      .subscribe(() => {
        this.loader = false;
      });
  }

  public setSearch(search: string): void {
    this.currentPage = 0;
    this.search = search;
    this.dataSuperHero();
  }

  public routeCreateEdit(id: number | string = null): void {
    id ? this.router.navigate([`edit/${id}`]) : this.router.navigate([`create`]);
  }

  public pageChanged(currentPage: number): void {
    this.currentPage = currentPage;
    this.dataSuperHero();
  }
}
