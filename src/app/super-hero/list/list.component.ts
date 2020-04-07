import { Component, OnInit } from '@angular/core';
import { ListSuperHero, ListResult } from './model/list-super-hero';
import { ListService } from './list.service';
import { Router } from '@angular/router';

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

  constructor(
    private listService: ListService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentPage = 0;
    this.dataSuperHero();
  }

  public dataSuperHero(): void {
    this.loader = true;
    this.listService.superHeroList(this.currentPage).subscribe((listResult: ListResult) => {
      this.listSuperHero = listResult.result;
      this.totalPages = listResult.totalPages;
      this.loader = false;
    }, () => {
      this.loader = false;
    });
  }

  public edit(id: number) {
    this.router.navigate([`edit/${id}`]);
  }
}
