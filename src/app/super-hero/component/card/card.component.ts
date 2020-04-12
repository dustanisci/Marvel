import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListSuperHero } from '../../list/model/list-super-hero';
import { CardClick, TypeClick } from './model/card-click';

@Component({
  selector: 'c-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() superHero: ListSuperHero;
  @Output() actionClick: EventEmitter<CardClick> = new EventEmitter();
  public typeClick = TypeClick;

  constructor() { }

  ngOnInit(): void {
  }

  public action(typeClick: TypeClick): void {
    this.actionClick.emit({ 'id': this.superHero.id, 'typeClick': typeClick });
  }

}
