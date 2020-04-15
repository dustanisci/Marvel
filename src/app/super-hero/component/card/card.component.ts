import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListSuperHero } from '../../list/model/list-super-hero';
import { TypeClick } from './model/card-click';

@Component({
  selector: 'c-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() superHero: ListSuperHero;
  @Output() actionClick: EventEmitter<TypeClick> = new EventEmitter();
  public typeClick = TypeClick;

  constructor() { }

  ngOnInit(): void {
  }

}
