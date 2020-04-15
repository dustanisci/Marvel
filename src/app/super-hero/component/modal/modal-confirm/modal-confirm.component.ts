import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent {

  @Input() msg: string;
  @Output() confirm: EventEmitter<void> = new EventEmitter();
  
  constructor(public modal: NgbActiveModal) {}

}
