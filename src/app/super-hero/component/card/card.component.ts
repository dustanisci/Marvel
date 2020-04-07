import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListSuperHero } from '../../list/model/list-super-hero';

@Component({
  selector: 'c-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() superHero: ListSuperHero;
  @Output() id: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
