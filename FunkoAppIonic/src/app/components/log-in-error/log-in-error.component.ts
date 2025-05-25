import {Component, inject} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-log-in-error',
  imports: [],
  templateUrl: './log-in-error.component.html',
  styleUrl: './log-in-error.component.css'
})
export class LogInErrorComponent {
  modalService = inject(NgbModal);

  closeModel() {
    this.modalService.dismissAll();
  }
}
