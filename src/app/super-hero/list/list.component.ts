import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListSuperHero, ListResult } from './model/list-super-hero';
import { ListService } from './list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  public listSuperHero: ListSuperHero[] = [];
  public loader: boolean;
  public totalPages: number;
  public currentPage: number;
  public search: string;
  public pagination: number[] = [];
  public totalElements: number;
  public filter: string = "";

  constructor(
    private listService: ListService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentPage = 0;
    this.dataSuperHero();
  }

  public dataSuperHero(): void {
    this.loader = true;
    this.listService.superHeroList(this.currentPage - 1, this.search, this.filter).subscribe((listResult: ListResult) => {
      this.listSuperHero = listResult.result;
      this.totalPages = listResult.totalPages;
      this.totalElements = listResult.totalElements;
      this.loader = false;
    }, () => {
      this.loader = false;
    });
  }

  public setSearch(search: string) {
    this.currentPage = 0;
    this.search = search;
    this.dataSuperHero();
  }

  public routeCreateEdit(id: number | string = null) {
    id ? this.router.navigate([`edit/${id}`]) : this.router.navigate([`create`]);
  }

  public pageChanged(currentPage: number){
    this.currentPage = currentPage;
    this.dataSuperHero();
  }
}
