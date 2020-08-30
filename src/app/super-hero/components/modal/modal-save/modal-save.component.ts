import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal-save.component.html',
  styleUrls: ['./modal-save.component.scss']
})
export class ModalSaveComponent implements OnInit {

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.modal.close();
    }, 1000)
  }

}
