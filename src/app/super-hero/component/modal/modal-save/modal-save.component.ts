import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal-save.component.html',
  styleUrls: ['./modal-save.component.scss']
})
export class ModalSaveComponent {

  constructor(public modal: NgbActiveModal) {}

}
