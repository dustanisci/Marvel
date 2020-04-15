import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent {

  @Input() msg: string;
  @Input() public action: () => void;

  constructor(public modal: NgbActiveModal) {
    
  }

}
